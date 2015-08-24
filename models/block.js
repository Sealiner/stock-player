var DAO = require('../utils/dao'),
	helper = require('../utils/helper');

/**
 * 板块模型
 */
function Block (args) {
	// this.blockname = args.blockname; //板块名称
	// this.stocks = args.stocks; //板块包含的股票代码 {String} "sh000001,sh600000,sh600806,..."
	// this.username = args.username; //创建此板块的用户
}

Block.prototype = {
	queryBlockByUsername: function (username, fn) {
		var querySQL = "select * from t_block where username = ?";
			
		DAO.query(querySQL, [username], function (err, result) {
			fn(err, result);
		});	
	},
	editBlock: function () {
		
	},
	newBlock: function (args, fn) {
		var blockname = args.blockname,
			username = args.username;
		var querySQL = "insert into t_block(blockname, username) values(?, ?)";

		DAO.query(querySQL, [blockname, username], function (err, result) {
			fn(err, result);
		});
	}
}

module.exports = Block;