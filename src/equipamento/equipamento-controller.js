const EquipamentoService = require('./equipamento-service');
const Equipamento = require('./equipamento-model');

module.exports.obterEquipamento = async (req, res, next) => {
    try {
        const equip = await EquipamentoService.obterEquipamento();
        res.status(200).send(equip);
    } catch (err) {
        res.status(500).send({
            message: err.message || err
        });
    }
}

module.exports.salvarEquipamento = async (req, res, next) => {
    try {
        let equip = await EquipamentoService.obterEquipamento();
        if (equip) {
            equip.set(req.body);
        }
        else {
            equip = new Equipamento(req.body);
        }
        equip = await equip.save();
        res.status(200).send(equip);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || err
        });
    }
}
