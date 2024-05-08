const express = require("express");
const {createHistoryByUserId, getHistoryByUserId ,updateHistoryByUserId} = require ("../controllers/history")
const historyRouter = express.Router();
const authentication = require("../middlewares/authentication")
historyRouter.post("/",authentication,createHistoryByUserId)
historyRouter.post("/",authentication,getHistoryByUserId)
historyRouter.post("/",authentication,updateHistoryByUserId)


module.exports = historyRouter;
