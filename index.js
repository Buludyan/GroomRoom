require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
const { columnsController } = require('./controllers/columnsController');

const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();
const PORT = process.env.PORT || 6060;

app.use(express.json({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.ws('/', (ws, req) => {
    ws.on('message', async (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case 'connection':
                const columns = await columnsController.getColumns();
                broadcastConnection(ws, columns, 'connection');
                break
            case 'broadcast':
                await columnsController.setColumns(msg.columns);
                broadcastConnection(ws, msg.columns, 'broadcast');
                break
        }
    })
});

//app.use('/column', require('./routes/columns.route'));

async function start() {
    try {
        await mongoose.connect('mongodb+srv://GroomRoom:GroomRoom@cluster0.6rbjg.mongodb.net/GroomRoom?retryWrites=true&w=majority', {
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

const broadcastConnection = (ws, columns, method) => {
    aWss.clients.forEach(client => {
        //if (client.id === msg.id) {
        const msg = { method: method, columns: columns }
        client.send(JSON.stringify(msg));
        //}
    })
}

start();