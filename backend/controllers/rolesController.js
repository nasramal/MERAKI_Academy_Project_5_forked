const pool = require("../models/db");

const createRole = (req, res) => {
  const { role } = req.body;
  pool
    .query(`INSERT INTO roles (role) VALUES ($1) RETURNING * `, [role])
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Role created successfully`,
        role: result.rows,
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

const createPermission = (req, res) => {
  const { permission } = req.body;
  pool
    .query(`INSERT INTO permissions (permission) VALUES ($1) RETURNING *`, [
      permission,
    ])
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Permission created successfully`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err,
      });
    });
};

const createRolePermission = (req, res) => {
  const { role_id, permission_id } = req.body;
  pool
    .query(
      `INSERT INTO role_permission (role_id ,permission_id) VALUES ($1,$2)`,
      [role_id, permission_id]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Role Permission created successfully`,
        role: result.rows,
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
  createRole,
  createPermission,
  createRolePermission,
};
