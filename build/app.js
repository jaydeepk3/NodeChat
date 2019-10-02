"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var express = require("express");
var Chat_1 = require("./entities/Chat");
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
typeorm_1.createConnection().then(function (connection) {
    app.use(express.static("../public"));
    app.get("/getMessage/:u1/:u2", function (req, res) {
        connection.getRepository(Chat_1.Chat).find({
            where: [{
                    sendUser: req.params.u1,
                    receiveUser: req.params.u2,
                },
                {
                    sendUser: req.params.u2,
                    receiveUser: req.params.u1,
                }
            ],
            relations: ["sendUser", "receiveUser"],
            order: {
                created_at: "ASC"
            }
        })
            .then(function (chats) {
            res.send(chats);
        }).catch(function (err) {
            res.send(err);
        });
    });
    io.on('connection', function (socket) {
        console.log('a user connected');
    });
    http.listen(3000, function () {
        console.log('listening on *:3000');
    });
}).catch(function (err) {
    console.log(err);
});
