const pool = require("../models/db");
const createNotesByProviderId = (req, res) => {
  const provider_id = req.token.userId;
  const { users_id, notes } = req.body;
  pool
    .query(
      `INSERT INTO notes (users_id,notes,provider_id) VALUES ($1,$2,$3) RETURNING * `,
      [users_id, notes, provider_id]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `notes created successfully`,
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

const getNotesByUserId = (req, res) => {
  const user_id = req.token.userId;
  pool
    .query(
      `SELECT notes.notes, notes.provider_id, users.* FROM notes INNER JOIN users ON notes.provider_id = users.users_id WHERE notes.users_id = $1 `,
      [user_id]
    )
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `all notes for the user with id: ${user_id}`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting notes");
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

const getNotesByProviderId = (req, res) => {
  const user_id = req.params.id;
  const provider_id = req.token.userId;
  pool
    .query(
      `SELECT notes.notes, notes.users_id FROM users INNER JOIN notes ON users.users_id=notes.provider_id  WHERE notes.users_id=$1 AND notes.provider_id =$2  `,
      [user_id, provider_id]
    )
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `all notes for the doctor with id: ${provider_id}`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting notes");
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

const getNotesByProvider = (req, res) => {
  const provider_id = req.token.userId;
  pool
    .query(`SELECT * FROM notes WHERE notes.provider_id =$1`, [provider_id])
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `all notes for the doctor with id: ${provider_id}`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting notes");
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

const deleteNotesByProviderId = (req, res) => {
  const provider_id = req.token.userId;
  const users_id = req.params.id;
  pool
    .query(
      `UPDATE notes SET is_deleted=1 WHERE provider_id=$1 AND users_id=$2 RETURNING * `,
      [provider_id, users_id]
    )

    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `notes  with doctor: ${provider_id} were deleted successfully`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting notes");
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

const upDateNotesByProviderId = (req, res) => {
  const provider_id = req.token.userId;
  const users_id = req.params.id;
  const { notes, notes_id } = req.body;
  pool
    .query(
      `UPDATE notes SET notes=$3 WHERE provider_id=$1 AND users_id=$2 AND notes_id=$4 RETURNING * `,
      [provider_id, users_id, notes, notes_id]
    )
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `notes  with doctor: ${provider_id} were update successfully`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting notes");
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
  createNotesByProviderId,
  getNotesByUserId,
  getNotesByProviderId,
  deleteNotesByProviderId,
  getNotesByProvider,
  upDateNotesByProviderId,
};
