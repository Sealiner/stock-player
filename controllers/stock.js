var Stock = require('../models/stock'),
	Block = require('../models/block'),
	helper = require('../utils/helper'),
	async = require('async');

exports.showGraphCV = function (req, res) {
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
	//GET方法：显示默认的CV图
	function GET () {
		if (helper.isLogin(req)) {
			var stock = new Stock();
			var block = new Block();
			var params = {};
			params.user = req.session.user.info;
			async.parallel({
				fetchStock: function (fn) {
					var args = {
						symbol: "sh000001",
						begin_date: "20120101"
					};
					stock.fetchHistory(args, function (err, result) {
						if (err) {
							console.log(err);
						} else {
							params.data = result;
							fn(null, result);
						}
					});
				},
				initBlock: function (fn) {
					var username = req.session.user.info.username;
					block.queryBlockByUsername(username, function (err, result) {
						var blocks = [];
						for (var i = 0; i < result.length; i++) {
							var id = result[i].id;
							var blockname = result[i].blockname;
							var stocks = result[i].stocks ? result[i].stocks.split(',') : [];
							var blockObj = {
								id: id,
								blockname: blockname,
								stocks: stocks
							};
							blocks.push(blockObj);
						}
						params.blocks = blocks;
						fn(null, result);
					});
				}
			}, function (err, result) {
				res.render("stock/showGraphCV", {
					title: "CV图",
					pageName: "showGraphCV",
					params: params
				});
			});
			
		} else {
			res.render("user/login", {
				title: "登录",
				pageName: "userLogin"
			});
		}
	}
	//GET方法：根据用户选择显示图表
	function POST () {
		
	}
	//DEFAULT方法
	function DEFAULT () {
		res.render('error/404', {
			title: "找不到页面404",
			pageName: "404"
		});
	}
}
