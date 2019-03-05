$(document).ready(function() {
    var websocket_url = 'http://' + document.domain + ':' + location.port + '/deleteProjects';
    var socket = io.connect(websocket_url);

    //监听回复的消息
    socket.on('response',function(data){
        if (data.code == '200'){
            console.log(data.msg);
            $table.bootstrapTable('remove',{field: 'project_name', values: [data.msg]});
            // $('#log').append('<br>' + $('<div/>').text('Received #' + ': ' + data.msg).html());
            $('#log').append('<div class="alert alert-danger alert-custom alert-dismissible" role="alert">' +
                '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                '<i class="fa fa-check-circle m-right-xs"></i><strong>已经删除项目：</strong> {0}</div>'.format(data.msg))
        }
        else{
            alert('ERROR:' + data.msg);
        }
    });

    $(function () {
        $("#project_delete").click(function () {
            // alert('getSelections: ' + JSON.stringify($table.bootstrapTable('getSelections')));
            var projects_info = $table.bootstrapTable('getSelections');
            if (projects_info.length == 0){
                return false
            } else {
                // 发送需要删除的数据
                socket.emit("request_for_response", {"projects": JSON.stringify(projects_info)})
            }
        });
    });

    String.prototype.format = function(args) {
        var result = this;
        if (arguments.length > 0) {
            if (arguments.length == 1 && typeof (args) == "object") {
                for (var key in args) {
                    if(args[key]!=undefined){
                        var reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            }
            else {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
                        var reg= new RegExp("({)" + i + "(})", "g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
        }
        return result;
    }
});