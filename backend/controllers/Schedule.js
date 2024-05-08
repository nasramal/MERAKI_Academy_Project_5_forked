const pool = require("../models/db");

const createScheduleByProviderId = (req, res) => {
  const { date, timeFrom, timeTo } = req.body;
  const provider_id = req.token.userId;
  pool
    .query(
      `INSERT INTO schedule (date, timeFrom, timeTo,provider_id) VALUES ($1,$2,$3,$4)`,
      [date, timeFrom, timeTo, provider_id]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "schedule created successfully",
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "schedule created failed",
        err,
      });
    });
};

module.exports = {
    createScheduleByProviderId
  };