const pool = require("../models/db");

const createreviewByUserId = (req, res) => {
  const users_id = req.token.userId;
  const provider_id = req.params.id;
  const { comment } = req.body;
  pool
    .query(
      `INSERT INTO review (comment,users_id,provider_id) VALUES ($1,$2,$3) RETURNING * `,
      [comment, users_id, provider_id]
    )
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
  const users_id = req.token.userId;
  const provider_id = req.params.id;
  const query = `UPDATE review SET is_deleted=1 WHERE users_id=$1 AND provider_id=$2  RETURNING *`;
  const data = [users_id, provider_id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `Review with id: ${provider_id} deleted successfully`,
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

const getreviewByproviderid = (req, res) => {
  const provider_id = req.params.id;
  const query = `SELECT * FROM review WHERE provider_id = $1`;
  const data = [provider_id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The review with id: ${provider_id}`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting review");
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
  createreviewByUserId,
  deletereviewByUserId,
  getreviewByproviderid,
};
