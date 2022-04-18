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

    async connectRoom(id, user) {
        const room = await roomService.findRoom(id);
        if (user.id) {
            room.users.push(user)
            await room.save();
        }

        return room;
    }

    async updateRoom(data, roomId) {
        const updatedRoom = { '1': data[1], '2': data[2], '3': data[3] };
        await Room.updateOne({ roomId }, { $set: updatedRoom });
    }

    async closeRoom(roomId, user) {
        const room = await roomService.findRoom(roomId);
        room.users = room.users.filter(us => us.id !== user.id);
        await room.save();

        return room.users;
    }

    async vote(userId, roomId, value) {
        const room = await roomService.findRoom(roomId);

        room.votingData.push({
            userId,
            value
        })

        await room.save();

        console.log(room)
        return room.votingData;
    }
}

module.exports = new RoomController()