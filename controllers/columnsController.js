const fs = require('fs');
//let columns = require('../columns.json');

const columnsController = {
    updateTasks(data) {
        const updatedTasks = {...data}
        fs.writeFileSync('../columns.json', JSON.stringify(updatedTasks), (err) => {
            if (err) console.log(err);
        })
    },
}

module.exports.columnsController = columnsController;