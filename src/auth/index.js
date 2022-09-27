const router = require('express').Router();

router.get('/register', (req, res) =>{
    res.send('Welcome to the Register Route')
});

router.get('/login', (req, res) =>{
    res.send('Welcome to the Login Route')
});



module.exports = router;