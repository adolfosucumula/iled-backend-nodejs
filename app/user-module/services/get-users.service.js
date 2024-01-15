const express = require('express');
const connection = require('../../../connection');
const router = express.Router();

router.get('/list-all', (request, response) => {
    let user = request.body;
    query = "SELECT * FROM _USER ORDER BY id DESC";
    connection.query(query, (err, results)=> {
        if(!err){
            if(results.length <=0){
               return response.status(201).json(results);
            }else{
                return response.status(400).json({'message': 'Email allready exist.', 'status': 200});
            }
        }
        else{
            return response.status(500).json(err);
        }
    });

    
});

module.exports = router;