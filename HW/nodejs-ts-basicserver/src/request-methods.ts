import * as http from "http";
export const getResourceId = (reqUrlPath: string) => {
        const pathArr = reqUrlPath.split("/");
        return pathArr.length == 4 && /^\d+$/.test(pathArr[pathArr.length - 1])
          ? parseInt(pathArr[3])
          : null;
      };
export const isValidCollectionUrl = (reqUrlPath: string) => {
        return COLLECTION_URLS.includes(reqUrlPath);
      };
export const readFromReq = async (req: http.IncomingMessage) => {
    return new Promise<{ id: number }>((res, rej) => {
      let newUser = undefined;
      let bodyChunks: Uint8Array[] = [];
      req.on("data", (chunk) => bodyChunks.push(chunk));
      req.on("end", async () => {
        let body = Buffer.concat(bodyChunks).toString();
        if (body) {
            newUser = JSON.parse(body);
            res(newUser);
        } else rej("invalid JSON")
      });
      req.on("error", (err) => rej(err));
    });
  };
  
export const COLLECTION_URLS = ["/api/users", "/api/users/"];
