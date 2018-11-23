const board = require('./board');

module.exports.isReady = async (req, res, next) => {
    res.status(200).send({ isReady: board.isReady() });
}

module.exports.getData = async (req, res, next) => {
    res.status(200).send(board.getData());
}

module.exports.setData = async (req, res, next) => {
    board.setData(req.body);
    res.status(200).send(board.getData());
}
