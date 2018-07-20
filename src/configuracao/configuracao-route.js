const express = require('express');
const router = express.Router();
const ConfiguracaoController = require('./configuracao-controller');

router.get("/", ConfiguracaoController.obterConfiguracao);
router.post("/", ConfiguracaoController.salvarConfiguracao);

module.exports = router;
