import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Data from "./data.js";
import path from "path";
import Videos from "./dbModel.js";

const __dirname = path.resolve();
dotenv.config({ path: `${__dirname}/config.env` });

// app config
const app = express();
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());

// connect to database
mongoose.connect(process.env.MONGODB_ATLAS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// routes
app.get("/", (req, res) => {
  res.status(200).send("hello world!");
});

app.get("/v1/posts", (req, res) => res.status(200).send(Data));

app.get("/v2/posts", (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(200).send(data);
  });
});

app.post("/v2/posts", (req, res) => {
  const dbVideos = req.body;

  Videos.create(dbVideos, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(201).send(data);
  });
});

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`));
