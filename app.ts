import { createConnection, ChangeStream } from "typeorm";
import express = require("express");
import * as cors from "cors";
import { Chat } from "./entities/Chat";
import bodyParser = require("body-parser");
var app = express();
var http = require("http").createServer(app);
import * as socketio from "socket.io"
var io : SocketIO.Server = socketio(http);

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

createConnection()
  .then(connection => {
    app.post("/getMessages", (req, res) => {
      let userId = req.body.userId;
      let receiverId = req.body.receiverId;
      console.log(userId,receiverId,req.body)
      //.select("user")
    // .from(User, "user")
    // .where("user.id = :id", { id: 1 })
      connection
        .getRepository(Chat)
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
        .then(chats => {
          let tempChat = [];
           chats.forEach(element => {
             console.log(element);
            tempChat.push({Id:element.Id,message:element.message,created_at:element.created_at,isReaded:element.isReaded,receiveUserId: element.receiveUser.id,sendUserId:element.sendUser.id})
           })
          console.log(tempChat);
          res.send(tempChat);
        })
        .catch(err => {
          res.send(err);
        });
    });

    io.on("connection", function(socket : SocketIO.Socket) {
      console.log("a user connected");
      socket.on('messageReaded',({userId,receiverId,lastMessageId})=>{
        connection.createQueryBuilder().update(Chat).set({
          isReaded:1,
        }).where('id <= :id AND sendUserId = :sendUserId AND receiveUserId = :receiveUserId',
        {
          id : lastMessageId,
          sendUserId : userId,
          receiveUserId : receiverId
        }
        ).execute().then(value =>{
          if(value.raw.affectedRows){
            io.to(`${userId}`).emit('messageReaded',{receiverId,lastMessageId})
          }
        }).catch(err =>{
          console.log(err)
        })
      })
      socket.on("setCurrentUser",({userId})=>{
          socket.join(`${userId}`);
      })

      socket.on("sendMessage",({userId,receiverId,text})=>{
          console.log(userId,receiverId,text)
        let chat = new Chat()
        chat.message = text
        chat.sendUser = userId
        chat.receiveUser = receiverId
        connection.manager.save(chat).then((value)=>{
          console.log(value)

            io.to(`${value.receiveUser}`).emit("newMessage",value)
        })
      })
    });

    http.listen(3000, function() {
      console.log("listening on *:3000");
    });
  })
  .catch(err => {
    console.log(err);
  });

