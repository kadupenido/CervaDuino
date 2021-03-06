const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config/config');

// Instância do app
const app = express();

// Habilita o log
app.use(morgan('dev'));

// Habilita cors
app.use(cors());

// Configura o body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Carrega o mongoose
mongoose.connect(config.database);

// Carrega as rotas
const mainRoute = require('./app-router');
const configuracaoRoute = require('./configuracao/configuracao-route');
const receitaRoute = require('./receitas/receitas-route');

app.use('/', mainRoute);
app.use('/configuracao', configuracaoRoute);
app.use('/receitas', receitaRoute);

module.exports = app;
