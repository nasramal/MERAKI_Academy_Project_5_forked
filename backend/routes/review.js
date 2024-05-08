const express = require("express");
const {createreviewByUserId}=require("../controllers/review")
const reviewRouter = express.Router();
reviewRouter.post("/:id",createreviewByUserId)


module.exports = reviewRouter;