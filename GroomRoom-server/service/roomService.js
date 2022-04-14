const Room = require('../models/roomSchema');

class RoomService {
    async findRoom(roomId) {
        const room = await Room.findOne({ roomId });

        return room;
    }

    async deleteRoom(roomId) {
        await Room.deleteOne({ roomId });
    }

    async createRoom(roomId) {
        
        const data = new Room({
            "1": {
                "name": "To do",
                "items": []
            },
            "2": {
                "name": "In Progress",
                "items": []
            },
            "3": {
                "name": "Done",
                "items": []
            },
            adminId: roomId,
            roomId
        })

        data.save();

        return data;
    }
}

module.exports = new RoomService();