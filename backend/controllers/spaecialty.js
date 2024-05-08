const pool = require("../models/db");

const createSpecialtyByProviderId = async (req, res) => {
  const { specialty } = req.body;
  const provider_id = req.token.userId;
  pool
    .query(`INSERT INTO specialty (specialty,provider_id) VALUES ($1,$2)`, [
      specialty,
      provider_id,
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


module.exports = {
    createSpecialtyByProviderId,
  };