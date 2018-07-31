const ReceitasService = require('./receitas-service');
const Receita = require('./receita-model');

module.exports.obterReceitas = async (req, res, next) => {
    try {
        const receitas = await ReceitasService.obterReceitas();
        res.status(200).send(receitas);
    } catch (error) {
        res.status(500).send({
            message: err.message || err
        });
    }
}

module.exports.obterReceita = async (req, res, next) => {
    try {
        const receita = await ReceitasService.obterReceita(req.params.id);
        res.status(200).send(receita);
    } catch (err) {
        res.status(500).send({
            message: err.message || err
        });
    }
}

module.exports.salvarReceita = async (req, res, next) => {

    try {
        let receita;
        if (req.params.id != 'undefined') {
            receita = await ReceitasService.obterReceita(req.params.id);
            if (receita) receita.set(req.body);
        }
        else {
            receita = new Receita(req.body);
        }
        receita = await receita.save();
        res.status(200).send(receita);
    } catch (err) {
        res.status(500).send({
            message: err.message || err
        });
    }
}