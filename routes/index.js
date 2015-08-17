var express = require("express"),
	router = express.Router();

/**
 * 罗列所有控制器{控制器名:控制器文件加载路径}
 */
var controllers = {
	user: "../controllers/user",
	stock: "../controllers/stock",
	block: "../controllers/block"
}

/**
 * 加载所有罗列的控制器
 */
var ctrls = {};
try {
	for (var i in controllers) {
 		var m = require(controllers[i]);
 		ctrls[i] = m;
 	}
} catch (e) {
 	console.log("failed to load some modules: " + e);
}

/**
 * 映射url
 */
router.use(function (req, res, next) {
	var paths = req.path.split('/'),
		controller = paths[1] || "index",
		action = paths[2] || "index",
		targetCtrl = null;
	for (var i in ctrls) {
		if (controller === i) {
			targetCtrl = ctrls[i];
			break;
		}
	}
	if (targetCtrl && targetCtrl[action]) {
		targetCtrl[action].call(null, req, res);
	} else if (controller === "index" && action === "index") {
		res.redirect('/user/login');
	} else {
		handle404(req, res); //无法找到对应的controller/action
	}
});

function handle404 (req, res) {
	res.render('error/404', {
		title: "找不到页面404",
		pageName: "404"
	});
}

module.exports = router;