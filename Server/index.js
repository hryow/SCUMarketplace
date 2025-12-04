const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes/routes.js'); // Import the external router

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());       
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'imgs')));
app.use('/api', routes); 

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});