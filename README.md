# Introduction

This project is the backend of Vidly, an video rental app.

## Vidli API Using Node.js

 In this project, I built a RESTful API, a backend service that allows users to rent movies from a movie rental app. I added a few endpoints to let any user view a list of movies in stock, rent a movie, or return a movie. A user can view a list of movies in stock. But an account is required in order to rent or return a movie. I created the following endpoints for the API client:

***User***
- user signup
- user authentication

***Movie***
- movie create
- movie show
- movie index
- movie update
- movie delete

***Genre***
- genre create
- genre show
- genre index
- genre update
- genre delete

***Customer***
- customer create
- customer show
- customer index
- customer update
- customer delete

***Rental***
- rental create
- rental show
- rental index

***Return***
- return create
- return show
- return index

***Built with***
- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose


## 📝 Installation Guide

 - Open a terminal
 
 - Clone this app: 
        ```
        git clone git@github.com:Gaush1/Vidli_Api.git
        ```

- ```cd``` into the app directory.

- Run the command ```npm install``` to install the required dependencies.

- Convert .env.sample file into .env file

- Add port as an environment variable using the key: PORT
- Add MongoDb base url as an environment variable using the key: MONGODB_URL
- Add JSON Web Token (JWT) HMAC secret as an environment variable using the key: VIDLY_JWTPRIVATEKEY.
- Add Database name in the constant.js file using the key DB_NAME.

- In the project directory, run:
- Run ```npm start``` to run the app. Default port is 3000, ie the server listens on ```http://localhost:3000```.
- Send an ```HTTP``` request to any of the following endpoints using any API client such as postman, ThunderClient, etc:

    * POST /api/users
    * GET /api/users/me

    * POST /api/auth

    * /api/customers
    * /api/genres
    * /api/movies
    * /api/rentals (POST only)
    * /api/returns (POST only)
