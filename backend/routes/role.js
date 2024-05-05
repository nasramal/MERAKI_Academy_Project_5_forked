const express = require("express");


//controllers
const {
  createRole,
  createPermission,
  createRolePermission,
} = require("../controllers/role");

const rolesRouter = express.Router();

rolesRouter.post("/", createRole);
rolesRouter.post("/permission", createPermission);
rolesRouter.post("/role_permission", createRolePermission);

module.exports = rolesRouter;
