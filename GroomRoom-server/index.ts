import express from 'express';
import { setWsHeartbeat } from './node_modules/ws-heartbeat/server';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/errorMiddleware';
import roomController from './controllers/roomController';
import mongoose, { ConnectOptions, Error } from "mongoose";
import { Request, Response, NextFunction } from 'express';
import expressWs from 'express-ws'

dotenv.config();
const { app, getWss } = expressWs(express())
const aWss = getWss();

const PORT = process.env.PORT || 6060;

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser());
app.use('/auth', require('./routes/auth.route'));
app.use('/room', require('./routes/room.route'));
app.use(errorMiddleware);

app.ws('/', (ws: any, req: any) => {
    ws.on('message', async (msg: any) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case 'connection':
                const { id, user } = msg;
                const room = await roomController.connectRoom(id, user);
                connectionHandler(ws, room, 'connection', id, user, id);
                break
            case 'broadcast':
                await roomController.updateRoom(msg.columns, msg.id);
                broadcastConnection(ws, msg.columns, 'broadcast', msg.id);
                break
            case 'voting':
                const { roomId, updatedUsers, userId } = msg;
                await roomController.vote(roomId, updatedUsers);
                broadcastConnection(ws, updatedUsers, 'voting', msg.id);
                break
            case 'revoteAll':
                broadcastConnection(ws, {}, 'revoteAll', msg.id);
                break
            case 'reveal':
                const isReveal = await roomController.reveal(msg.roomId);
                broadcastConnection(ws, isReveal, 'reveal', msg.id);
                break
            case 'sortUsers':
                await roomController.sortUsers(msg.roomId, msg.sortedUsers);
                broadcastConnection(ws, msg.sortedUsers, 'sortUsers', msg.id);
                break
        }
    })
    ws.on('close', async () => {
        if (ws.id && ws.user) {
            const users = await roomController.closeRoom(ws.id, ws.user);
            broadcastConnection(ws, users, 'close', ws.id);
        }
    });
});

process.on('warning', e => console.warn(e.stack));

const connectionHandler = (
    ws: any, 
    columns: Object,
    method: string,
    id: string,
    user: Object,
    clientId: string
) => {

    ws.id = id;
    ws.user = user;
    ws.clientId = clientId;

    broadcastConnection(ws, columns, method, id)
}

const broadcastConnection = (ws: any, data: any, method: string, id: string) => {
    aWss.clients.forEach((client: any) => {
        if (client.id === id) {
            const msg = { method, data, id };
            client.send(JSON.stringify(msg));
        }
    })
}

setWsHeartbeat(aWss, (ws: any, data: any) => {
    if (data === '{"kind":"ping"}') {
        ws.send('{"kind":"pong"}');
    }
}, 15000); // in 15 seconds, if no message accepted from client, close the connection.

async function start() {
    try {
        await mongoose.connect(process.env.DB_URL!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    } catch (e) {
        console.log(e)
    }
}


start();