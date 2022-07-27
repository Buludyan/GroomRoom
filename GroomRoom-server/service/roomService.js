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
                "items": [
                    {
                        'id': "1",
                        'content': "First task in Todo",
                        'description': "So, this is a task in the todo list. You can swap it with the bottom task, just drag the card down. You can also edit the title and description of the card or delete it if necessary.",
                        'link': '',
                        'value': 0
                    },
                    {
                        'id': "2",
                        'content': "Second task in Todo",
                        'description': "At any time you can add your own task by clicking on the plus sign above",
                        'link': '',
                        'value': 0
                    }
                ]
            },
            "2": {
                "name": "In Progress",
                "items": [
                    {
                        'id': "3",
                        'content': "Task in progress",
                        'description': "This is a task In Progress. This means that at the moment a vote will be held to evaluate this task. You should click on the rating and wait for others to vote, then open the ratings and if a consensus is found, go to the next card or re-vote.",
                        'link': '',
                        'value': 0
                    }
                ]
            },
            "3": {
                "name": "Done",
                "items": [
                    {
                        'id': "4",
                        'content': "First task in Done",
                        'description': "In the Done section, tasks that have already been evaluated. You can see the score below. However, at any time you can take this card and re-vote.",
                        'link': '',
                        'value': 13
                    },
                    {
                        'id': "5",
                        'content': "Second task in Done",
                        'description': "Tasks in any of the Todo and Done sections can be dragged to In Progress any time",
                        'link': '',
                        'value': 5
                    }
                ]
            },
            adminId: roomId,
            roomId
        })

        data.save();

        return data;
    }
}

module.exports = new RoomService();