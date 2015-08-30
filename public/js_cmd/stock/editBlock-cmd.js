define(function(require, exports, module){
	var $ = require('lib_cmd/jquery-cmd'),
        bootstrap = require('lib_cmd/bootstrap-cmd');

    $(function () {
    	initPage();
    });

    function initPage () {
        //新建板块
        $('.block-plus').on('click', function () {
            $('#blockNew').modal({
                backdrop: false
            });
        });
        //编辑板块
        $('.block-edit').on('click', function () {
            var id = $(this).prev('span').data('id');
            $('#input_old_block').val(id);
            $('#blockEdit').modal({
                backdrop: false
            });
        });
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
    }
});