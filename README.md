# TechKnows-API
# Project TeckKnows
Techknows is an app where users can create, edit ,delete and commit an article in a blog .

### Authentication
The session authentication was used in this app
### Setup
First, you'll need a Postgres database to connect to. Follow instructions here to setup the database and save credentials for the next step.

Next create a `.env` file inside of `backend`. It will need to contain the following environment variables (change the values for the database to match what you defined in the previous step)
```
PORT=5000
DB_DATABASE_DEV=blog
DB_USERNAME_DEV="postgres"
DB_PASSWORD_DEV="1410"
SESSION_SECRET=bvmiilpzbvtdpqjk
ADMIN_PASSWORD=postgres1
```
Next `cd` into `backend` and run `npm install` to install dependencies for the API.

Next, `cd` into `frontend`, and run `npm install` to install dependencies for the React app.

Finally, in separate terminals, run `npm start` in each folder so that the API and React app are running at the same time.

### API (http://localhost:5000)
| Method | Path                                     | Purpose                                     |
| ------ | ------------------------------------     | ------------------------------------------- |
| GET    | /                                        | Home page                                   |
| GET    | /articles                                | articles index page                         |
| POST   | /articles                                | Create new article                          |
| GET    | /articles/:articleId                     | Details about a particular article          |
| PUT    | /articles/:articleId                     | Update a particular article                 |
| DELETE | /articles/:articleId                     | Delete a particular article                 |
| POST   | /articles/:articleId/comments            | Create a comment about a particular article |
| DELETE | /articles/:articleId/comments/:commentId | Delete a comment about a particular article |


### App (http://localhost:3000)
| Path                       | Component                       | Purpose                                                                           |
| ---------------------      | -------------------------       | --------------------------------------------------------------------------------- |
| /                          | `Home.js`                       | Home page                                                                         |
| /sign-up                   | `users/SignUpForm.js`           | Form for creating a new user                                                      |
  /login                       `users/LoginForm.js`            |  Form for user Login                                                              |
| /articles                  | `articles/MainFeed.js`          | List of articles                                                                  |
| /articles/new              | `articles/CreateArticle.js`     |   Form for creating a new article                                                 |
| /articles/:articleId       | `articles/ArticleDetails.js`    | Details of a article, including it's comments, and a form to create a new comment |
| /articles/:articleId/edit  | `articles/Editarticle.js`       | Form for editing an article                                                       |


![image (5)](https://user-images.githubusercontent.com/92067807/178866600-0817f163-7fde-434c-b9fa-98527779ee92.png)
