const pool = require("../models/db");

const createSpecialty =  (req, res) => {
  const { specialty } = req.body;
  pool
    .query(`INSERT INTO specialty (specialty) VALUES ($1)`, [
      specialty,
    ])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "specialty created successfully",
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "specialty created failed",
        err,
      });
    });
};

const getSpecialty =  (req, res) => {
    
    pool
      .query(`SELECT * FROM specialty `)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "specialty ",
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
    createSpecialty,getSpecialty
  };