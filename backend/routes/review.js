const express = require("express");
const {createreviewByUserId,deletereviewByUserId,getreviewByproviderid}=require("../controllers/review")
const reviewRouter = express.Router();
const authentication = require("../middlewares/authentication")
reviewRouter.post("/:id",authentication,createreviewByUserId)
reviewRouter.put("/:id",authentication,deletereviewByUserId)
reviewRouter.get("/:id",getreviewByproviderid)


module.exports = reviewRouter;