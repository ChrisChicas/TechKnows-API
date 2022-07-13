# TechKnows
TechKnows is a free tech article website where users can log in to create articles and leave comments on articles.


## Development Process
- After many suggestions and  delibrations. We came up with a vague concept of a Techknows article. The main purpose of our design is to enable users to read articles, publish articles and delete his own published article and hence if the user is interested in publishing an article, the user need to sign up in order to publish his own article. As for the relationships, we wanted to keep it simple, in the sense that one user can post many article and one article belong to a user.


## Application Logic
### [Back End Logic]
- Our application api is deployed on AWS page through the config.json file.
- We worked with sequelize migrations and models to create our tables in our database, as well as define the relationships between the three tables.

- Our controllers all have the same logic, 
1. using GET routes to find all or 
2. find specific data, 
3. POST route to create data
4. PUT route to update data
5. DELETE route to delete data

### Technologies
This front-end app is built using React. To install all dependencies, run npm install in terminal. Next, cd into frontend, and run npm install to install dependencies for the React app.

The dependencies include @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, react, react-dom, react-router, react-router-dom, react-scripts, web-vitals.

Next cd into backend and run npm install to install dependencies for the API.The dependencies include bcrypt, body-parser, cookie-session, cors, dotenv, express, express-react-views, method-override, nodemon, path, pg, pg-hstore, react, react-dom, sequelize, sequelize-cli.


### [Front End Logic]
- Home Page "/"
```
The 'Article navigation' button is a react-router-dom component that takes the user to the Main feed and we used the useEffect hook to fetch article data from the server.


```
### MVP Criteria
- Basic functioning Navbar
- CRUD operations (add, view, edit, delete)
- Connection to a postgres database
- Deployed to AWS
- All buttons are functional
- Have SASS, Tailwind, React-bootstrap styling
- The article is responsive using media query


### Outstanding bugs & Unfinished functionality
- Cors error


## Project Planning

| Date | Goals |
| ---- | ----- |
| Tue. 07/05 | Github main branch ready to go, install npm packages |
| Thu. 07/07 | Have homepage, setup routes, have database tables ready(sequelize) |
| Sun. 07/10 | Have data grabbed from the database, Setup navbar and stub routes |
| Tue. 07/12 | Start rendering data from the database into pages, add styling |
| Thu. 07/14 | Make sure all CRUD opertions are working, deploy to AWS, prepare presentation |
| Sun. 07/17 | Presentation |
