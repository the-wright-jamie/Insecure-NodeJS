import express from "express";
import { Maltrack } from "./endpoints/maltrack";
const http = require("http");
const fs = require("fs");

import { Users } from "./endpoints/users";

require("dotenv").config();
const app = express();
const users = new Users();
const maltracker = new Maltrack();

app.use(express.json());

http.createServer(app).listen(process.env.HOST_PORT, () => {
  console.log(`The Best API Server has started successfully.`);
});

app.route(`/getInsecure/user/:username`).get(async (req, res) => {
  const response = await users.readItInsecure(req.params.username);
  if (!response) {
    res.status(404).send("User not found");
  } else {
    res.send(response);
  }
});

app.route(`/showOff/stringParsing/:string`).get(async (req, res) => {
  res.send(
    `SELECT * FROM insecurenode.users WHERE username = '${req.params.string}'`
  );
});

app.route(`/getSecure/user/:username`).get(async (req, res) => {
  const response = await users.readItSecure(req.params.username);
  if (!response) {
    res.status(404).send("User not found");
  } else {
    res.send(response);
  }
});

app.route(`/getInsecure/ip-address-logger`).get(async (req, res) => {
  const response = await maltracker.logIPAddress(req);
  res.status(400).send("Bad username or password");
});

app.all("*", function (req, res) {
  res.status(405);
  res.send("This action and/or route is not available on this server");
});
