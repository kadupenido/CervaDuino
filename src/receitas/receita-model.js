const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RampaSchema = new Schema({
    temperatura: {
        type: Number,
        required: true
    },
    minutos: {
        type: Number,
        required: true
    },
});

const AdicaoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    qtde: {
        type: Number,
        required: true
    },
    minutos: {
        type: String,
        required: true
    },
});

const ReceitaSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    estilo: {
        type: String,
        required: true
    },
    lkg: {
        type: Number,
        required: true
    },
    graos: {
        type: Number,
        required: true
    },
    litros: {
        type: Number,
        required: true
    },
    rampas: {
        type: [RampaSchema],
        required: true
    },
    adicoes: {
        type: [AdicaoSchema],
        required: true
    }
});

const Receita = mongoose.model('Receita', ReceitaSchema);

module.exports = Receita;