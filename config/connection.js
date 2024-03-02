const { connect, connection } = require('mongoose');

// Mongoose connection to MongoDB database 'social-network-db'
connect('mongodb://127.0.0.1:27017/social-network-db');

module.exports = connection;
