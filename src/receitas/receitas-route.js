const express = require('express');
const router = express.Router();
const ReceitasController = require('./receitas-controller');

router.get("/", ReceitasController.obterReceitas);
router.get("/:id", ReceitasController.obterReceita);
router.post("/:id", ReceitasController.salvarReceita);

module.exports = router;
