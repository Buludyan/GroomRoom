require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errorMiddleware');
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
app.use(cookieParser());
app.use('/auth', require('./routes/auth.route'));
app.use(errorMiddleware);

app.ws('/', (ws, req) => {
    ws.on('message', async (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case 'connection':
                const columns = await columnsController.getColumns(msg.id);
                connectionHandler(ws, columns, 'connection', msg.id);
                break
            case 'broadcast':
                await columnsController.setColumns(msg.columns, msg.clientId);
                broadcastConnection(ws, msg.columns, 'broadcast', msg.clientId);
                break
        }
    })
});

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

const connectionHandler = (ws, columns, method, id) => {
    ws.id = id
    broadcastConnection(ws, columns, method, id)
}

const broadcastConnection = (ws, columns, method, id) => {
    aWss.clients.forEach(client => {
        if (client.id === id) {
            const msg = { method: method, columns: columns, id: id }
            client.send(JSON.stringify(msg));
        }
    })
}

start();