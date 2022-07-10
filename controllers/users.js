const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')
const { User } = db

router.post('/', async (req, res) => {
    let { password, ...rest } = req.body;
    const user = await User.create({
        ...rest, 
        role: 'user',
        password: await bcrypt.hash(password, 12)
    })
    req.session.user_id = user.user_id
    res.json({user})
})

router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

module.exports = router