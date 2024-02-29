import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

/**
 * This code snippet sets up an Express app with middleware configurations.
 * It includes middleware for CORS, compression, cookie parsing, and JSON body parsing.
 * It creates an HTTP server using the Express app.
 * It connects to a MongoDB database using Mongoose.
 * It listens on port 8080 and logs a message when the server is running.
 * It mounts the defined routes from the `router` on the root path of the app.
 */
const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const MONGO_URL = "mongodb://localhost:27017/restapi";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});

app.use('/', router())