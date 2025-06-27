const express = require('express');
const shortenerRoutes = require('./routes/shortener');
const log= require('./middleware/logger');

const app = express();
app.use(express.json());

app.use('/', shortenerRoutes); // All routes from shortener.js

app.listen(3000, () => console.log("Server running on port 3000"));


