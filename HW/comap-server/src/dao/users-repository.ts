import { IUser } from "../model/user";
import { replace_IdWithId } from "../utils/utils";
import { RepositoryImpl } from "./repository";

export class UsersRepositoryImpl extends RepositoryImpl<IUser> {
    async findByUsername(username:string):Promise<IUser>{
        const user = await this.db.collection<IUser>(this.collection).findOne({username});
        return user ? replace_IdWithId(user): undefined;
    }
}