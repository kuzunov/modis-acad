//functions that handle responses from the server to user

import * as http from "http";
import { getFromUsers,handleDb } from "./db-methods";

//response from collection
export const usersApiCollectionResponse = async (
    req: http.IncomingMessage,
    res: http.ServerResponse
  ) => {
    if (req.method === "GET") {
      try {
        let usersJSON = await getFromUsers();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(usersJSON.users));
      } catch (err) {
        respondWithError(res, 500, err.message);
      }
    } else if (req.method === "POST") {
      handleDb(req, res);
    } else {
      respondWithError(res, 405, "Invalid request method.");
    }
  };
  //respond with resource
export const usersApiResourceResponse = async (
    id: number,
    req: http.IncomingMessage,
    res: http.ServerResponse
  ) => {
    if (req.method === "GET") {
      const userObj = await getFromUsers(id);
      if (userObj) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(userObj.user));
      } else respondWithError(res, 404, "resource not found");
    } else if (req.method === "PUT" || req.method === "DELETE") {
      handleDb(req, res, id);
    } else {
      respondWithError(res, 405, "Request method not allowed");
    }
  };

  //respond with error
export const respondWithError = (
    res: http.ServerResponse,
    status: number,
    message: string,
    err?: Error
  ) => {
    console.log(err);
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: status, message: message,error:err }));
  };