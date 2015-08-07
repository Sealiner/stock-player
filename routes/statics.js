var express = require("express"),
	router = express.Router();

router.get('/', function (req, res, next) {
	res.render('home', {
		title: "首页",
		pageName: "home"
	});
});

module.exports = router;