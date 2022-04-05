const Room = require('../models/roomSchema');
const roomService = require('../service/roomService');
const ApiError = require('../exceptions/apiError');

class RoomController {
    async findRoom(req, res, next) {
        const roomId = req.params.roomId;
        const isRoom = await roomService.findRoom(roomId);

        return res.json(isRoom);
    }

    async createRoom(req, res, next) {
        const { roomId } = req.body;
        const room = await roomService.findRoom(roomId);
        if (room) {
            return res.json({ room })
        }

        const newRoom = await roomService.createRoom(roomId);
        res.json({ newRoom });
    }

    async deleteRoom(req, res, next) {
        const { roomId } = req.body;
        await roomService.deleteRoom(roomId);
    }

    async connectRoom(id) {
        const room = await roomService.findRoom(id);

        return room;
    }

    async setColumns(data, roomId) {
        const updatedRoom = { '1': data[1], '2': data[2], '3': data[3] };
        await Room.updateOne({ roomId }, { $set: updatedRoom });
    }
}

module.exports = new RoomController()