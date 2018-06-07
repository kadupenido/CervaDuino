const express = require('express');
const router = express.Router();
const board = require('./board');

router.get('/', (req, res) => {
    board.initBoard();
    res.status(200).send({
        title: 'CERVADUINO API',
        version: '1.0.0',
    });
});

module.exports = router;
