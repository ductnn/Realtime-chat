require('dotenv').config();

const port = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = new express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(3000);

// Middleware
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));

// View 
app.set("view engine", "ejs");
app.set("views", "./views");

io.on("connection", (socket) => {
    console.log("Connected ...");
    console.log(socket.id)
    socket.on("disconnect", () => console.log(socket.id + " disconnected"));
    socket.on("Client-send-data", (data) => console.log(data));
});

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Ductn'
    });
});

// app.listen(port, () => console.log(`Server is running on port ${port}`));