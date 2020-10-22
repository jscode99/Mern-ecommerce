const express = require('express');
//.env configuration
require('dotenv').config();
//Import mongoose
const mongoose = require('mongoose');
//morgan
const morgan = require('morgan')
//body parser
const bodyParser = require('body-parser')
//cookie parser
const cookieParser = require('cookie-parser')
//import routes
const userRoute=require('./routes/user')



//App
const app = express();


///....Database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  });


//middlewares
app.use(morgan('dev'))
//body parser json middleware
app.use(bodyParser.json())
//Cookie parser middleware
app.use(cookieParser())


//routes middleware
app.use('/api', userRoute);


//port
const port = process.env.PORT || 8000


//Port listening
app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});

