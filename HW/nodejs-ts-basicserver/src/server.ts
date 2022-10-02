import * as http from "http";
import * as url from "url";
import {getResourceId,isValidCollectionUrl} from "./request-methods";
import {PORT,HOSTNAME}  from "./config"
import { usersApiCollectionResponse,usersApiResourceResponse,respondWithError} from "./response-methods";

const mainListener = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const reqUrlPath = url.parse(req.url).pathname;
  if (reqUrlPath.startsWith("/api/users")) {
    if (isValidCollectionUrl(reqUrlPath)) {
      usersApiCollectionResponse(req, res);
    } else {
      const resourceId = getResourceId(reqUrlPath);
      if (resourceId) {
        usersApiResourceResponse(resourceId, req, res);
      } else {
        respondWithError(res, 404, "Invalid user id.");
      }
    }
  } else {
    respondWithError(res, 404, "This does not exist.");
  }
};
const server = http.createServer(mainListener);

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server listening on http://${HOSTNAME}:${PORT}`);
});
server.on("error", (err) => {
  console.log(`Server Error: ${err}`);
});
