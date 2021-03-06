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
	function GET () {

	}
	function POST () {
		if (helper.isLogin(req)) {
			var query = req.body,
				args = {};
			args.symbol = query.symbol,
			args.begin_date = query.begin_date || "20050101",
			args.end_date = query.end_date;
			var stock = new Stock();
			
			stock.fetchHistory(args, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					var params = {};
					params.data = result;
					params.code = 0;
					params.message = "success";
					helper.rendJSON(req, res, params);
				}
			});
		} else {
			var msg = {
				code: 10003,
				message: "not allowed"
			};
			helper.rendJSON(req, res, msg);
		}
	}
	function DEFAULT () {
		var msg = {
			code: 10002,
			message: "wrong request method"
		};
		helper.rendJSON(req, res, msg);
	}
}