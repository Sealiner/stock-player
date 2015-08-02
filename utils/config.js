var config = {},
	NODE_ENV = process.env.NODE_ENV;
if("development" === NODE_ENV){
	config = require('./config_development');
	config.env = "development";
}else if("pl" === NODE_ENV){
	config = require('./config_pl');
	config.env = "pl";
}else if("production" === NODE_ENV){
	config = require('./config_production');
	config.env = "production";
}else if("qa" === NODE_ENV){
	config = require('./config_qa');
	config.env = "qa";
}else{
	config = require('./config_development');
	config.env = "development";
}

module.exports = config;