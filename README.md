# TechKnows
TechKnows is a free tech article app where users can view articles or log in to create articles and leave comments on them!

## Important Links
- TechKnows Front-End Repo: [Link](https://github.com/ChrisChicas/TechKnows)

## Development Process
- After many suggestions and  delibrations, we came up with the vague concept of Techknows. The main purpose of our design is to enable users to read articles, and publish/edit/delete their own articles. However, if the user is interested in publishing an article, the user will need to sign up or log in to their account. This required a small amount of role-based authorization, which led to ideas of how much further we could take roles in our app, and what authors could do compared to normal users. In the end, authors can edit/delete their own content while other users, logged in or not, can only read another author's articles. We also implemented an admin role which has access to all of the author controls for any article or comment. Role-based authorization was a huge factor in our app, and something we had to keep in mind while working on both the front and back-end.

## Technologies
- This front-end app is built primarily using React, while the back-end is built primarily using Express. Other dependencies include:

- Front-End: @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, react, react-dom, react-router, react-router-dom, react-scripts, web-vitals

- Back-End: bcrypt, body-parser, json-web-token, cors, dotenv, express, express-react-views, method-override, nodemon, path, pg, pg-hstore, sequelize, sequelize-cli

## Setup
- In order to test this app locally, you'll need to clone or fork both the TechKnows front-end and back-end folders. Link to the back-end API above.
- Afterwards, you can `npm install` the packages in each of the respective folders.
- You'll also need a Postgres database to the app connect to.
- Once everything is set up, you'll need to create a .env file for both the TechKnows front-end and back-end folders. The .env files should contain the following:
- Front-End .env:
```
REACT_APP_API=http://localhost:5000
```
- Back-End .env:
```
PORT=5000
DB_DATABASE_DEV={db name}
DB_USERNAME_DEV={db username}
DB_PASSWORD_DEV={db password}
JWT_SECRET={any random string}
USER_PASSWORD={any random password}
ADMIN_PASSWORD={any random password}
CORS_URL=http://localhost:3000
```
- Afterwards, you can migrate the table information into the actual database by using `sequelize db:migrate` in the back-end terminal.
- You can also choose to seed the test data given in the seeders folder with `npx sequelize-cli db:seed --seed {seedfilename}.js`.
- After all of this is complete, you can run `npm start` in both the front-end and back-end terminals to start testing out the app locally!

## Application Logic

### Front End Logic
- We use react-router-dom to navigate our React app frequently, while also using normal links to pass query information to the backend, depending on how one wants to sort the articles they are viewing, or even what page they are on for a specific sort.
- Requests are typically made to the back-end using fetch requests and onClick or onSubmit functions, followed typically by a navigate function provided by react-router-dom.
- Sessions are managed by JWTs throughout the app, and are applied during login/signup, and destroyed on logout.

### Back End Logic
- In our app, there are 3 data tables within our database as shown below:

![Techknows (1)](https://user-images.githubusercontent.com/92067807/179403290-7d8da38f-332c-44a4-a04b-f22daa378d2a.jpg)

- We worked with sequelize to do migrations and create models/tables in our database, as well as define the relationships between the three tables.

- Our controllers all have basic CRUD functionality:
1. GET routes to find all or find specific data trhough path params or query params
2. POST routes to create data
3. PUT routes to update data
4. DELETE routes to delete data

## App Paths (http://localhost:3000)
- Postman test routes are included in documentation folder
- (NOTE:Routes are protected by role-based authorization on front-end and back-end, so some routes may only result in error message!)


| Path                       | Component                       | Purpose                                                                           |
| ---------------------      | -------------------------       | --------------------------------------------------------------------------------- |
| /                          | `Home.js`                       | Home page                                                                         |
| /sign-up                   | `users/SignUpForm.js`           | Form for creating a new user                                                      |
| /login                     | `users/LoginForm.js`            | Form for user Login                                                               |
| /articles                  | `articles/MainFeed.js`          | List of articles                                                                  |
| /articles/new              | `articles/CreateArticle.js`     | Form for creating a new article if user is logged in                              |
| /articles/:articleId       | `articles/ArticleDetails.js`    | Details of a article, including it's comments, and a form to create a new comment |
| /articles/:articleId/edit  | `articles/Editarticle.js`       | Form for editing an article if user is logged in                                  |

## API Paths (http://localhost:5000)
- Postman test routes are included in documentation folder
- (NOTE:Routes are protected by role-based authorization on front-end and back-end, so some routes may only result in error message!)


| Method | Path                                     | Purpose                                     |
| ------ | ------------------------------------     | ------------------------------------------- |
| GET    | /                                        | Home page                                   |
| GET    | /articles (queries: ?sort=&page= optional)| articles index page                         |
| POST   | /articles                                | Create new article                          |
| GET    | /articles/:articleId                     | Details about a particular article          |
| PUT    | /articles/:articleId                     | Update a particular article                 |
| DELETE | /articles/:articleId                     | Delete a particular article                 |
| POST   | /articles/:articleId/comments            | Create a comment about a particular article |
| DELETE | /articles/:articleId/comments/:commentId | Delete a comment about a particular article |

## MVP Criteria
- Basic functioning Navbar that changes based on if a user is logged in
- Enforce role-based authorization
- Have secure user authentication
- CRUD operations (create, read, update, delete)
- Connected to a postgres database
- Deployed to Heroku or AWS
- All buttons are functional
- Have responsive styling


## Outstanding bugs & Unfinished functionality
- We wanted to add a like button to articles and comments, but due to time constraints we were not able to accomplish that.


## Project Planning

| Date | Goals |
| ---- | ----- |
| Tue. 07/05 | Github main branch ready to go, install npm packages |
| Thu. 07/07 | Have homepage, setup routes, have database tables ready (sequelize) |
| Sun. 07/10 | Have data grabbed from the database, Setup navbar and stub routes |
| Tue. 07/12 | Start rendering data from the database into pages, add styling |
| Thu. 07/14 | Make sure all CRUD opertions are working, deploy to heroku or aws, prepare for presentation |
| Sun. 07/17 | Presentation |
