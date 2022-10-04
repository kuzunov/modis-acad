import { promises } from 'fs';

export const sendErrorResponse = function(req, res, status = 500, message, err) {
    if(req.get('env') === 'production') {
        err = undefined;
    }
    res.status(status).json({
        code: status,
        message,
        error: err
    })
}

export const replace_id = function (entity) {
    entity.id = entity._id;
    delete entity._id;
    return entity;
}
export const getJsonFromFile = async <T>(dbFile:string) => {
    const fileData = await promises.readFile(dbFile)
    const JSONentity:T = JSON.parse(fileData.toString());
    return JSONentity;
}
export const writeJsonToFile = async (dbFile:string, entity) => {
    promises.writeFile(dbFile, JSON.stringify(entity));
}