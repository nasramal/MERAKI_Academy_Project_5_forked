const express = require("express");
const {
    createScheduleByProviderId,getScheduleByProviderId,
    updatedScheduleByID,
    deleteScheduleByProviderId,
    getNotBookedScheduleByProviderId
} = require("../controllers/Schedule");
const authentication = require("../middlewares/authentication")

const scheduleRouter = express.Router();

scheduleRouter.post("/", authentication,createScheduleByProviderId);
scheduleRouter.get("/", authentication,getScheduleByProviderId);
scheduleRouter.put("/update/:id",authentication,updatedScheduleByID);
scheduleRouter.put("/delete/:id",deleteScheduleByProviderId);
scheduleRouter.get("/notBooked/:id",getNotBookedScheduleByProviderId)

module.exports = scheduleRouter;