var config = {};

config.env = process.env.NODE_ENV;
config.port =  process.env.PORT || 3000;
config.mongo = {
    connect: process.env.MONGODB_URI || 'mongodb://localhost/cervaduino'
};

module.exports = config;