const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
var cookieParser = require('cookie-parser')
dotenv.config();
const app = express();

const { dbConnection } = require('./config/dbConnection');

//Middleware
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

app.use(cookieParser());

app.use(express.json());



//Base de datos
dbConnection();

//Routes
app.use('/api', require('./routes/auth'));

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
