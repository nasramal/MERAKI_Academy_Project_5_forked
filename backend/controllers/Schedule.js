const pool = require("../models/db");

const createScheduleByProviderId = (req, res) => {
  const { date, timeFrom, timeTo } = req.body;
  const provider_id = req.token.userId;
  pool
    .query(
      `INSERT INTO schedule (date, timeFrom, timeTo,provider_id) VALUES ($1,$2,$3,$4) RETURNING *`,
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
      .query(`SELECT * FROM Schedule WHERE provider_id = $1 RETURNING *`, [
        provider_id,
      ])
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "All Schedule ",
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

const updatedScheduleByProviderId =(req,res)=>{
    const provider_id = req.token.userId;
    const {date, timeFrom, timeTo }= req.body
    pool
      .query(`UPDATE schedule SET date = COALESCE($1,date), timeFrom = COALESCE($2, timeFrom), timeTo = COALESCE($3, timeTo) WHERE provider_id=$4 AND is_deleted = 0  RETURNING *`, [
        date, timeFrom, timeTo ,provider_id
      ])
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "Schedule update",
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
}


const deleteScheduleByProviderId =(req,res)=>{
    const provider_id = req.token.userId;
    pool
      .query(`UPDATE schedule SET is_deleted=1 WHERE provider_id=$1 AND is_deleted = 0  RETURNING *`, [
        provider_id
      ])
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "Schedule deleted",
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
}










module.exports = {
    createScheduleByProviderId,getScheduleByProviderId,
    updatedScheduleByProviderId,
    deleteScheduleByProviderId
  };