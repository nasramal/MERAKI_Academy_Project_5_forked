const express = require("express");
const {
    createScheduleByProviderId,getScheduleByProviderId,
    updatedScheduleByProviderId,
    deleteScheduleByProviderId
} = require("../controllers/Schedule");
const authentication = require("../middlewares/authentication")

const scheduleRouter = express.Router();

scheduleRouter.post("/", authentication,createScheduleByProviderId);
scheduleRouter.get("/", authentication,getScheduleByProviderId);
scheduleRouter.put("/update",authentication,updatedScheduleByProviderId);
scheduleRouter.put("/delete",authentication,deleteScheduleByProviderId);

module.exports = scheduleRouter;