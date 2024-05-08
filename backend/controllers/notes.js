const pool = require("../models/db");
const createnotesByProviderId = (req, res) => {
    const provider_id =  req.token.users_id
        const {notes} = req.body;
      
        pool.query(`INSERT INTO notes (notes) VALUES ($1) RETURNING * `,[notes])
    
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

     
       
      module.exports = {
        createnotesByProviderId

      }
      