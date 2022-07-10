const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')
const { User } = db

router.post('/', async (req, res) => {
    let user = await User.findOne({
        where: { username: req.body.username }
    })
    if(!user){
        let { password, ...rest } = req.body;
        const newUser = await User.create({
            ...rest, 
            role: 'user',
            password: await bcrypt.hash(password, 12)
        })
        req.session.user_id = newUser.user_id
        res.json({newUser})    
    } else {
        res.status(400).json({message: "Username already exists!"})
    }
    
})

router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

module.exports = router