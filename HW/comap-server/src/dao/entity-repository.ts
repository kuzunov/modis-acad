import { promises } from "fs";
import { IEvent } from "../model/event";

export  const getJsonFromFile = async <T>(dbFile) => {
    const fileData = await promises.readFile(dbFile)
    const JSONentity:T = JSON.parse(fileData.toString());
    return JSONentity;
}
export  const writeJsonToFile = async (dbFile, entity) => {
    promises.writeFile(dbFile, JSON.stringify(entity));
}