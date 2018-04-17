import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';

import indexRoute from './app-router';

const app = express();


app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(compression());


app.use("/", indexRoute);
//app.use("/robot", robotRouter);

export default app;