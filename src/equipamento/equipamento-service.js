const Equipamento = require('./equipamento-model');

module.exports.obterEquipamento = () => {
    return Equipamento.findOne();
}