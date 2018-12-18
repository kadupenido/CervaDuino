/**
 * Application root
 *
 * @module app
 **/

'use strict';

var config = require('./config');
var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Socket = require('./src/Socket');

// Instância do app
var app = express();
var server;

// Habilita o log
app.use(morgan('dev'));

// Habilita cors
app.use(cors());

// Configura o body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Carrega o mongoose
mongoose.connect(config.mongo.connect);

/**
 * Router
 */
{
    const mainRoute = require('./src/app-router');
    const configuracaoRoute = require('./src/configuracao/configuracao-route');
    const receitaRoute = require('./src/receitas/receitas-route');

    app.use('/', mainRoute);
    app.use('/configuracao', configuracaoRoute);
    app.use('/receitas', receitaRoute);
}

server = require('http').createServer(app);
server.listen(config.port, function() {
    console.log('Server is listening on ' + config.port);
});

/**
 * socket.io
 */
{
    const io = require('socket.io')(server);

    Socket.init(io);
}

/*
 * Core
 */
{
    let core = require('./core');
  
    Socket.setCoreEmitter(core.emitter);
  
    core.init();
  }
  