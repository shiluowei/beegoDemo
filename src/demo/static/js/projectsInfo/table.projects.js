
$("#projects_table").bootstrapTable({ // 对应table标签的id
    url: "/projects/show/", // 获取表格数据的url
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
    sortName: 'id', // 要排序的字段
    sortOrder: 'desc', // 排序规则
    columns: [{
            checkbox: true, // 显示一个勾选框
            align: 'center' // 居中显示
        }, {
            field: 'project_name',
            title: '项目名称',
            align: 'center',
            valign: 'middle'
        },{
            field: 'project_status',
            title: '项目阶段',
            align: 'center',
            valign: 'middle',
            formatter: function (value,row, index) {
                var id = row.project_id
                return '<a class="" data-toggle="modal"  data-target="#ModifyProjectModal" style="color:red;" onclick="change_value(\'' + id + '\')">'+value+'</a>';
            }
        }, {
            field: 'project_client',
            title: '客户信息',
            align: 'center',
            valign: 'middle'
        },{
            field: 'project_members',
            title: '项目成员',
            align: 'center',
            valign: 'middle'
        },{
            field: 'project_info',
            title: '备注',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'project_create',
            title: '创建时间',
            align: 'center',
            valign: 'middle',
            formatter: function (value, row, index) {
                return moment(value).utcOffset(16*60).format('YYYY-MM-DD HH:mm:ss ')
            }
        },{
            field: '',
            title: '修改',
            align: 'center',
            valign: 'middle',
            formatter: function (value,row, index) {
                var id = row.project_id;
                return '<a class="" data-toggle="modal"  data-target="#ModifyProjectModal" style="color:red;" onclick="change_value(\'' + id + '\')">变更信息</a>';
            }
        }
        // {
        //     field: 'calcMode',
        //     title: '计算方式',
        //     align: 'center',
        //     valign: 'middle',
        //     formatter: function (value, row, index){ // 单元格格式化函数
        //         var text = '-';
        //         if (value == 1) {
        //             text = "方式一";
        //         } else if (value == 2) {
        //             text = "方式二";
        //         } else if (value == 3) {
        //             text = "方式三";
        //         } else if (value == 4) {
        //             text = "方式四";
        //         }
        //         return text;
        //     }
        // },
        // {
        //     title: "操作",
        //     align: 'center',
        //     valign: 'middle',
        //     width: 160, // 定义列的宽度，单位为像素px
        //     formatter: function(value, row, index) {
        //         return '<button class="btn btn-primary btn-sm" onclick="del(\'' + row.student_id + '\')">删除</button>';
        //     }
        // }
    ],
    onLoadSuccess: function() { //加载成功时执行
        console.info("加载成功");
    },
    onLoadError: function() { //加载失败时执行
        console.info("加载数据失败");
    },

});

function change_value(value){
    console.log(value);
    // $("#m_project_name").attr("value", value)
    $.ajax({
        type:"POST",
        url:"/projects/get/project/",
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        data: JSON.stringify({
            "project_id": value,
        }),
        success: function (data) {
            // console.log(data)
            $("#m_project_id").attr("value", data.project_id);
            $("#m_project_name").attr("value", data.project_name);
            $("#m_project_status").attr("value", data.project_status);
            $("#m_project_client").attr("value", data.project_client);
            $("#m_project_members").attr("value", data.project_members);
            $("#m_project_info").val(data.project_info);
        }
    })
}


//使用getSelections即可获得，row是json格式的数据
var $table = $('#projects_table'),
    $choices = $('#project_choices');


$(function () {
    $choices.click(function () {
        alert('getSelections: ' + JSON.stringify($table.bootstrapTable('getSelections')));
    });
});

// $(function () {
//     $("#project_delete").click(function () {
//         // alert('getSelections: ' + JSON.stringify($table.bootstrapTable('getSelections')));
//         var projects_info = $table.bootstrapTable('getSelections');
//         if (projects_info.length == 0){
//             return false
//         } else {
//         //    开始删除选定的项目
//             $.ajax({
//                 type: "POST",
//                 url: "/projects/delete/projects/",
//                 contentType: "application/json; charset=utf-8",
//                 dataType: "json",
//                 data: JSON.stringify({
//                     "delete_projects": JSON.stringify(projects_info),
//                 }),
//                 success: function (data) {
//                     console.log(data);
//                 }
//             })
//         }
//     });
// });




