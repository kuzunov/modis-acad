import * as fs from "node:fs/promises";
import * as http from "http";
import { readFromReq } from "./request-methods";
import { respondWithError } from "./response-methods";
import { DB_FILE,HOSTNAME,PORT } from "./config";

export const getFromUsers = async (id?: number) => {
    let file = await fs.readFile(DB_FILE, "utf-8");
    let json = await JSON.parse(file);
    if (!id) {
      return json;
    } else {
      const user = json.users.find((user) => user.id === id);
      const index = json.users.findIndex((user) => user.id === id);
      return user ? { index: index, user: user } : undefined;
    }
  };
  
export const handleDb = async (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    id?: number
  ) => {
    try {
    let users = await getFromUsers();
    const indexToModify = users.users.findIndex((user) => user.id === id);
    if (indexToModify >= 0 || req.method === "POST") {
      switch (req.method) {
        case "DELETE": {
          const deletedUser = users.users.splice(indexToModify, 1);
          res.writeHead(201, { "Content-Type": "application/json" });
          res.write(JSON.stringify(deletedUser));
          break;
        }
        case "PUT": {
          let editedUser = await readFromReq(req);
            if (editedUser.id === users.users[indexToModify].id) {
                users.users.splice(indexToModify, 1, editedUser);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify(editedUser));
            } else respondWithError(res,400,"IDs don't match")
          break;
        }
        case "POST": {
          let newUser = await readFromReq(req);
          newUser.id = users.nextUserId;
          users.nextUserId++;
          users.users.push(newUser);
          res.writeHead(201, {
            "Content-Type": "application/json",
            location: `http://${HOSTNAME}:${PORT}/api/todos/${newUser.id}`,
          });
          res.write(JSON.stringify(newUser));
          break;
        }
        default:
          respondWithError(res, 400, "Invalid method");
      }
        fs.writeFile(DB_FILE, JSON.stringify(users));
        res.end();
    } else respondWithError(res, 400, "Entity does not exist");
    } catch(err) {
        console.log(err);
        respondWithError(res, 500, "Something went wrong",err);
    }
  };