const express = require('express');
const User = require('../models/User');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'karannn@efe';


//route:1 create a user using :post "//api/auth/createuser", Doesn't require Auth

router.post('/createuser', [
    body('name', 'Enter valid naem').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),

], async (req, res) => {
    let success=false;
    //if there are error ,returns bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    //check that user alreay axists or not
    try {
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        // Create a new user
        let newUser = new User({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });
        //json token
        const data = {
            id: User.id
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        //console.log(jwtdata);
        await newUser.save();
        success=true;
        res.json({ success,authtoken })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred. Please try again.", message: err.message });
    }
})

//route 2:authenticate user using post

router.post('/login', [
    // body('name', 'Enter valid naem').isLength({ min: 3 }),
    body('email', 'enter valid email').isEmail(),
    body('password', 'password can not be blank').exists(),

], async (req, res) => {
    let success=false;

    //if there i s an error than 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Username password not match" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Username password not match" });
           
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        const authortoken = jwt.sign(payload, JWT_SECRET);
        success=true;
        res.json({success,authortoken});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success,error: "An error occurred. Please try again.", message: err.message });
    }

});

//route 3: get logged in using token "api/auth/getuser"

router.post('/getuser', fetchuser, async (req, res) => {

    try{
            userID=req.user.id;
            const user=await User.findById(userID).select("-password");
            res.send(user);
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "An error occurred. Please try again.", message: err.message });
    }

})

module.exports = router;