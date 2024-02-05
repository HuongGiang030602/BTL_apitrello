const express = require('express');
// require file userRoutes vào server.js
const boardRoutes = require('./routes/v1/boardRoutes');
var bodyParser = require('body-parser')
require('dotenv').config()
const API_V1 = require('./routes/v1');
const errorHandle = require('./middleware/errorHandler');

const db = require('./configs/mongodb');

// Connect to DB
db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/uploads',express.static('uploads'))
// sử dụng app.use để định nghĩa routes trong server
app.use('/v1',API_V1);
app.use(errorHandle)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});