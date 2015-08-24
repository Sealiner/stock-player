var express = require("express"),
	router = express.Router(),
	helper = require("../utils/helper");

/**
 * 罗列所有api{api名:api文件加载路径}
 */
var apiList = {
	stock: "../api/stock",
	block: "../api/block"
}

/**
 * 加载所有罗列的api
 */
var apis = {};
try {
	for (var i in apiList) {
 		var m = require(apiList[i]);
 		apis[i] = m;
 	}
} catch (e) {
 	console.log("failed to load some modules: " + e);
}

/**
 * 映射url
 */
router.use(function (req, res, next) {
	var paths = req.path.split('/');
	if (paths[1] !== "api") {
		next();
	} else {
		var api = paths[2] || "index",
			action = paths[3] || "index",
			targetApi = null;
		for (var i in apis) {
			if (api === i) {
				targetApi = apis[i];
				break;
			}
		}
		if (targetApi && targetApi[action]) {
			targetApi[action].call(null, req, res);
		} else {
			var msg = {
				code: 10001,
				message: "No such API"
			};
			helper.rendJSON(req, res, msg);
		}
	}
});

module.exports = router;