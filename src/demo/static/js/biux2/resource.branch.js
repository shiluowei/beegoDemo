//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
var repo_id = getUrlParam('id');

$("#branchTable").bootstrapTable({ // 对应table标签的id
    url: "/resource/show/branches", // 获取表格数据的url
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
            id: repo_id // 额外添加的参数
        }
    },
    sortName: 'id', // 要排序的字段
    sortOrder: 'desc', // 排序规则
    columns: [{
        checkbox: true, // 显示一个勾选框
        align: 'center' // 居中显示
    }, {
        field: 'name',
        title: '分支名称',
        align: 'center',
        valign: 'middle'
    },
    {
        field: 'repo_id',
        title: '项目名称',
        align: 'center',
        valign: 'middle'
    },
    {
    field: 'alias',
    title: '分支描述',
    align: 'center',
    valign: 'middle',

    }, {
        field: 'desc',
        title: '类型',
        align: 'center',
        valign: 'middle'
    },{
            field: 'lang',
            title: '开发语言',
            align: 'center',
            valign: 'middle'
        },{
            field: 'framework',
            title: '开发框架',
            align: 'center',
            valign: 'middle'
        },
        {
            field: 'run_server',
            title: '集成服务',
            align: 'center',
            valign: 'middle'
        },
        {
            field: 'extra_port',
            title: '外部端口',
            align: 'center',
            valign: 'middle'
        },
        {
            field: 'inner_port',
            title: '内部端口',
            align: 'center',
            valign: 'middle'
        },
        {
            field: 'state',
            title: '状态',
            align: 'center',
            valign: 'middle',
            formatter:function (value,row,index) {
                if (row.state === 0){
                    return "禁用"
                } else if (row.state === 1){
                    return "持续开发"
                } else if (row.state === 2){
                    return "交付部署"
                }
            }
        },
        {
            field: 'created_on',
            title: '创建时间',
            align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
                return fmtDate(row.created_on);
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
                    + '<span class="label label-danger" onclick="update(\'' + row.id + '\')">修改</span>'
                    + ' '
                    // + '<span class="label label-info" onclick="branch(\'' + row.id + '\')">分支</span>'
                    +'</div>';
            }
        },
    ],
    onLoadSuccess: function(data) { //加载成功时执行
        console.info(data.rows);
    },
    onLoadError: function() { //加载失败时执行
        console.info("加载数据失败");
    },

});
function update(id){
    let modal = $("#addBranchModal");
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

// 使用getSelections即可获得，row是json格式的数据
var $btable = $('#branchTable'),
    $bchoices = $('#mychoices');

$(function () {
    $bchoices.click(function () {
        alert('getSelections: ' + JSON.stringify($btable.bootstrapTable('getSelections')));
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


