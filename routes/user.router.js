const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')

userRouter.get('/register', (req, res) => {
    res.render('register');

})
userRouter.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/v1/currencies');

})
userRouter.get('/login', async (req, res) => {
    res.render('login')
})


userRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, user.password)
    if (validPassword) {
        req.session.user_id = user._id;
        res.redirect('/v1/currencies')
    }
    else {
        res.redirect('/v1/user/register')
    }
})



module.exports = userRouter;