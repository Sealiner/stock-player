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
	editBlock: function (args, fn) {
		var blockname = args.blockname,
			id = args.id,
			username = args.username;
		var querySQL1 = "select username from t_block where id = ?";
		var querySQL2 = "update t_block set blockname = ? where id = ?";
		//首先检查该id是否属于请求人
		DAO.query(querySQL1, [id], function (err1, result1) {
			if (err1) {
				console.log(err1);
			} else {
				if (result1[0].username === username) {
					DAO.query(querySQL2, [blockname, id], function (err2, result2) {
						fn(err2, result2);
					});
				} else {
					var msg = {
						code: 10003,
						message: "not allowed"
					};
					fn (null, msg);
				}
			}
		});
	},
	newBlock: function (args, fn) {
		var blockname = args.blockname,
			username = args.username;
		var querySQL = "insert into t_block(blockname, username) values(?, ?)";

		DAO.query(querySQL, [blockname, username], function (err, result) {
			fn(err, result);
		});
	},
	removeBlock: function (args, fn) {
		var id = args.id,
			username = args.username;
		var querySQL1 = "select username from t_block where id = ?";
		var querySQL2 = "delete from t_block where id = ?";
		//首先检查该id是否属于请求人
		DAO.query(querySQL1, [id], function (err1, result1) {
			if (err1) {
				console.log(err1);
			} else {
				if (result1[0].username === username) {
					DAO.query(querySQL2, [id], function (err2, result2) {
						fn(err2, result2);
					});
				} else {
					var msg = {
						code: 10003,
						message: "not allowed"
					};
					fn (null, msg);
				}
			}
		});
	}
}

module.exports = Block;