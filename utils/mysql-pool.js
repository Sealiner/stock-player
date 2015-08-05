var config = require('./config');
var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit: config.db_mysql.connectionLimit,
	host: config.db_mysql.host,
	port: config.db_mysql.port,
	user: config.db_mysql.user,
	password: config.db_mysql.password,
	database: config.db_mysql.database,
	waitForConnections: true,
	acquireTimeout: 10000,
	queueLimit: 0
});

module.exports = pool;