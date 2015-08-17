var Block = require('../models/block'),
	helper = require('../utils/helper');

exports.editBlock = function (req, res) {
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
	//GET方法：显示编辑页面
	function GET () {
		var params = {};
		params.user = req.session.user.info;
		res.render('stock/editBlock', {
			title: "编辑板块",
			pageName: "editBlock",
			params: params
		});
	}
	//POST方法：保存修改
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
