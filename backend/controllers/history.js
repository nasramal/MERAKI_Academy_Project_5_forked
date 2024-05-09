const pool = require("../models/db");

const createHistoryByUserId = (req, res) => {
const users_id = req.params.id
    const {medications, medicalHistory} = req.body;
  
    pool.query(`INSERT INTO history (medications, medicalHistory,users_id) VALUES ($1,$2,$3) RETURNING * `,[medications, medicalHistory,users_id])

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
    
  };


  const getHistoryByUserId = (req, res) => {
    const users_id = req.params.id;
    // const query = `SELECT * FROM history WHERE users_id = $1`;
    const query = ` SELECT history.medications , history.medicalHistory, history.users_id FROM history WHERE history.users_id =$1`
    const data = [users_id];
    pool
      .query(query, data)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: `All  history for history: ${users_id}`,
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
    const users_id  = req.params.id;
    let { medications, medicalHistory } = req.body;
  
    const query = `UPDATE history SET medications = COALESCE($1,medications), medicalHistory = COALESCE($2, medicalHistory ) WHERE users_id=$3 AND is_deleted = 0  RETURNING *;`;
    const data = [medications || null, medicalHistory || null, users_id ];
    pool
      .query(query, data)
      .then((result) => {
        if (result.rows.length !== 0) {
          res.status(200).json({
            success: true,
            message: `History with id: ${users_id} updated successfully `,
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
  