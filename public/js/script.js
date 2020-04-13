var socket = io("http://localhost:3000");

socket.on("server-send-RegistFailed", () => {
    alert("Username đã tồn tại");
});

socket.on("server-send-RegistSuccess", (data) => {
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});

$(document).ready(() => {
    $("#loginForm").show();
    $("#chatForm").hide();

    $("#btnRegister").click(function(){
        socket.emit("client-send-Username", $("#txtUsername").val());
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