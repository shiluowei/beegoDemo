
let uploadUrl = "/resource/upload/local";
$("#uploadResourceImage").fileinput({
    language: "zh",//配置语言
    showUpload : true, //显示整体上传的按钮
    showRemove : true,//显示整体删除的按钮
    uploadAsync: true,//默认异步上传
    uploadLabel: "上传",//设置整体上传按钮的汉字
    removeLabel: "移除",//设置整体删除按钮的汉字
    uploadClass: "btn btn-primary",//设置上传按钮样式
    showCaption: true,//是否显示标题
    dropZoneEnabled: true,//是否显示拖拽区域
    uploadUrl: uploadUrl,//这个是配置上传调取的后台地址
    maxFileSize : 10240,//文件大小限制 10M
    maxFileCount: 9,//允许最大上传数，可以多个，
    enctype:"multipart/form-data",
    allowedFileExtensions : ["jpg","jpeg", "png","gif","pdf"],/*上传文件格式限制*/
    msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
    showBrowse: true,
    browseOnZoneClick: true,
    // slugCallback : function(filename) {
    // return filename.replace('(', '_').replace(']', '_');
    // }
});
$('#uploadResourceImage').on('fileerror', function(event, data, msg) {
    console.log(data);
});
$("#uploadResourceImage").on("fileuploaded", function(event, data, previewId, index) {
    console.info("upload success!!!");
    let image_url = data.response.prefix;
    let domain = window.location.host;
    $("#image_url").val("http://"+domain+"/"+image_url); // 填充value值
    $("#image_url").attr("readonly","readonly"); // 设置为不可修改状态
});
