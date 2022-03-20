import { Request, Response } from "express";
import bcrypt from 'bcryptjs'

import { AuthDelegate } from "./auth.delegate";
import { ICreateUser } from "../../interface/users.interface";
import { UserDao } from "../../database/daos/user.dao";

class AuthController {
    private delegate: AuthDelegate
    private userDao: UserDao

    constructor(){
        this.userDao = new UserDao()
        this.delegate = new AuthDelegate(this.userDao)

        this.signup = this.signup.bind(this)
        this.login = this.login.bind(this)
    }


    public async signup(req: Request, res: Response){                
        try {
            if(!req.body.username || !req.body.password) {
                return res.status(400).json({
                    status: 400,
                    message: "Missing body parameters on request",
                    data: "no data",
                  });
            }

            const { username, password } = req.body

            const user = await this.delegate.getUserByUsername(username)

            if(user) {
                return res.status(400).json({ message: "The username is already used", data: "no data" })
            }

            const salt = bcrypt.genSaltSync(10);
            const payload: ICreateUser = { username, role: "USER", password: bcrypt.hashSync(password, salt) }

            const { data } = await this.delegate.signup(payload)
            return res.status(201).json({ message: "User was  created successfully", data })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "error when creating data", error })
        }
    }

    public async login(req: Request, res: Response){
        try {
            if(!req.body.username || !req.body.password) {
                return res.status(400).json({
                    status: 400,
                    message: "Missing body parameters on request",
                    data: "no data",
                  });
            }

            const { username, password } = req.body

            const user = await this.delegate.getUserByUsername(username)
            if (!user) {
                return res.status(500).json({ status: 500, message: "user does not exist", })
            }

            const token = await this.delegate.login(password, user)

            if(!token) {
                return res.status(400).json({ message: "wrong password" })
            }

            return res.status(200).json({ message: "success login", token })
        } catch (error) {
            return res.status(500).json({ message: "error when logging the user", error })
        }
    }
}

export { AuthController }
