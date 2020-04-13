require('dotenv').config();

const port = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = new express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(3000);



// Middleware
// app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));

// View 
app.set("view engine", "ejs");
app.set("views", "./views");

var arrUsers = ["AAA"];

io.on("connection", (socket) => {
    console.log("Connected ... " + socket.id);

    socket.on("client-send-Username", (data) => {
        // socket.emit("server-send-RegistFailed");
        console.log(data);
        if (arrUsers.indexOf(data) >= 0) {
            // failed
            socket.emit("server-send-RegistFailed");
        } else {
            // success
            arrUsers.push(data);
            socket.emit("server-send-RegistSuccess", data)
        }
        console.log(arrUsers)
    });

    // socket.on("disconnect", () => console.log(socket.id + " disconnected"));
    // socket.on("Client-send-data", (data) => {
    //     console.log(socket.id + " sends " + data);
    //     io.sockets.emit("Server-send-data", data);
    // });
});

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Ductn'
    });
});

// app.listen(port, () => console.log(`Server is running on port ${port}`));