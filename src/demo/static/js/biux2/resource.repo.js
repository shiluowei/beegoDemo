$("#repoTable").bootstrapTable({ // 对应table标签的id
    url: "/repos", // 获取表格数据的url
    cache: false, // 设置为 false 禁用 AJAX 数据缓存， 默认为true
    toolbar : "#toolbar",
    striped: true, //表格显示条纹，默认为false
    pagination: true, // 在表格底部显示分页组件，默认false
    pageList: [10, 20], // 设置页面可以显示的数据条数
    pageSize: 10, // 页面数据条数
    pageNumber: 1, // 首页页码
    clickToSelect: true,
    sidePagination: 'server', // 设置为服务器端分页
    queryParams: function(params) { // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
        return {
            pageSize: params.limit, // 每页要显示的数据条数
            offset: params.offset, // 每页显示数据的开始行号
            sort: params.sort, // 要排序的字段
            sortOrder: params.order, // 排序规则
            // dataId: $("#dataId").val() // 额外添加的参数
        }
    },
    sortName: 'Id', // 要排序的字段
    sortOrder: 'Desc', // 排序规则
    columns: [{
            checkbox: true, // 显示一个勾选框
            align: 'center' // 居中显示
        }, {
            field: 'Name',
            title: '项目名称',
            align: 'center',
            valign: 'middle'
        },
        {
            field: 'NickName',
            title: '项目别名',
            align: 'center',
            valign: 'middle',

        },
        {
            field: 'ImageUrl',
            title: 'image',
            align: 'center',
            valign: 'middle'
        },
        {
            field: 'State',
            title: '状态',
            align: 'center',
            valign: 'middle',
            formatter:function (value,row,index) {
                if (row.State === 0){
                    return "禁用"
                } else if (row.State === 1){
                    return "持续开发"
                } else if (row.State === 2){
                    return "交付部署"
                }
            }
        },
        {
            field: 'CreatedOn',
            title: '创建时间',
            align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
                return fmtDate(row.CreatedOn);
            }
        },
        {
            title: "操作",
            align: 'center',
            valign: 'middle',
            width: 100, // 定义列的宽度，单位为像素px
            formatter: function(value, row, index) {
                return '<div class="smart-widget-body">'
                    // +'<span class="label label-danger" onclick="del(\'' + row.id + '\')">删除</span>'
                    + '<span class="label label-danger" onclick="update_repo(\'' + row.id + '\')">修改</span>'
                    + ' '
                    + '<span class="label label-info" onclick="branch(\'' + row.id + '\')">分支</span>'
                    +'</div>';
            }
        },
    ],
    onLoadSuccess: function(data) { //加载成功时执行
        console.info("加载成功");
    },
    onLoadError: function() { //加载失败时执行
        console.info("加载数据失败");
    },

});
function update_repo(id){
    let modal = $("#addRepoModal");
    modal.on("shown.bs.modal", function(e) {
        // 这里的btn就是触发元素，即你点击的删除按钮
        // var btn = $(e.relatedTarget),
        //     id = btn.data("id");
        // do your work
        $.get("/resource/show/repo?id="+id,function(data,status){
            let repo = data.list.repo[0];
            $("#repo_id").val(repo.id);
            $("#name").val(repo.name);
            $("#nick_name").val(repo.nick_name);
            $("#state").val(repo.state);
            $("#created_by").val(repo.created_by);
            $("#image_url").val(repo.image_url);
        });

    });
    modal.modal({
        keyboard:true,
    })

}

function branch(id){
    let location = '/branch?id={0}';
    window.location.href=String.format(location,id);
}

//使用getSelections即可获得，row是json格式的数据
let $table = $('#repoTable'),
    $choices = $('#mychoices');

$(function () {
    $choices.click(function () {
        alert('getSelections: ' + JSON.stringify($table.bootstrapTable('getSelections')));
    });
});

function fmtDate(unixtimestamp){
    var unixtimestamp = new Date(parseInt(unixtimestamp)*1000);
    var year = 1900 + unixtimestamp.getYear();
    var month = "0" + (unixtimestamp.getMonth() + 1);
    var date = "0" + unixtimestamp.getDate();
    var hour = "0" + unixtimestamp.getHours();
    var minute = "0" + unixtimestamp.getMinutes();
    var second = "0" + unixtimestamp.getSeconds();
    return year + "-" + month.substring(month.length-2, month.length)  + "-" + date.substring(date.length-2, date.length)
        + " " + hour.substring(hour.length-2, hour.length) + ":"
        + minute.substring(minute.length-2, minute.length) + ":"
        + second.substring(second.length-2, second.length);
}

String.format = function() {
    if (arguments.length === 0)
        return null;
    var str = arguments[0];
    for ( var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};


