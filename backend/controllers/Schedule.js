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

const getScheduleByProviderId =  (req, res) => {
    const provider_id = req.token.userId;
    pool
      .query(`SELECT * FROM Schedule WHERE provider_id = $1 `, [
        provider_id,
      ])
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "Schedule ",
          result: result.rows,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error",
          err: err,
        });
      });
  };















module.exports = {
    createScheduleByProviderId,getScheduleByProviderId
  };