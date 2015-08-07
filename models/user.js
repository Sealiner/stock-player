var DAO = require('../utils/dao'),
	helper = require('../utils/helper');

//User模型
function User (args) {
	for(var k in args){
		this[k] = args[k];
	}
}
User.prototype = {
	login: function(fn){
		var querySQL = "select * from t_user where username = ?",
			username = this.username;
		
		DAO.query(querySQL, [username], function (err, result) {
			fn(err, result);
		});	
	},
	register: function(fn){
		var querySQL = "insert into t_user(username, password, age) values(?, ?, ?)",
			username = this.username,
			password = helper.digestPassword(this.password),
			age = this.age;

		DAO.query(querySQL, [username, password, age], function (err, result) {
			fn(err, result);
		});
	}
}

module.exports = User;