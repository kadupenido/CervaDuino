const Configuracao = require('./configuracao-model');

module.exports.obterConfiguracao = () => {
    return Configuracao.findOne();
}