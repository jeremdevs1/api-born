import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Interface } from "readline";

interface payload {
  id: number;
  iat: number;
  exp: number;
}
export const TokenVerify = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("auth-token");
  var payload;
  if (!token)
    return res
      .status(401)
      .json({ status: 401, message: "Access denied", data: "no data" });
  try {
    payload = jwt.verify(
      token,
      process.env.TOKEN_SECRET || "jeremtest"
    ) as JwtPayload;
    req.body.userId = payload.id;
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "error",
      error: error,
    });
  }
  next();
};
