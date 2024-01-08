const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/signup', (request, response) => {
    let user = request.body;
    query = "SELECT * FROM user WHERE email =?";
    connection.query(query, [user.email], (err, results)=> {
        if(!err){
            if(results.length <=0){
                query = "INSERT INTO user (name, phone_number, email, password, status, role) VALUES (?,?,?,?,'false','USER');";
                connection.query(query, 
                    [user.name,user.phone_number,user.email,user.password,user.status,user.role],
                    (err, results)=> {
                        if(!err){
                            return response.status(200).json(message, "Successfully registered!");
                        }else{
                            return response.status(500).json(err);
                        }
                    })
            }else{
                return response.status(400).json(message, "Email allready exist.");
            }
        }
        else{
            return response.status(500).json(err);
        }
    });

    
});

module.exports = router;