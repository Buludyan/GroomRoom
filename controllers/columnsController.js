const Column = require('../models/columnsSchema');

const columnsController = {
    async setColumns(data, clientId) {
        const updatedColumns = { '1': data[1], '2': data[2], '3': data[3] };
        await Column.updateOne({ clientId: clientId }, { $set: updatedColumns });

    },
    async getColumns(clientId) {
        const isExistColumns = await Column.findOne({ clientId: clientId });

        if(isExistColumns) return isExistColumns;

        const data = new Column({
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
            clientId: clientId
        })

        //data.save();

    }
}

module.exports.columnsController = columnsController;