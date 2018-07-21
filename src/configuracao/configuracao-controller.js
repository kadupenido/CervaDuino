const ConfiguracaoService = require('./configuracao-service');
const Configuracao = require('./configuracao-model');

module.exports.obterConfiguracao = async (req, res, next) => {
    try {
        const equip = await ConfiguracaoService.obterConfiguracao();
        res.status(200).send(equip);
    } catch (err) {
        res.status(500).send({
            message: err.message || err
        });
    }
}

module.exports.salvarConfiguracao = async (req, res, next) => {
    try {
        let config = await ConfiguracaoService.obterConfiguracao();
        if (config) {
            config.set(req.body);
        }
        else {
            config = new Configuracao(req.body);
            config.hlt.capacidade = calcCapacidade(config.hlt.diametro, config.hlt.altura);
            config.mlt.capacidade = calcCapacidade(config.mlt.diametro, config.mlt.altura);
            config.bk.capacidade = calcCapacidade(config.bk.diametro, config.bk.altura);
        }
        config = await config.save();
        res.status(200).send(config);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || err
        });
    }
}

function calcCapacidade(diametro, altura) {
    const raio = diametro / 2;
    return Math.round(Math.PI * raio * raio * (altura / 1000) * 100) / 100;
}