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
		if (helper.isLogin(req)) {
			var	username = req.session.user.info.username;
			var block = new Block();
			block.queryBlockByUsername(username, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					var params = {};
					params.user = req.session.user.info;
					var blocks = [];
					for (var i = 0; i < result.length; i++){
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
					res.render('stock/editBlock', {
						title: "编辑板块",
						pageName: "editBlock",
						params: params
					});
				}
			});
		} else {
			res.redirect('/user/login');
		}
		
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
