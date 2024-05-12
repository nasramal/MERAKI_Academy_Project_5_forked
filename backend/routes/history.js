const express = require("express");
const {createHistoryByUserId, getHistoryByUserId ,updateHistoryByUserId} = require ("../controllers/history")
const authentication = require("../middlewares/authentication")
const historyRouter = express.Router();
historyRouter.post("/creathistory",authentication,createHistoryByUserId)
historyRouter.get("/gethistory",authentication,getHistoryByUserId)
historyRouter.put("/updatehistory",authentication,updateHistoryByUserId)


module.exports = historyRouter;
