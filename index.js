require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();
const PORT = process.env.PORT || 6060;
let columns = JSON.parse(fs.readFileSync('./columns.json', () => { }).toString())

app.use(express.json({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case 'connection':
                console.log(1);
                broadcastConnection(ws, columns, 'connection');
                break
            case 'broadcast':
                //fs.writeFile('./columns.json', JSON.stringify(msg.columns), () => { });
                broadcastConnection(ws, msg.columns, 'broadcast');
                break
        }
    })
});


app.use('/column', require('./routes/columns.route'));

async function start() {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    } catch (e) {
        console.log(e)
    }
}

const broadcastConnection = (ws, columns, method) => {
    aWss.clients.forEach(client => {
        //if (client.id === msg.id) {
            const msg = {method: method, data: columns}
            client.send(JSON.stringify(msg));
        //}
    })
}

start();