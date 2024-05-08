const pool = require("../models/db");
const createreviewByUserId = (req, res) => {
    const user_id = req.params.id
        const {comment} = req.body;
      
        pool.query(`INSERT INTO review (comment) VALUES ($1) RETURNING * `,[comment])
    
            .then((result) => {
          res.status(201).json({
            success: true,
            message: `review created successfully`,
            review: result.rows,
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

      module.exports = {
        createreviewByUserId
      };
      
    