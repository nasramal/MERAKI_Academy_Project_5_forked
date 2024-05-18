const pool = require("../models/db");

const createAppointmentByUserId = (req, res) => {
  const provider_id = req.params.id;
  const { date, timeFrom, timeTo } = req.body;
  const user_id = req.token.userId;
  pool
    .query(
      `INSERT INTO appointmint (date, timeFrom, timeTo,provider_id,user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [date, timeFrom, timeTo, provider_id, user_id]
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

const getByAppointmentByUserId = (req, res) => {
  const user_id = req.token.userId;

  pool
    .query(`SELECT * FROM appointmint WHERE user_id = $1 RETURNING *`, [
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
const getByAppointmentByProviderId = (req, res) => {
  const provider_id = req.token.userId;

  pool
    .query(
      `SELECT * FROM appointmint WHERE provider_id = $1 AND is_deleted=0`,
      [provider_id]
    )
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
const deleteAppointmentByUserId = (req, res) => {
  const { appointmint_id } = req.body;
  pool
    .query(
      `UPDATE appointmint SET is_deleted=1 , status='reject' WHERE appointmint_id=$1 AND is_deleted=0`,
      [appointmint_id]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "appointment deleted",
        result: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

// provider use
//update status = prov or cancle

const updateAppointmentByAppointmentId = (req, res) => {
  // const user_id = req.token.userId;
  let { status } = req.body;
  const appointment_id = req.params.id;
  pool
    .query(
      `UPDATE appointmint SET status = COALESCE($1,status) WHERE appointmint_id=$2 AND is_deleted = 0 RETURNING *`,
      [status, appointment_id]
    )
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `appointment with id: ${appointment_id} updated successfully `,
          result: result.rows[0],
        });
      } else {
        throw new Error("Error happened while updating article");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

module.exports = {
  createAppointmentByUserId,
  getByAppointmentByUserId,
  deleteAppointmentByUserId,
  updateAppointmentByAppointmentId,
  getByAppointmentByProviderId,
};
