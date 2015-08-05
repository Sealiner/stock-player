var User = require('../models/user'),
	helper = require('../utils/helper');

exports.login = function (args, fn) {
	var user = new User(args);
	user.login(function(err, result){
		if (err) {
			fn(err, null);
		} else {
			//比较返回的密码和自身密码
			if (result[0] && result[0].password === helper.digestPassword(user.password)) {
				user = new User(result[0]);
				delete user.password;
				delete user.id;
				fn(null, user);
			} else {
				var err = {message: "密码不正确"};
				fn(err, null);
			}
		}
	});
}

exports.register = function (args, fn) {
	var user = new User(args);
	user.register(function(err, result){
		if (err) {
			fn(err, result);
		} else {
			delete user.password;
			fn(null, user);
		}
	});
}
