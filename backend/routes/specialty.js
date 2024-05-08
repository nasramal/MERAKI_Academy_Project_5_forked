const express = require("express");
const {
    createSpecialty,getSpecialty
} = require("../controllers/spaecialty");

const specialtyRouter = express.Router();

specialtyRouter.post("/", createSpecialty);
specialtyRouter.get("/", getSpecialty);


module.exports = specialtyRouter;