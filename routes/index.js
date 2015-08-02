var express = require("express"),
	router = express.Router(),
    querystring = require("querystring");

router.get("/", function(req, res, next){
	if(req.session.user && req.session.user.id){
		//session中已有身份
	}
	else{
		var stock_player_id = "stock-player-" + (new Date().getTime()) + "-" + Math.round(Math.random()*1000);
		req.session.user = {
			id: stock_player_id
		}
	}
	res.render("home", {
		title: "首页",
		pageName: "home"
	});
});

module.exports = router;