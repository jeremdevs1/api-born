import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'

import { ICreateUser, UserDao } from "../../database/daos/user.dao"
import { IErrorResponse } from "../../interface/interface"
import { ICreateUserResponse } from "../../interface/users.interface"
import { User } from "../../database/entity/user.entity";

class AuthDelegate {
    constructor(
        private userDao: UserDao
    ){}

    public async getUserByUsername(username: string) {
        return await this.userDao.getUserByUsername(username)
    }

    public async signup(payload: ICreateUser): Promise<ICreateUserResponse | IErrorResponse> {
        const result = await this.userDao.createUser(payload)
        console.log({result});
        
        return { data: payload }
    }

    public async login(password: string, user: User ) {
        const isSamePassword = await bcrypt.compare(password, user.password)
        if(!isSamePassword) {
            return
        }

        const payload = { id: user.id, username: user.username }
        const jwtSecret = process.env.TOKEN_SECRET || "jeremtest"
        return jwt.sign(payload, jwtSecret, { expiresIn: 86400 })
    }
}

export { AuthDelegate }