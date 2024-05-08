const express = require("express");
const {createHistoryByUserId, getHistoryByUserId ,updateHistoryByUserId} = require ("../controllers/history")
const historyRouter = express.Router();
const authentication = require("../middlewares/authentication")
historyRouter.post("/",authentication,createHistoryByUserId)
historyRouter.get("/",authentication,getHistoryByUserId)
historyRouter.put("/",authentication,updateHistoryByUserId)


module.exports = historyRouter;
