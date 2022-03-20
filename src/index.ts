import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import OrdersRouter from "./routes/orders.route";
import UsersRouter from "./routes/users.route";

import { tokenVerify } from "./middleware/authToken";
import { databaseConfig } from "./config/database.config";


const app = express();
const port = process.env.PORT || 3000

app.use(express.json());

app.use("/api/v1/users", UsersRouter);
app.use("/api/v1/orders", tokenVerify, OrdersRouter);

createConnection(databaseConfig)
  .then(() => console.log("Connected to the database succeded"))
  .catch((error) => {
    console.log(error);
    
    throw new Error("Failed to connect to the database");
  });

app.listen(port, () => console.log(`Server listening on port: ${port}`));
