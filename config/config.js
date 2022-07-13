require("dotenv").config()

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME_DEV,
    "password": process.env.DB_PASSWORD_DEV,
    "database": process.env.DB_DATABASE_DEV,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USERNAME_TEST,
    "password": process.env.DB_PASSWORD_TEST,
    "database": process.env.DB_DATABASE_TEST,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "host": process.env.RDS_HOSTNAME,
    "database": process.env.RDS_DB_NAME,
    "username": process.env.RDS_DB_USERNAME,
    "port": process.env.RDS_PORT,
    "password": process.env.RDS_DB_PASSWORD,
    "dialect": "postgres"
  }
}
