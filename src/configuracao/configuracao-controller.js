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
