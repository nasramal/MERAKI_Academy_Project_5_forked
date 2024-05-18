const express = require("express");
const {
    createAppointmentByUserId,getByAppointmentByUserId,
    deleteAppointmentByUserId,updateAppointmentByAppointmentId,getByAppointmentByProviderId
} = require("../controllers/appointmint");
const authentication = require("../middlewares/authentication")

const appointmentRouter = express.Router();

appointmentRouter.post("/:id", authentication,createAppointmentByUserId);
appointmentRouter.get("/", authentication,getByAppointmentByUserId);
appointmentRouter.get("/provider", authentication,getByAppointmentByProviderId);
appointmentRouter.put("/", deleteAppointmentByUserId);
appointmentRouter.put("/status/:id",authentication, updateAppointmentByAppointmentId);

module.exports = appointmentRouter;