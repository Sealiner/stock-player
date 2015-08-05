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
		var selectSQL = "select * from t_user where username = ?",
			username = this.username;
		
		DAO.query(selectSQL, [username], function (err, result) {
			fn(err, result);
		});	
	},
	register: function(fn){
		var insertSQL = "insert into t_user(username, password) values(?, ?)",
			username = this.username,
			password = helper.digestPassword(this.password);

		DAO.query(insertSQL, [username, password], function (err, result) {
			fn(err, result);
		});
	}
}

module.exports = User;