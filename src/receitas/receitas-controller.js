const ReceitasService = require('./receitas-service');

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

module.exports.salvarReceita = async (req, res, next) => {

}
