var express = require("express"),
	router = express.Router();

router.all("*", function(req, res, next){
	if(req.session.user && req.session.user.id){
		//session中已有身份
		next();
	} else {
		res.render("user/login", {
			title: "登录",
			pageName: "userLogin"
		});
		// var stock_player_id = "stock-player-" + (new Date().getTime()) + "-" + Math.round(Math.random()*1000);
		// req.session.user = {
		// 	id: stock_player_id
		// }
	}
});

router.get("/home", function(req, res, next){
	res.render("home", {
		title: "首页",
		pageName: "home",
		id: req.session.user.id
	});
})

module.exports = router;