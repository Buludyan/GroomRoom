require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errorMiddleware');
const roomController = require('./controllers/roomController');
const { setWsHeartbeat } = require('./node_modules/ws-heartbeat/server');


const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();
const PORT = process.env.PORT || 6060;


app.use(express.json({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(cookieParser());
app.use('/auth', require('./routes/auth.route'));
app.use('/room', require('./routes/room.route'));
app.use(errorMiddleware);

app.ws('/', (ws, req) => {
    ws.on('message', async (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case 'connection':
                const { id, user } = msg;
                const room = await roomController.connectRoom(id, user);
                connectionHandler(ws, room, 'connection', id);
                break
            case 'broadcast':
                await roomController.updateRoom(msg.columns, msg.id);
                broadcastConnection(ws, msg.columns, 'broadcast', msg.id);
                break
            case 'close':
                const users = await roomController.closeRoom(msg.roomId, msg.user);
                broadcastConnection(ws, users, 'close', msg.id)
        }
        ws.on('close', () => console.log(1))
    })
});


setWsHeartbeat(aWss, (ws, data, flag) => {
    console.log(data);
    if (data === '{"kind":"ping"}') {
        ws.send('{"kind":"pong"}');
    }
}, 15000); // in 15 seconds, if no message accepted from client, close the connection.


const connectionHandler = (ws, columns, method, id) => {
    ws.id = id
    broadcastConnection(ws, columns, method, id)
}

const broadcastConnection = (ws, data, method, id) => {
    aWss.clients.forEach(client => {
        if (client.id === id) {
            const msg = { method, data, id }
            client.send(JSON.stringify(msg));
        }
    })
}

async function start() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    } catch (e) {
        console.log(e)
    }
}


start();