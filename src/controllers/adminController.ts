import { Request, Response } from "express";
export const addAliment = (req: Request, res: Response) => {
  const { aliments, userId } = req.body;

  return res.status(200).json({
    status: 200,
    message: "testing routes",
    test:{
        aliments
    }
  });
};

export const aliments = (req: Request, res: Response) => {};
