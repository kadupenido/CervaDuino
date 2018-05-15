const express = require('express');
const router = express.Router();
const EquipamentoController = require('./equipamento-controller');

router.get("/", EquipamentoController.obterEquipamento);
router.post("/", EquipamentoController.salvarEquipamento);

module.exports = router;
