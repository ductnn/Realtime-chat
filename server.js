require('dotenv').config();

const port = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const io = require('socket.io')(port);

const app = new express();

// Middleware
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));

// View 
app.set("view engine", "ejs");
app.set("views", "./views");



app.get('/', (req, res) => {
    res.render('index', {
        name: 'Ductn'
    });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));