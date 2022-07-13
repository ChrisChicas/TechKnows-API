require('dotenv').config()
const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();

const cookieSession = require('cookie-session')
const defineCurrentUser = require('./middleware/defineCurrentUser')

app.use(cookieSession({
    name: 'session',
    keys: [ process.env.SESSION_SECRET ],
    maxAge: 24* 60 * 1000
}))

const whitelist = ["http://localhost:3000", "https://techknows.herokuapp.com"]
const corsOptions = {
    origin: function (origin, callback){
        if (whitelist.indexOf(origin) !== -1){
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(defineCurrentUser)

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the TechKnows API'
    })
})
app.use('/articles', require('./controllers/articles'))
app.use('/users', require('./controllers/users'))
app.use('/authentication', require('./controllers/authentication'))

app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`)
})