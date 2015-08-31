define(function(require, exports, module){
	var $ = require('lib_cmd/jquery-cmd'),
        bootstrap = require('lib_cmd/bootstrap-cmd');

    var targetStock = null;

    $(function () {
    	initPage();
    });

    function bindEditBlock () {
        //编辑板块
        $('.block-edit').on('click', function () {
            var id = $(this).siblings('.block-name').data('id');
            $('#input_old_block').val(id);
            $('#blockEdit').modal({
                backdrop: false
            });
        });
    }

    function bindRemoveBlock () {
        //删除板块
        $('.block-remove').on('click', function () {
            var id = $(this).siblings('.block-name').data('id'),
                blockname = $(this).siblings('.block-name').text();
            $('#input_remove_block').val(id);
            $('#text_remove_block').text("您确定要删除【"+blockname+"】板块吗？");
            $('#blockRemove').modal({
                backdrop: false
            });
        });
    }

    function bindRemoveStock () {
        //删除股票
        $('.stock-remove').on('click', function () {
            targetStock = this;
            var symbol = $(this).prev().text();
            var id = $(this).parents('tr').find('.block-name').data('id');
            $('#input_stock_block_id').val(id);
            $('#input_remove_stock').val(symbol);
            $('#stockRemove').modal({
                backdrop: false
            });
        });
    }

    function initPage () {
        //新建板块
        $('.block-plus').on('click', function () {
            $('#blockNew').modal({
                backdrop: false
            });
        });
        //添加股票
        $('.stock-plus').on('click', function () {
            var id = $(this).parents('tr').find('.block-name').data('id');
            $('#input_stock_block').val(id);
            $('#stockPlus').modal({
                backdrop: false
            });
        });
        bindRemoveStock();
        bindRemoveBlock();
        bindEditBlock();
    	//新建板块提交
    	$('#btn_new_block').on('click', function () {
            var self = this;
            $(self).attr('disabled', true); //创建按钮失效避免重复提交
    		var blockname = $('#input_new_block').val();
    		$.ajax({
    			type: "POST",
    			async: true,
    			url: '/api/block/newBlock',
    			data: {
    				blockname: blockname
    			},
    			dataType: "json",
    			success: function (result) {
                    $(self).attr('disabled', false);
                    $('#blockNew').modal('hide');
                    if (result.code == 0) {
    				    var TPL = '<tr>\
                            <td>\
                                <span data-id='+result.data.insertId+'>'+blockname+'</span>\
                                <span class="block-edit glyphicon glyphicon-pencil" data-toggle="modal" data-target="#blockEdit"></span>\
                                <span class="block-remove glyphicon glyphicon-remove-sign"></span>\
                            </td>\
                            <td><p><span class="stock-plus glyphicon glyphicon-plus" data-toggle="modal" data-target="#stockPlus"></span></p></td>\
                        </tr>';
                        $('#last_tr').before(TPL);
                        bindRemoveBlock();
                        bindEditBlock();
                    } else {
                        alert(result.message);
                    }
    			},
    			error: function (e) {
    				console.log(e);
    			}
    		});
    	});
        //编辑板块提交
        $('#btn_edit_block').on('click', function () {
            var self = this;
            $(self).attr('disabled', true); //创建按钮失效避免重复提交
            var blockname = $('#input_edit_block').val();
            var id = $('#input_old_block').val();
            $.ajax({
                type: "POST",
                async: true,
                url: '/api/block/editBlock',
                data: {
                    blockname: blockname,
                    id: id
                },
                dataType: "json",
                success: function (result) {
                    $(self).attr('disabled', false);
                    $('#blockEdit').modal('hide');
                    if (result.code == 0) {
                        $('[data-id='+id+']').text(blockname);
                    } else {
                        alert(result.message);
                    }
                },
                error: function (e) {
                    console.log(e);
                }
            });
        });
        //删除板块提交
        $('#btn_remove_block').on('click', function () {
            var self = this;
            $(self).attr('disabled', true);
            var id = $('#input_remove_block').val();
            $.ajax({
                type: "POST",
                async: true,
                url: '/api/block/removeBlock',
                data: {
                    id: id
                },
                dataType: "json",
                success: function (result) {
                    $(self).attr('disabled', false);
                    $('#blockRemove').modal('hide');
                    if (result.code == 0) {
                        $('[data-id='+id+']').parents('tr').remove();
                    } else {
                        alert(result.message);
                    }
                },
                error: function (e) {
                    console.log(e);
                }
            });
        });
        //添加股票
        $('#btn_add_stock').on('click', function () {
            var self = this;
            $(self).attr('disabled', true);
            var id = $('#input_stock_block').val(),
                symbol = $('#market').val() + $('#input_add_stock').val();
            $.ajax({
                type: "POST",
                async: true,
                url: '/api/block/addStock',
                data: {
                    id: id,
                    symbol: symbol
                },
                dataType: "json",
                success: function (result) {
                    $(self).attr('disabled', false);
                    $('#stockPlus').modal('hide');
                    if (result.code == 0) {
                        var TPL = '<p class="stocks">\
                                <span>'+symbol+'</span>\
                                <span class="stock-remove glyphicon glyphicon-remove-sign"></span>\
                            </p>';
                        $('[data-id='+id+']').parents('tr').find('.stock-plus').parent().before(TPL);
                        bindRemoveStock();
                    } else {
                        alert(result.message);
                    }
                },
                error: function (e) {
                    console.log(e);
                }
            });
        });
        //删除股票
        $('#btn_remove_stock').on('click', function () {
            var self = this;
            $(self).attr('disabled', true);
            var id = $('#input_stock_block_id').val(),
                symbol = $('#input_remove_stock').val();
            $.ajax({
                type: "POST",
                async: true,
                url: '/api/block/removeStock',
                data: {
                    id: id,
                    symbol: symbol
                },
                dataType: "json",
                success: function (result) {
                    $(self).attr('disabled', false);
                    $('#stockRemove').modal('hide');
                    if (result.code == 0) {
                        $(targetStock).parent('p').remove();
                    } else {
                        alert(result.message);
                    }
                },
                error: function (e) {
                    console.log(e);
                }
            });
        });
    }
});