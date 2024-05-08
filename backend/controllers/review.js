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
    
const deletereviewByUserId = (req, res) => {
    const user_id = req.params.id
    const query = `delete from review where user_id = $1;`;
    const data = [user_id];
    pool
      .query(query, data)
      .then((result) => {
        if (result.rowCount !== 0) {
          res.status(200).json({
            success: true,
            message: `Review with id: ${user_id} deleted successfully`,
          });
        } else {
          throw new Error("Error happened while deleting review");
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
        createreviewByUserId,deletereviewByUserId
      };
      
    