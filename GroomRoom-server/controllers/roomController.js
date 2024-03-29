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
        const isUserExist = room.users.find(us => us.id === user.id);

        if (user.id && !isUserExist) {
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
        try {
            console.log(roomId);
            const room = await roomService.findRoom(roomId);
            room.users = room.users.filter(us => us.id !== user.id);
            await room.save();

            return room.users;
        } catch (e) {
            console.log(e);
        }
    }

    async vote(roomId, updatedUsers) {
        try {
            const room = await roomService.findRoom(roomId);
            room.users = updatedUsers;
            await room.save();

        } catch (e) {
            console.log(e);
        }

    }

    async reveal(roomId) {
        try {
            const room = await roomService.findRoom(roomId);
            room.isReveal = !room.isReveal;
            await room.save();

            return room.isReveal;
        } catch (e) {
            console.log(e);
        }
    }

    async sortUsers(roomId, sortedUsers) {
        try {
            const room = await roomService.findRoom(roomId);
            room.users = sortedUsers;
            await room.save();

        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new RoomController()