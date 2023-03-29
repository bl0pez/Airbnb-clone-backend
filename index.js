const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
var cookieParser = require('cookie-parser')
dotenv.config();
const app = express();

const { dbConnection } = require('./config/dbConnection');

//Directorio publico
app.use('/uploads', express.static(__dirname+'/uploads'));

//Middleware
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

app.use(cookieParser());


app.use(express.json());

app.use(express.urlencoded({ extended: true }));



//Base de datos
dbConnection();

//Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/user'));

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
