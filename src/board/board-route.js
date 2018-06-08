const express = require('express');
const router = express.Router();
const BoardController = require('./board-controller');

router.get("/isReady", BoardController.isReady);
router.get("/", BoardController.getData);
router.post("/", BoardController.setData);

module.exports = router;
