"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var express = require("express");
var cors = require("cors");
var Chat_1 = require("./entities/Chat");
var bodyParser = require("body-parser");
var Fcm = require("fcm-node");
var app = express();
var http = require("http").createServer(app);
var socketio = require("socket.io");
var devices_1 = require("./entities/devices");
var users_1 = require("./entities/users");
var io = socketio(http);
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
var fcm = new Fcm("AAAAfucNlHQ:APA91bEV3atOmEZL6G8xHvpudxodCOtYITlAqmjCAeNOAahxpcTeRzfPy7QoQIa3J_AkU3rIPSkTtx_NgsBlIdYO1N1LcoGzjmQqPUTkQMuJoVMC531pEUAoWYwA71-IN0JwukfAbn0h");
function sendNotification(fcmToken, title, body, data) {
    fcm.send({
        to: fcmToken,
        collapse_key: "new_messages",
        notification: {
            title: title,
            body: body
        },
        data: data
    }, function (err, response) {
        if (err) {
            console.log("Something has gone wrong!", err);
        }
        else {
            console.log("Successfully sent with response: ", response);
        }
    });
}
typeorm_1.createConnection()
    .then(function (connection) {
    app.post("/getMessages", function (req, res) {
        var userId = req.body.userId;
        var receiverId = req.body.receiverId;
        console.log(userId, receiverId, req.body);
        //.select("user")
        // .from(User, "user")
        // .where("user.id = :id", { id: 1 })
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
            var tempChat = [];
            chats.forEach(function (element) {
                console.log(element);
                tempChat.push({
                    Id: element.Id,
                    message: element.message,
                    created_at: element.created_at,
                    isReaded: element.isReaded,
                    receiveUser: element.receiveUser.id,
                    sendUser: element.sendUser.id
                });
            });
            console.log(tempChat);
            res.send(tempChat);
        })
            .catch(function (err) {
            res.send(err);
        });
    });
    io.on("connection", function (socket) {
        console.log("a user connected");
        socket.on("messageReaded", function (_a) {
            var userId = _a.userId, receiverId = _a.receiverId, lastMessageId = _a.lastMessageId;
            connection
                .createQueryBuilder()
                .update(Chat_1.Chat)
                .set({
                isReaded: 1
            })
                .where("id <= :id AND sendUserId = :sendUserId AND receiveUserId = :receiveUserId", {
                id: lastMessageId,
                sendUserId: userId,
                receiveUserId: receiverId
            })
                .execute()
                .then(function (value) {
                if (value.raw.affectedRows) {
                    io.to("" + userId).emit("messageReaded", {
                        receiverId: receiverId,
                        lastMessageId: lastMessageId
                    });
                }
            })
                .catch(function (err) {
                console.log(err);
            });
        });
        socket.on("setCurrentUser", function (_a) {
            var userId = _a.userId;
            console.log(userId);
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
                console.log('value', value);
                connection.getRepository(users_1.users).findOne({ where: { id: receiverId }
                }).then(function (user) {
                    if (user) {
                        console.log('user', user);
                        connection.getRepository(devices_1.devices).findOne({ where: { user_id: receiverId }
                        }).then(function (data) {
                            if (data) {
                                console.log('data', data);
                                console.log('sendNotification', data.push_token, user.name, text, value);
                                sendNotification(data.push_token, user.name, text, value);
                            }
                            else {
                                console.log('Device not found');
                            }
                        });
                    }
                    else {
                        console.log('User not found');
                    }
                });
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
