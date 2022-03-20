import { getConnection, getRepository } from "typeorm"
import { ICreateUser } from "../../interface/users.interface";

import { User } from "../entity/user.entity"

class UserDao {
    constructor(){}

    public async getUserByUsername(username: string) {
        return getRepository(User)
        .createQueryBuilder("user")
        .where("user.username = :username", { username })
        .getOne();
    }
    public async createUser(payload: ICreateUser) {
        const repository = getConnection().getRepository(User)
        return await repository.save(payload)
    }
}

export { UserDao, ICreateUser }