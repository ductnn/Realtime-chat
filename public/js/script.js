var socket = io("http://localhost:3000");

//----------------------on event--------------------------------------------
// Register failed
socket.on("server-send-RegistFailed", () => {
    alert("Username đã tồn tại");
});

// Register success
socket.on("server-send-RegistSuccess", (data) => {
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});

// Render user online
socket.on("server-send-arrUsers", function(data) {
    $("#boxContent").html("");
    data.forEach(user => {
        $("#boxContent").append("<div class='userOnline'>" + user + "</div>");
    });
});

// Send Message
socket.on("server-send-mess", function(data) {
    $("#listMess").append(
        "<div class='message'>" + data.user_name + " : " + data.content + "</div>"
    );
});


//------------------------------------emit-even-------------------------------------
$(document).ready(() => {
    $("#loginForm").show();
    $("#chatForm").hide();

    // Register
    $("#btnRegister").click(function(){
        socket.emit("client-send-Username", $("#txtUsername").val());
    });

    // Logout
    $("#btnLogout").click(function() {
        socket.emit("logout");
        $("#chatForm").hide(2);
        $("#loginForm").show(1);
    });

    // Send mess
    $("#btnSend").click(function() {
        socket.emit("user-send-mess", $("#txtMess").val());
    });

});

/* <script>
    const socket = io("http://localhost:3000");

    socket.on("Server-send-data", (data) => {
        $("#content").append(data + ", ");
    })

    $(document).ready(() => {
        $("#clientSendData").click(() => {
            socket.emit("Client-send-data", "Hello");
        });
    });
</script> */