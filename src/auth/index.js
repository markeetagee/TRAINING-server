const router = require('express').Router();
const Joi = require('@hapi/joi');

const db = require('../db/connection');
const users = db.get('dotenv');  

const registerSchema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    phoneNum: Joi.string().alphanum().min(10).max(11).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
})


router.get('/register', (req, res) =>{
    res.send('Welcome to the Register Route')
});

router.post('/register', (req, res, next) =>{
    //res.json(req.body)
    
    const result = registerSchema.validate(req.body);
    if(!result.error){
        pool.findOne({
            email: req.body.email,
        }).then(user =>{
            console.log(user)
            if(user !== null){
                console.log('email already exists, please choose another..');
                const error = new Error ('email already exists, please choose another one..');
                next(error);
        }else{
            bcrypt.hash(req.body.password.trim(), saltRounds)
            .then(hashedPassword => {
                console.log(hashedPassword)
            })
        
    }
})
    }else{
        res.json(result.error);
    }
})   

router.get('/login', (req, res) =>{
    res.send('Welcome to the Login Route')
});



module.exports = router;