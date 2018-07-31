const Receita = require('./receita-model');

/**
 * Recupera todas as receitas cadastradas
 */
module.exports.obterReceitas = () => {
    return Receita.find();
}

/**
 * Recupera uma receita
 * @param {*} id Identificador da receita
 */
module.exports.obterReceita = (id) => {
    return Receita.findById(id);
}