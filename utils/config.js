var config = {},
	NODE_ENV = process.env.NODE_ENV;
if("development" === NODE_ENV) {
	config = require('./config_development');
	config.env = "development";
} else if("test" === NODE_ENV) {
	config = require('./config_test');
	config.env = "test";
} else if("production" === NODE_ENV) {
	config = require('./config_production');
	config.env = "production";
} else {
	config = require('./config_development');
	config.env = "development";
}

module.exports = config;