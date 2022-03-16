import { RequestHandler, Request, Response } from "express";
import { request } from "http";
import { createConnection, getConnection, getRepository } from "typeorm";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username && password) {
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.username = :username", { username: username })
      .getOne();
    if (!user) {
      try {
        getConnection()
          .createQueryBuilder()
          .insert()
          .into(User)
          .values([
            {
              username: username,
              role: "USER",
              password: bcrypt.hashSync(password, salt),
            },
          ])
          .execute();

        return res.status(201).json({
          status: 201,
          message: "User was  created successfully",
          data: {
            username: username,
            role: "USER",
            password: bcrypt.hashSync(password, salt),
          },
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: "error when creating data",
          error: error,
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        message: "The username is already used",
        data: "no data",
      });
    }
  } else {
    return res.status(400).json({
      status: 400,
      message: "Missing body parameters on request",
      data: "no data",
    });
  }
  return res.status(500).json({
    status: 500,
    message: "The api returned nothing",
    data: "no data",
  });
};

export const login = async (req: Request, res: Response) => {
  const user = await getConnection()
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .where("user.username = :username", { username: req.body.username })
    .getOne();
  if (!user) {
    return res.status(500).json({
      status: 500,
      message: "user does not exist",
    });
  } else {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(200).json({
        status: 200,
        message: "success login",
        token: jwt.sign(
          { id: user.id, username: user.username },
          process.env.TOKEN_SECRET || "jeremtest",
          { expiresIn: 86400 }
        ),
      });
    } else {
      return res.status(500).json({
        status: 500,
        message: "wrong password",
      });
    }
  }
};
