var DAO = require('../utils/dao'),
	helper = require('../utils/helper');

/**
 * 板块模型
 */
function Block (args) {
	this.blockname = args.blockname; //板块名称
	this.stocks = args.stocks; //板块包含的股票代码 {String} "sh000001,sh600000,sh600806,..."
	this.username = args.username; //创建此板块的用户
}

Block.prototype = {
	queryBlock: function () {

	},
	editBlock: function () {
		
	}
}

module.exports = Block;