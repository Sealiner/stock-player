var Stock = require('../models/stock'),
	helper = require('../utils/helper');

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
			var args = {
				symbol: "sh000001",
				begin_date: "19900101",
				end_date: "20150810"
			};
			stock.fetchHistory(args, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					var params = {};
					params.data = result;
					res.render("stock/showGraphCV", {
						title: "CV图",
						pageName: "showGraphCV",
						params: params
					});
				}
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