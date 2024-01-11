const express = require('express');
const connection = require('../../../connection');
const router = express.Router();

const jwt = require('jsonwebtoken'); //Library to generate the JWT Token
const nodeMailer = require('nodemailer'); 
require('dotenv').config();

router.post('/login', (request, response) => {
    let user = request.body;
    query = "SELECT * FROM user WHERE email =?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password != user.password) {
                return response.status(401).json({ message: "Username or password wrong." });
            } else if (results[0].status === 'false') {
                return response.status(401).json({ message: "Wait for Admin approval" });
            } else if (results[0].password == user.password) {

                const resp = { email: results[0].email, role: results[0].role };
                const accessToken = jwt.sign(resp, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
                response.status(201).json({ token: accessToken });

            } else {
                return response.status(400).json({ message: "Something went wrong. Please try again later." });
            }
        }
        else {
            return response.status(500).json(err);
        }
    });


});

var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

router.post('/reset-password', (request, response) => {
    const user = request.body;
    query = "SELECT * FROM _USER WHERE email =?";
    connection.query(query, [user.email], (err, results) => {
        if(!err){
            if(results.length <= 0){
                return response.status(200).json({message: "Password sent successfully to your email"});
            }else{
                var mailOption = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'Password by Iled Website',
                    html: "<div><div><h2 style='font-size: 2rem;color: rgb(4, 78, 190);font-weight: 700;'>ILED CORPORATION</h2><h3>Contact: <strong>+351 933 443 506</strong></h3>"
                    + "</div><br><br> <div><h2>RESET PASSWORD</h2><br><br><p>Your login details</p><br><p>"
                    + "Email: " + results[0].email + "</p><p><br>Password: " + results[0].password + "</p>"
                    + "</div></div>"
                    + " <div><a href='http:localhost:4200' target='_blank' rel='noopener noreferrer'>Click here to login</a></div>"
                };
                transporter.sendMail(mailOption, function(err, info){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Email sent: " + info.response);
                    }
                });
                return response.status(200).json({message: "Password sent successfully to your email"});
            }
        }else{
            return response.status(500).json(err);
        }
    })
})

module.exports = router;