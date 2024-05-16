import express, { json } from 'express'
import { WebSocket, WebSocketServer } from 'ws'
import jwt from 'jsonwebtoken';
import url from 'url'
const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });
const clients = new Map<string,WebSocket>()
let count = 0;
wss.on('connection', function connection(ws,req) {
  count ++;
  console.log(`user ${count} connected`);
  //@ts-ignore
  const token : string = url.parse(req.url,true).query.id
 console.log("token " + token);
  clients.set(token,ws)
  ws.on('error', console.error);
  ws.on('message', function incoming(message) {
    const data = JSON.parse(message.toString());
    console.log(data)
    if (data && data.recipient && data.recipient.receiverID) {
      const recipient = clients.get(data.recipient.receiverID);
      // if (recipient && recipient.readyState == WebSocket.OPEN) {
      //   recipient.send(JSON.stringify({ type: 'message', senderId: token, data: { 'message': data.data.message } }));
      // }
      clients.forEach(function each(client) {
        console.log("hi ");
        // client.readyState === WebSocket.OPEN && 
        if (client ==recipient ) {
          //@ts-ignore
          console.log("client " +JSON.stringify( client.token));
          console.log("recipient " + JSON.stringify( recipient));
          
          
          client.send(JSON.stringify({ type: 'message', senderId: token, data: { 'message': data.data.message } }));
        
        }
      });
    }
   
  
  });
  
   console.log(" hi from upside of ws.send ");
   
  ws.send(JSON.stringify({
    type : 'message',
    data : { message : "hello from server"}
   
  }));
  console.log(" hi from downside of ws.send ");
   
});
