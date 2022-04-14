const { Router } = require('express');
const router = Router();
const roomController = require('../controllers/roomController');


router.get('/:roomId', roomController.findRoom);

router.post('/', roomController.createRoom);

router.put('/', roomController.deleteRoom);

module.exports = router;