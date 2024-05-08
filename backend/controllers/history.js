const pool = require("../models/db");

const createHistoryByUserId = (req, res) => {
const user_id = req.token.userId
    const {medications, medicalHistory } = req.body;
  
    pool.query(`INSERT INTO history (medications, medicalHistory,user_id) VALUES ($1,$2,$3) RETURNING * `,[medications, medicalHistory,user_id])

        .then((result) => {
      res.status(201).json({
        success: true,
        message: `History created successfully`,
        History: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
    //"err": "column \"user_id\" of relation \"history\" does not exist" we have to chnage the schema
  };

  const getHistoryByUserId = (req, res) => {
    const user_id = req.token.userId;
    const query = `SELECT * FROM history WHERE user_id = $1`;
    const data = [user_id];
    pool
      .query(query, data)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: `All  history for history: ${user_id}`,
          history: result.rows,
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
  
  const updateHistoryByUserId = (req, res) => {
    const user_id  = req.token.userId;
    let { medications, medicalHistory } = req.body;
  
    const query = `UPDATE history SET medications = COALESCE($1,medications), medicalHistory = COALESCE($2, medicalHistory ) WHERE id=$3 AND is_deleted = 0  RETURNING *;`;
    const data = [medications || null, medicalHistory || null, user_id ];
    pool
      .query(query, data)
      .then((result) => {
        if (result.rows.length !== 0) {
          res.status(200).json({
            success: true,
            message: `History with id: ${user_id } updated successfully `,
            history: result.rows[0],
          });
        } 
          else {
            throw new Error("Error happened while updating history");
  
          }
        
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
    createHistoryByUserId,
    getHistoryByUserId,
    updateHistoryByUserId
  };
  