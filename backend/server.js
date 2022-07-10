require('dotenv').config()
const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const path = require('path')


const cookieSession = require('cookie-session')
const defineCurrentUser = require('./middleware/defineCurrentUser')

app.use(cookieSession({
    name: 'session',
    keys: [ process.env.SESSION_SECRET ],
    maxAge: 24* 60 * 1000 
}))
/*
app.use(cors({
    origin:'http://localhost:3000',
    credentials: true
}))*/
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(defineCurrentUser)

// serve static front end in production mode
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
}

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the TeckKnows API'
    })
})
app.use('/articles', require('./controllers/articles'))
app.use('/users', require('./controllers/users'))
app.use('/authentication', require('./controllers/authentication'))

app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`)
})