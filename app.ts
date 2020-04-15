import { createConnection, ChangeStream } from "typeorm";
import express = require("express");
import * as cors from "cors";
import { Chat } from "./entities/Chat";
import bodyParser = require("body-parser");
import Fcm = require("fcm-node");
var app = express();
var http = require("http").createServer(app);
import * as socketio from "socket.io";
import { devices } from "./entities/devices";
import { users } from "./entities/users";
import * as moment from "moment";
var io: SocketIO.Server = socketio(http);

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let fcm = new Fcm(
  "AAAAfucNlHQ:APA91bEV3atOmEZL6G8xHvpudxodCOtYITlAqmjCAeNOAahxpcTeRzfPy7QoQIa3J_AkU3rIPSkTtx_NgsBlIdYO1N1LcoGzjmQqPUTkQMuJoVMC531pEUAoWYwA71-IN0JwukfAbn0h"
);

function sendNotification(fcmToken, title, body, data) {
  console.log('fcmToken',fcmToken)
  fcm.send({
    to: fcmToken,
    collapse_key: "new_messages",
    notification: {
      title: title,
      body: body
    },
    data: data
  },function(err, response){
    if (err) {
        console.log("Something has gone wrong!", err);
    } else {
        console.log("Successfully sent with response: ", response);
    }
});
}

createConnection()
  .then(connection => {
    app.post("/getMessages", (req, res) => {
      let userId = req.body.userId;
      let receiverId = req.body.receiverId;
      console.log(userId, receiverId, req.body);
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
            let created = moment(element.created_at).format('L');  
            let at = moment(element.created_at).format('LTS');
            created = created.split("/").reverse().join("/")
            tempChat.push({
              Id: element.Id,
              message: element.message,
              created_at: created + ' ' + at,
              isReaded: element.isReaded,
              receiveUser: element.receiveUser.id,
              sendUser: element.sendUser.id
            });
          });
         // console.log(tempChat);
          res.send(tempChat);
        })
        .catch(err => {
          res.send(err);
        });
    });

    io.on("connection", function(socket: SocketIO.Socket) {
      console.log("a user connected");
      socket.on("messageReaded", ({ userId, receiverId, lastMessageId }) => {
        connection
          .createQueryBuilder()
          .update(Chat)
          .set({
            isReaded: 1
          })
          .where(
            "id <= :id AND sendUserId = :sendUserId AND receiveUserId = :receiveUserId",
            {
              id: lastMessageId,
              sendUserId: userId,
              receiveUserId: receiverId
            }
          )
          .execute()
          .then(value => {
            if (value.raw.affectedRows) {
              io.to(`${userId}`).emit("messageReaded", {
                receiverId,
                lastMessageId
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      });

      socket.on("setCurrentUser", ({ userId }) => {
        console.log(userId);
        socket.join(`${userId}`);
      });

      socket.on("sendMessage", ({ userId, receiverId, text }) => {
        console.log(userId, receiverId, text);
        let chat = new Chat();
        chat.message = text;
        chat.sendUser = userId;
        chat.receiveUser = receiverId;
    
        connection.manager.save(chat).then(value => {
           console.log('value',value);
           connection.getRepository(users).findOne({ 
             where:{id:receiverId}}, ).then(user=>
             {
 
               if(user){
                 console.log('user',user)
                 console.log('receiverId',chat.receiveUser)
                 connection.getRepository(devices).findOne({where:{user:{id:receiverId}}, relations:["user"] 
                 }).then(data=>
                   {
                     if(data){
                       console.log(data)
                       sendNotification(data.push_token,user.name,text,value)
                     } else{
                       console.log('Device not found')
                     }
                    
                   })
               } else{
                 console.log('User not found')
               }
              
             })
         
         
          io.to(`${value.receiveUser}`).emit("newMessage", value);
        });
      });
    });

    http.listen(3000, function() {
      console.log("listening on *:3000");
    });
  })
  .catch(err => {
    console.log(err);
  });
