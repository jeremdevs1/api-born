import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Application } from "express";
import bodyParser from "body-parser";
import { createServer } from "http";
import Routes from "./routes/router";
const app: Application = express();

createConnection()
  .then(async (connection) => {
    console.log("Connected to the database succeded");
  })
  .catch((error) => {
    throw new Error("Failed to connect to the database");
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/", Routes);
app.listen(3000);
