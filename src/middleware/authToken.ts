import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ITokenPayload } from "../interface/interface";

const tokenVerify = (req, res: Response, next: NextFunction) => {
  if(!req.headers.authorization) {
    return res.status(401).json({ message: "Access denied", data: "no data" });
  }

  const [, token] = req.headers.authorization.split(' ')
  if (!token)
    return res.status(401).json({ message: "Access denied", data: "no data" });
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET || "jeremtest") as ITokenPayload;

    req.user.id = payload.id;
    next()
  } catch (error) {
    return res.status(500).json({ message: "error", error });
  }
}

export { tokenVerify }