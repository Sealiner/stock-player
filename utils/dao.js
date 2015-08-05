var pool = require("./mysql-pool");

var DAO = {};

/**
 * 查询函数，连接失败时会自动重连, 重连次数由retry设置
 * @param sql {String} 查询sql
 * @param args {Array} 查询条件参数 (此参数非必填)
 * @param callback {Function} 查询完毕后的回调函数
 */
DAO.query = function (sql, args, callback) {
	var retry = 5, //重连次数
		handleQueryType = 1; //执行handleQuery的方式，由参数个数决定

	if(arguments.length === 2) {
		sql = arguments[0];
		callback = arguments[1];
		handleQueryType = 2;
	} else if(arguments.length === 3) {
		handleQueryType = 1;
	} else {
		console.log("wrong parameters for DAO.query()");
		return;
	}

	handleQuery();

	function handleQuery () {
		if (retry > 0) {
			retry--;
			pool.getConnection(function (err, conn) {
				if (err) {
					console.log("DAO::getConnection error: "+err);
					console.log("retry...");
					handleQuery(); //重连
				} else {
					if (handleQueryType === 1) {
						conn.query(sql, args, function (err2, result) {
							conn.release();
							callback(err2, result);
						});
					} else if(handleQueryType === 2) {
						conn.query(sql, function (err2, result) {
							conn.release();
							callback(err2, result);
						});
					}
				}
			});
		} else {
			console.log("DAO::getConnection failed");
			var err = {};
			err.message = "get connection failed";
			callback(err, null);
		}
	}
}

module.exports = DAO;