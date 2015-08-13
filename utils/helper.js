var crypto = require('crypto'),
	config = require('./config');

//帮助类
var helper = {}

/**
 * 加密函数，用于对用户输入的明文密码加密
 * @param pwd {String} 明文密码
 * @return {String} 16位加密后的密码
 */
helper.digestPassword = function (pwd) {
    var content = pwd + config.key_user_pwd;
    var shasum = crypto.createHash('sha1');
    shasum.update(content);
    var secret = shasum.digest('hex');
    return secret;
}

/**
 * 验证用户是否已登录
 * @param {object} 请求对象
 * @return {boolean} 若已登录则返回true，否则返回false
 */
 helper.isLogin = function (req) {
 	if (req.session.user && req.session.user.id){
		return true;
	} else {
		return false;
	}
 }

/**
 * 响应JSON数据
 * @param {object} 请求对象
 * @param {object} 响应对象
 * @param {object} 响应数据
 */
 helper.rendJSON = function (req, res, data) {
 	if (data instanceof Object) {
 		data = JSON.stringify(data);
 	} else {
 		data = {
 			code: 10000,
 			message: "API returns wrong data!"
 		};
 		data = JSON.stringify(data);
 	}
 	var headers = {
 		'Content-Type': 'text/html',
 		'charset': 'utf-8'
 	};
 	res.writeHead(200, headers);
 	res.end(data);
 }

module.exports = helper;