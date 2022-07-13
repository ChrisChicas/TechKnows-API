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
        const result = await jwt.encode(process.env.JWT_SECRET, {id: user.userId})
        return res.json({user: newUser, token: result.value})   
    } else {
        return res.status(400).json({message: "Username already exists!"})
    }
    
})

module.exports = router