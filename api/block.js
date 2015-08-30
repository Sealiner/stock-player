var Block = require('../models/block'),
	helper = require('../utils/helper');

exports.newBlock = function (req, res) {
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
			args.blockname = query.blockname,
			args.username = req.session.user.info.username;
			var block = new Block();
			
			block.newBlock(args, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					var params = {};
					params.data = result;
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
	function GET () {

	}
	function POST () {
		if (helper.isLogin(req)) {
			var query = req.body,
				args = {};
			args.blockname = query.blockname;
			args.id = query.id;
			args.username = req.session.user.info.username;
			var block = new Block();
			block.editBlock(args, function (err, result) {
				if (err) {
					console.log(err);
				} else {
					var params = {};
					if (result.code == 10003) {
						params = result;
					} else {
						params.data = result;
						params.code = 0;
						params.message = "success";
					}
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