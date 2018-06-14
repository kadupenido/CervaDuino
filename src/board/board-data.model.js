const dataModel = {
    hlt: {
        temperatura: 0,
        setPoint: 0,
        resistencia: false
    },
    mlt: {
        temperatura: 0,
        setPoint: 0,
        resistencia: false,
        recirculacao: false,
    },
    bk: {
        resistencia: false,
        potencia: 0,
    },
    consumo: {
        energia: 0,
        potencia: 0,
        corrente: 0
    },
    temperaturaCircuito: 0,
};

module.exports = dataModel;