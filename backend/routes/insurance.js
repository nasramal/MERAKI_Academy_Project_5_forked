const express = require("express");

const {createInsurance,getAllInsurance}=require("../controllers/insurance")

const insuranceRouter = express.Router();
insuranceRouter.post("/",createInsurance)
insuranceRouter.get("/",getAllInsurance)

module.exports = insuranceRouter;

