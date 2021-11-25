const express = require('express');
const bycrypt = require('bcryptjs')
const router = express.Router();
const User = require('../models/authModel');
const { registrationValidation, loginValidation } = require('../helpers/authValidation');


router.post('/register', async (req, res) => {

    // Lets validate the data before the users
    const {error} = registrationValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    // Check for existing emails in user collections
    const emailExits = await User.findOne({email: req.body.email})
    if(emailExits) return res.status(400).send('Email Already Exits')

    // Hashing the password from userdetails
    const salt = await bycrypt.genSalt(10)
    const hashedPassword = await bycrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })   
    try {
        const savedDetails = await user.save()
        res.send(savedDetails);
    } catch(err) {
        res.json({message: err, status: err.status})
    }
    
})

router.post('/login', async (req, res) => {
    // Checking the username and password validation here
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    // Check for existing emails in user collections
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Username and Password are incorrect')

    // Checking the correct passwords
    const validPass = await bycrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Password are incorrect')

    res.send('Logged In')

})

module.exports = router