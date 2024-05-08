const express = require("express");
const {createreviewByUserId,deletereviewByUserId}=require("../controllers/review")
const reviewRouter = express.Router();
reviewRouter.post("/:id",createreviewByUserId)
reviewRouter.delete("/:id",deletereviewByUserId)


module.exports = reviewRouter;