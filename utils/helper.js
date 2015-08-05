var crypto = require('crypto'),
	config = require('./config');

//帮助类
var helper = {}

/**
 * 加密函数，用于对用户输入的明文密码加密
 * @param pwd {String} 明文密码
 * return {String} 16位加密后的密码
 */
helper.digestPassword = function (pwd) {
    var content = pwd + config.key_user_pwd;
    var shasum = crypto.createHash('sha1');
    shasum.update(content);
    var secret = shasum.digest('hex');
    return secret;
}

module.exports = helper;