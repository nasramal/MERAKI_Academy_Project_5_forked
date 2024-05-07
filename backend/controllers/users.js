const pool = require("../models/db");
const bcrypt = require("bcryptjs");
const saltRounds = parseInt(process.env.SALT);

const register = async (req, res) => {
  const { firstName, lastName, age, email, password,role_id, phone } = req.body;
 
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  pool
    .query(`INSERT INTO users (firstName, lastName, age, email, password, role_id , phone) VALUES ($1,$2,$3,$4,$5,$6,$7)`,[
      firstName,
      lastName,
      age,
      email.toLowerCase(),
      encryptedPassword,
      role_id,
      phone
    ])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Account created successfully",
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "The email already exists",
        err,
      });
    });
};

module.exports = {
  register,
};
