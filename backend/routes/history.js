const express = require("express");
const {createHistoryByUserId, getHistoryByUserId ,updateHistoryByUserId} = require ("../controllers/history")
const historyRouter = express.Router();
historyRouter.post("/:id",createHistoryByUserId)
historyRouter.get("/:id",getHistoryByUserId)
historyRouter.put("/:id",updateHistoryByUserId)


module.exports = historyRouter;
