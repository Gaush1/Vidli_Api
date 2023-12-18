const mongoose = require('mongoose');
const express = require("express");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)
const app = express();
const genre = require('./routes/genres')
const customer = require('./routes/customers')
const movie = require('./routes/movies')
const rental = require('./routes/rentals')
const user = require('./routes/users');
const auth = require('./routes/auth');
const port = process.env.PORT || 3000;

mongoose
.connect("mongodb://127.0.0.1:27017/vidly")
.then(()=>console.log("Connected to MongoDB.."))
.catch((err)=>console.log("Could not connect to MongoDB...", err));

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hellow World");
})

app.use('/api/genres',genre);

app.use('/api/customers',customer);

app.use('/api/movies',movie)

app.use('/api/rentals',rental)

app.use('/api/users',user);

app.use('/api/auths',auth);

app.listen(port, ()=>console.log(`Listening on http://localhost:${port}`));