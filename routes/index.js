//此路由中的页面不必登录亦可访问
var express = require("express"),
	router = express.Router();

router.get("/home", function(req, res, next){
	res.render("home", {
		title: "首页",
		pageName: "home"
	});
})

module.exports = router;