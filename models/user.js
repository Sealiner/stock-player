var dao = require('../utils/dao'),
	crypto = require('crypto'),
	config = require('../utils/config');

function User (args) {
	this.username = args.username;
	this.password = args.password;
}
User.prototype = {
	login: function(fn){
		var selectSQL = "select password from t_user where name = ?",
			name = this.username;
		
		dao.getConnection(function(err, conn){
			if(err){
				console.log(err);
			} else {
				conn.query(selectSQL, [name], function(err, result){
					conn.release();
					fn(err, result);
				});
			}
		});
		
	},
	register: function(fn){
		//对密码加密
    	var content = this.password + config.key_user_pwd;
    	var shasum = crypto.createHash('sha1');
    	shasum.update(content);
    	this.password = shasum.digest('hex').substring(0,16);
    	// 
		var insertSQL = "insert into t_user(name, password) values(?, ?)",
			name = this.username,
			password = this.password;

		dao.getConnection(function(err, conn){
			if(err){
				console.log(err);
			} else {
				conn.query(insertSQL, [name, password], function(err, result){
					conn.release();
					fn(err, result);
				});
			}
		});
		
	}
}

module.exports = User;