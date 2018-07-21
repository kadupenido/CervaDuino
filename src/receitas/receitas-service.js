const Receita = require('./receita-model');

module.exports.obterReceitas = () => {
    return Receita.find();
}