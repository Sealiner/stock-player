var User = require('../models/user');

exports.login = function (args, fn) {
	var user = new User(args);
	user.login(function(err, result){
		//比较返回的密码和自身密码
		fn(err, result);
	});
}

exports.register = function (args, fn) {
	var user = new User(args);
	user.register(function(err, result){
		if(err){
			fn(err, result);
		} else {
			fn(null, result);
		}
	});
}
