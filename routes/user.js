var express = require("express"),
	router = express.Router(),
    querystring = require("querystring");

router.get("/user/login", function(req, res, next){
	if(req.session.user && req.session.user.id){
		//session中已有身份，跳至用户中心
		res.redirect('/user/center');
	} else {
		res.render("user/login", {
			title: "登录",
			pageName: "userLogin"
		});
	}
});

router.get("/user/center", function(req, res, next){
	res.render("user/center",{
		title: "用户中心",
		pageName: "userCenter",
		id: req.session.user.id
	});
});

router.post("/user/verifyLogin", function(req, res, next){
	var data = req.body;
	
});

module.exports = router;