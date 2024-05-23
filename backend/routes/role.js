const express = require("express");

const {
  createRole,
  createPermission,
  createRolePermission,
} = require("../controllers/rolesController");

const rolesRouter = express.Router();

rolesRouter.post("/", createRole);
rolesRouter.post("/permission", createPermission);
rolesRouter.post("/role_permission", createRolePermission);

module.exports = rolesRouter;
