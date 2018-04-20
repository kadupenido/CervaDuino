import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import logger from "morgan";
import mongoose from "mongoose";

import indexRoute from "./app-router";
import equipamentoRouter from "./equipamento/equipamento-route";
import { connStr } from "./config/config";

const app = express();

// Carrega o mongoose
mongoose.connect(connStr);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(compression());

app.use("/", indexRoute);
app.use("/equipamento", equipamentoRouter);

export default app;
