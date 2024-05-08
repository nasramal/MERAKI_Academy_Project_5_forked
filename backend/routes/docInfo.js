const express = require("express");
const {
  createDocInfoByProviderId,
  getDocInfoByProviderId,
  updateDocInfoByProviderId,
  deleteDocInfoByProviderId,
} = require("../controllers/docInfo");

const docInfoRouter = express.Router();

docInfoRouter.post("/", createDocInfoByProviderId);
docInfoRouter.get("/", getDocInfoByProviderId);
docInfoRouter.put("/", updateDocInfoByProviderId);
docInfoRouter.delete("/", deleteDocInfoByProviderId);

module.exports = docInfoRouter;
