import express from "express";
const http = require("http");
const fs = require("fs");

import { Users } from "./endpoints/users";

require("dotenv").config();
const app = express();
const users = new Users();

app.use(express.json());

http.createServer(app).listen(process.env.HOST_PORT, () => {
  console.log(`Get Outside API Server has started successfully.`);
});

app.route(`/getInsecure/user/:username`).get(async (req, res) => {
  const response = await users.readItInsecure(req.params.username);
  if (!response) {
    res.status(404).send("User not found\n[RU-1]");
  } else {
    res.send(response);
  }
});

app.route(`/getSecure/user/:username`).get(async (req, res) => {
  const response = await users.readItSecure(req.params.username);
  if (!response) {
    res.status(404).send("User not found\n[RU-1]");
  } else {
    res.send(response);
  }
});

app.all("*", function (req, res) {
  res.status(405);
  res.send("This action and/or route is not available on this server");
});
