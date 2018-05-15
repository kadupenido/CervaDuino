const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TankSchema = new Schema({
    altura: {
        type: Number,
        required: true
    },
    diametro: {
        type: Number,
        required: true
    },
    espacoPerdido: {
        type: Number,
        required: true
    },
    taxaEvaporacao: {
        type: Number,
        required: false
    },
    capacidade: {
        type: Number
    }
});

const EquipamentoSchema = new Schema({
    hlt: TankSchema,
    mlt: TankSchema,
    bk: TankSchema
});

const Equipamento = mongoose.model('Equipamento', EquipamentoSchema, 'equipamento');

EquipamentoSchema.pre("save", function (next) {

    this.hlt.capacidade = calcCapacidade(this.hlt.diametro, this.hlt.altura);
    this.mlt.capacidade = calcCapacidade(this.mlt.diametro, this.mlt.altura);
    this.bk.capacidade = calcCapacidade(this.bk.diametro, this.bk.altura);

    next();
});

function calcCapacidade(diametro, altura) {
    const raio = diametro / 2;
    return Math.round(Math.PI * raio * raio * (altura / 1000) * 100) / 100;
}


module.exports = Equipamento;