const express = require("express");
const helmet = require("helmet");
const zooRouter = require("./zoo-router.js");
const bearRouter = require('./bear-router.js')
const server = express();

server.use(express.json());
server.use(helmet());
server.use("/zoos", zooRouter)
server.use("/bears", bearRouter)

server.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = server;
