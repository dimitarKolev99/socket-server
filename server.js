const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    WebSocket = require('ws');

var CLIENTS = [];

const wss = new WebSocket.Server({ server:server });

wss.on('connection', function(ws, req) {
    ws.send('Welcome new client!');

    const parameters = require('url').parse(req.url, true);
    const id = parameters.query.id;
    ws.id = id;
    CLIENTS.push(ws);

    ws.on('message', function(message) {
     
        if (parameters.query.targetID) {
            const target = parameters.query.targetID;
    
            for (let i of CLIENTS) {
                if (i.id === target) {
                    i.send(`YOU GOT A MESSAGE: ${message}`);
                }
            }
            
    
        } else {
            ws.send(`Couldnt send your message to Client2`);
        }

    });
     
    


});

app.get('/', (req, res) => res.send('Hello'));

server.listen(3000, () => console.log('Server listening on port 3000'));