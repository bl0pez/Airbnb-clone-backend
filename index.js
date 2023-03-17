const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

//Middleware
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

app.use(express.json());

//Routes
app.use('/api', require('./routes/auth'));

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
