const { Router } = require('express');
const router = Router();
const { columnsController } = require('../controllers/columnsController');

router.get('/task/all', (req, res) => {
    const tasks = columnsController.getTasks();
    res.send(tasks);
})

router.put('/task', (req, res) => {
    console.log(req);
    columnsController.updateTasks(req.body);
    res.status(201).json({ message: 'Данные обновлены' });
})

module.exports = router;