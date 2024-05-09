const pool = require("../models/db");


const createInsurance = (req, res) => {
    
    const {insuranceName} = req.body;
      
        pool.query(`INSERT INTO insurance  (insuranceName) VALUES ($1) RETURNING * `,[insuranceName])
    
            .then((result) => {
          res.status(201).json({
            success: true,
            message: `insurance  created successfully`,
            insurance: result.rows,
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

      const getAllInsurance = (req, res) => {
        const query = `SELECT * FROM insurance`;
      
        pool
          .query(query)
          .then((result) => {
            res.status(200).json({
              success: true,
              message: "All the insurance",
              insurance: result.rows,
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
        createInsurance,getAllInsurance
      };
      