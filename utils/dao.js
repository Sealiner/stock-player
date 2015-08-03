var config = require('./config');
var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit: config.db_mysql.connectionLimit,
	host: config.db_mysql.host,
	port: config.db_mysql.port,
	user: config.db_mysql.user,
	password: config.db_mysql.password,
	database: config.db_mysql.database
});

function dao () {

}
dao.prototype = {
	insert: function(){

	},
	find: function(){

	}
}


module.exports = new dao();