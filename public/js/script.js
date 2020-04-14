var socket = io("http://localhost:3000");

socket.on("server-send-RegistFailed", () => {
    alert("Username đã tồn tại");
});

socket.on("server-send-RegistSuccess", (data) => {
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});

socket.on("server-send-arrUsers", function(data) {
    $("#boxContent").html("");
    data.forEach(user => {
        $("#boxContent").append("<div class='userOnline'>" + user + "</div>");
    });
});

$(document).ready(() => {
    $("#loginForm").show();
    $("#chatForm").hide();

    $("#btnRegister").click(function(){
        socket.emit("client-send-Username", $("#txtUsername").val());
    });

    $("#btnLogout").click(function() {
        socket.emit("logout");
        $("#chatForm").hide(2);
        $("#loginForm").show(1);
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