const express = require("express");
const helmet = require("helmet");
const zooRouter = require("./zoo-router.js");
const server = express();

server.use(express.json());
server.use(helmet());
server.use("/zoos", zooRouter)

server.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = server;
