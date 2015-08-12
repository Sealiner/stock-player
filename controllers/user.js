var User = require('../models/user'),
	helper = require('../utils/helper');

exports.login = function (req, res) {
	var method = req.method;
	switch (method) {
		case "GET":
			GET();
			break;
		case "POST":
			POST();
			break;
		default:
			DEFAULT();
	}
	//GET方法：显示登录页
	function GET () {
		if (helper.isLogin(req)) {
			//session中已有身份，跳至用户中心
			res.redirect('/user/center');
		} else {
			res.render("user/login", {
				title: "登录",
				pageName: "userLogin"
			});
		}
	}
	//POST方法：登录验证
	function POST () {
		if (helper.isLogin(req)) {
			res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
			res.end("您已登录，切换帐户请先退出");
		} else {
			var data = req.body,
				username = data.username,
				password = data.password,
				age = data.age,
				remember = data.remember;

			var args = {
				username: username,
				password: password
			};

			var user = new User(args);
			user.login(function (err, result) {
				if (err) {
					res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
					res.end("登录失败！");
				} else {
					//比较返回的密码和自身密码
					if (result[0] && result[0].password === helper.digestPassword(user.password)) {
						user = new User(result[0]);
						delete user.password;
						delete user.id;
						//登录成功，给予身份session
						var stock_player_id = "stock-player-" + (new Date().getTime()) + "-" + Math.round(Math.random()*1000);
						req.session.user = {
							id: stock_player_id,
							info: user
						}
						if(remember){
							req.session.cookie.maxAge = 7*24*60*60*1000; //记录一周
						}
						res.redirect("/user/center"); 
					} else {
						res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
						res.end("用户名或密码不正确！");
					}
				}
			});
		}
	}
	//DEFAULT方法
	function DEFAULT () {
		res.render('error/404', {
			title: "找不到页面404",
			pageName: "404"
		});
	}
}

exports.register = function (req, res) {
	var method = req.method;
	switch (method) {
		case "GET":
			GET();
			break;
		case "POST":
			POST();
			break;
		default:
			DEFAULT();
	}
	//GET方法：显示注册页
	function GET () {
		if (helper.isLogin(req)) {
			//session中已有身份，跳至用户中心
			res.redirect('/user/center');
		} else {
			res.render("user/register", {
				title: "注册",
				pageName: "userRegister"
			});
		}
	}
	//POST方法：注册用户
	function POST () {
		if (helper.isLogin(req)) {
			res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
			res.end("您已登录，重新注册请先退出");
		} else {
			var data = req.body,
				username = data.username,
				password = data.password,
				age = data.age;

			var args = {
				username: username,
				password: password,
				age: age
			};

			var user = new User(args);
			user.register(function (err, result) {
				if(err){
					res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
					if (err.code === "ER_DUP_ENTRY") {
						res.end("该用户名已存在！")
					} else {
						res.end("注册失败！");
					}		
				} else {
					//注册成功，给予身份session
					delete user.password;
					var stock_player_id = "stock-player-" + (new Date().getTime()) + "-" + Math.round(Math.random()*1000);
					req.session.user = {
						id: stock_player_id,
						info: user
					}
					res.redirect("/user/center");
				}
			});
		}
	}
	//DEFAULT方法
	function DEFAULT () {
		res.render('error/404', {
			title: "找不到页面404",
			pageName: "404"
		});
	}
}

exports.center = function (req, res) {
	var method = req.method;
	switch (method) {
		case "GET":
			GET();
			break;
		default:
			DEFAULT();
	}
	//GET方法：显示用户中心页面
	function GET () {
		if (helper.isLogin(req)) {
			var params = {};
			params.user = req.session.user.info;
			res.render("user/center", {
				title: "用户中心",
				pageName: "userCenter",
				params: params
			});
		} else {
			res.redirect("/user/login");
		}
	}
	//DEFAULT方法
	function DEFAULT () {
		res.render('error/404', {
			title: "找不到页面404",
			pageName: "404"
		});
	}
}

exports.logout = function (req, res) {
	req.session.destroy(function (err) {
		if (err) {
			res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
			res.end("退出失败！");
		} else {
			res.redirect('/user/login');
		}
	});
}