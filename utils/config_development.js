var config ={
	port:5080,
	db_mongo: {
		cookie_secret: "STOCK",
		url: 'mongodb://localhost/user'
	},
	db_mysql: {
		connectionLimit: 150,
		host: "localhost",
		port: "3306",
		user: 'jisu3',
		password: '12225502',
		database: 'db_stock_user'
	},
	key_user_pwd: "STOCK",
	api: {
		sina: "http://biz.finance.sina.com.cn/stock/flash_hq/kline_data.php"//?symbol=sh600398&begin_date=20150612&end_date=20150727
	}
}

module.exports = config;