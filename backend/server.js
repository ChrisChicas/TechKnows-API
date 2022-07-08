
const express = require('express')
const app = express();
const { Sequelize } = require('sequelize')

require('dotenv').config();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the TeckKnows API'
    })
})










//app.use('/places', require('./controllers/places'))
app.use('/users', require('./controllers/users'))
//app.use('/authentication', require('./controllers/authentication'))






app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})