const express = require('express');
const router = express.Router();
const ReceitasController = require('./receitas-controller');

router.get("/", ReceitasController.obterReceitas);
router.post("/", ReceitasController.salvarReceita);
router.put("/:id", ReceitasController.salvarReceita);

module.exports = router;
