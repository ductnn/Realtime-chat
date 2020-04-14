require('dotenv').config();

const port = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = new express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

// Middleware
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));

// View 
app.set("view engine", "ejs");
app.set("views", "./views");

var arrUsers = [];

io.on("connection", (socket) => {
    console.log("Connected ... " + socket.id);

    // Register
    socket.on("client-send-Username", (data) => {
        // socket.emit("server-send-RegistFailed");
        console.log(data);
        if (arrUsers.indexOf(data) >= 0) {
            // failed
            socket.emit("server-send-RegistFailed");
        } else {
            // success
            arrUsers.push(data);
            socket.Username = data;
            socket.emit("server-send-RegistSuccess", data);
            io.sockets.emit("server-send-arrUsers", arrUsers);
        }
        console.log(arrUsers);
    });

    // Logout
    socket.on("logout", function() {
        arrUsers.splice(arrUsers.indexOf(socket.Username), 1);
        socket.broadcast.emit("server-send-arrUsers", arrUsers)
        console.log(arrUsers);
    });

    // User sends message
    socket.on("user-send-mess", function(data) {
        io.sockets.emit("server-send-mess", {user_name: socket.Username, content: data});
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

server.listen(port, () => console.log(`Server is running on port ${port}`));