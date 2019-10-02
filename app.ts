import {createConnection} from "typeorm";
import express = require('express')
import { Chat } from "./entities/Chat";
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

createConnection().then((connection)=>{

    app.use(express.static("../public"))
    app.get("/getMessage/:u1/:u2",(req,res)=>{
        connection.getRepository(Chat).find({
            where:[{
                sendUser:req.params.u1,
                receiveUser:req.params.u2,
            },
            {
                sendUser:req.params.u2,
                receiveUser:req.params.u1,
            }
        ],
        relations:["sendUser","receiveUser"],
        order:{
            created_at:"ASC"
        }

        })
        .then((chats)=>{
            res.send(chats)
        }).catch((err)=>{
            res.send(err)
        })
    })


    io.on('connection', function(socket){
      console.log('a user connected');
    });
    
    http.listen(3000, function(){
      console.log('listening on *:3000');
    });
    
    
    
    
    
}).catch((err)=>{
    console.log(err)
})
