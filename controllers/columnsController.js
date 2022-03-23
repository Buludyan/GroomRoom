const Column = require('../models/columnsSchema');

const columnsController = {
   async setColumns(data) {
        const updatedColumns = {'1': data[1], '2': data[2], '3': data[3]};
        await Column.updateOne({name: 'To do'}, { $set: updatedColumns });

    },
    async getColumns() {
        const columns = await Column.findOne({ name: 'To do' });
        return columns;
    }
}

module.exports.columnsController = columnsController;