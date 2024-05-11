const pool = require("../models/db");

const createAppointmentByUserId = (req, res) => {
    const provider_id = req.params.providerId;
  const { date, timeFrom, timeTo } = req.body;
  const user_id = req.token.userId;
  pool
    .query(
      `INSERT INTO appointmint (date, timeFrom, timeTo,provider_id,user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
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


const getByAppointmentByUserId =  (req, res) => {
    const user_id = req.token.userId;

    pool
      .query(`SELECT * FROM appointmint  WHERE user_id = $1 RETURNING *`, [
        user_id,
      ])
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "appointment's ",
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

  const deleteAppointmentByUserId =(req,res)=>{
    const user_id = req.token.userId;
    pool
      .query(`UPDATE appointmint SET is_deleted=1 WHERE user_id=$1 AND is_deleted = 0  RETURNING *`, [
        user_id
      ])
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "appointment deleted",
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
    createAppointmentByUserId,getByAppointmentByUserId,
    deleteAppointmentByUserId
  };