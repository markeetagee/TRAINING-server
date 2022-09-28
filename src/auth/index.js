const router = require('express').Router();
const Joi = require('@hapi/joi');
const bcrypt = require("bcrypt");

const { pool } = require('../db/connection');
//const users = db.get('dotenv');  

const registerSchema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    phoneNum: Joi.string().alphanum().min(10).max(11).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    password2: Joi.any().valid(Joi.ref('password')).required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
})


router.get('/register', (req, res) =>{
    res.send('Welcome to the Register Route')
});
  
router.post('/register', async (req, res) => {
        const errors = registerSchema.validate(req.body);
        const {firstName, lastName, email, phoneNum, password, password2} = req.body;
     
     
     if (errors.length > 0) {
         res.render('register', { 
             errors,
             firstName,
             lastName,
             email,
             phoneNum,
             password,
             password2 
         
         });
     }else{
        //validation passed
     
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
     
        
        pool.query(
            `SELECT * FROM users WHERE email = $1 `, [email], (err, results)=>{
                if (err){ 
            res.json(results.err); 
        }
      //  console.log("reaches here"); -> Just to check if the code is working.
        console.log(results.rows);
     
        if(results.rows.length > 0){
            errors.push({message: "Email already registered!"});
            res.render("register", {errors});
     
        }else{ // will save the data into our database.
            pool.query(
                `INSERT INTO users (fname, lname, email, phonenum, password)
                    VALUES  ($1, $2, $3, $4, $5)
                    RETURNING id, password`, [fname, lname, email, phonenum, hashedPassword],
                    (err, results) => {
                        if (err){
                            throw err
                        }
                        console.log(results.rows);
                        req.flash('success_msg', "You are now registered! Please log-in");
                        res.redirect("/users/login");
                    }
            );
        }
     
        
                });
     
     
     }
     
     
     });    



router.get('/login', (req, res) =>{
    res.send('Welcome to the Login Route')
});



module.exports = router;