const pool = require("../models/db");

const createAppointmentByUserId = (req, res) => {
    const provider_id = req.params.providerId;
  const { date, timeFrom, timeTo } = req.body;
  const user_id = req.token.userId;
  pool
    .query(
      `INSERT INTO appointment (date, timeFrom, timeTo,provider_id,user_id) VALUES ($1,$2,$3,$4,$5)`,
      [date, timeFrom, timeTo, provider_id ,user_id]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "appointment created successfully",
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "appointment created failed",
        err,
      });
    });
};












module.exports = {
    createAppointmentByUserId,
  };