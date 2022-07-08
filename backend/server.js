require('dotenv').config()
const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
//const { Sequelize } = require('sequelize')

const cookieSession = require('cookie-session')
const defineCurrentUser = require('./middleware/defineCurrentUser')

app.use(cookieSession({
    name: 'session',
    keys: [ process.env.SESSION_SECRET ],
    maxAge: 24* 60 * 1000 //24 hours
}))
/*
app.use(cors({
    origin:'http://localhost:3000',
    credentials: true
}))*/

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(defineCurrentUser)

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the TeckKnows API'
    })
})
app.use('/articles', require('./controllers/articles'))
app.use('/users', require('./controllers/users'))
app.use('/authentication', require('./controllers/authentication'))

app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})