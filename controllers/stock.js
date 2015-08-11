var Stock = require('../models/stock');

exports.showGraphCV = function (req, res) {
	var stock = new Stock();
	var args = {
		symbol: "sh000001",
		begin_date: "19900101",
		end_date: "20150810"
	};
	stock.fetch(args, function (err, result) {
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
}