"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var express = require("express");
var cors = require("cors");
var Chat_1 = require("./entities/Chat");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").createServer(app);
var socketio = require("socket.io");
var io = socketio(http);
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
typeorm_1.createConnection()
    .then(function (connection) {
    app.post("/getMessages", function (req, res) {
        var userId = req.body.userId;
        var receiverId = req.body.receiverId;
        console.log(userId, receiverId, req.body);
        connection
            .getRepository(Chat_1.Chat)
            .find({
            where: [
                {
                    sendUser: userId,
                    receiveUser: receiverId
                },
                {
                    sendUser: receiverId,
                    receiveUser: userId
                }
            ],
            relations: ["sendUser", "receiveUser"],
            order: {
                created_at: "ASC"
            }
        })
            .then(function (chats) {
            res.send(chats);
        })
            .catch(function (err) {
            res.send(err);
        });
    });
    io.on("connection", function (socket) {
        console.log("a user connected");
        socket.on('messageReaded', function (_a) {
            var userId = _a.userId, receiverId = _a.receiverId, lastMessageId = _a.lastMessageId;
            connection.createQueryBuilder().update(Chat_1.Chat).set({
                isReaded: 1,
            }).where('id <= :id AND sendUserId = :sendUserId AND receiveUserId = :receiveUserId', {
                id: lastMessageId,
                sendUserId: userId,
                receiveUserId: receiverId
            }).execute().then(function (value) {
                if (value.raw.affectedRows) {
                    io.to("" + userId).emit('messageReaded', { receiverId: receiverId, lastMessageId: lastMessageId });
                }
            }).catch(function (err) {
                console.log(err);
            });
        });
        socket.on("setCurrentUser", function (_a) {
            var userId = _a.userId;
            socket.join("" + userId);
        });
        socket.on("sendMessage", function (_a) {
            var userId = _a.userId, receiverId = _a.receiverId, text = _a.text;
            console.log(userId, receiverId, text);
            var chat = new Chat_1.Chat();
            chat.message = text;
            chat.sendUser = userId;
            chat.receiveUser = receiverId;
            connection.manager.save(chat).then(function (value) {
                console.log(value);
                io.to("" + value.receiveUser).emit("newMessage", value);
            });
        });
    });
    http.listen(3000, function () {
        console.log("listening on *:3000");
    });
})
    .catch(function (err) {
    console.log(err);
});
