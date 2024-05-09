const express = require("express");
const {
  createDocInfoByProviderId,
  getDocInfoByProviderId,
  updateDocInfoByProviderId,
  deleteDocInfoByProviderId,
} = require("../controllers/docInfo");
const authentication = require("../middlewares/authentication")

const docInfoRouter = express.Router();

docInfoRouter.post("/", authentication,createDocInfoByProviderId);
docInfoRouter.get("/", authentication,getDocInfoByProviderId);
docInfoRouter.put("/",authentication, updateDocInfoByProviderId);
docInfoRouter.put("/",authentication, deleteDocInfoByProviderId);

module.exports = docInfoRouter;
