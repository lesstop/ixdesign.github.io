/**
 * 1、获取当前屏幕分辨率
 * 2、获取界面停留时间
 *
 * */
var id;
var mydate = new Date();
var Ndate = new Date();
//var thisyx = "http://"+document.domain;
var thisyx = window.location.protocol+"//"+window.location.host;;
$(function () {
    //获取当前屏幕分辨率
    var fen = window.screen.width + '×' + window.screen.height;
    var url = window.location.href;
    var beforUrl = document.referrer;
    $.ajaxSettings.async = false;
    if(!beforUrl) beforUrl="直接访问";
    statisticsLog({host: document.domain,url: url,DataId: $("#hidDataId").val(),
        RootMenuId:$("#hidRootMenuId").val(),ClassId: $("#hidClassId").val(),ParentId:$("#hidParentId").val(),resolving_power:fen,to_come:beforUrl
    });

    // 获取当前毫秒数
    var myDate = new Date();
    var a = myDate.getTime();

    // 跳转或关闭时传输用户操作界面信息
    window.onbeforeunload = function (e) {
        var e = window.event || e;
        Ndate = new Date();
       ResidenceTime();
    };
});

// 用户信息接口
function statisticsLog(params) {
    $.post(thisyx+'/front/iplog_statisticsLog.do', params, function (data) {
        data = eval('('+data+')');
        id = data.id;
    });
}

// 关闭页面或者跳转时 传 时间（毫秒）
function ResidenceTime() {
    var params = {};
    params.id = id;
    params.rTime = timeMiao(mydate,Ndate);
    $.post(thisyx+'/front/iplog_putResidenceTime.do', params, function (data) {});
}

/**
 * 毫秒转化秒
 * time 打开界面获取的时间
 * newTime 关闭或者跳转所获取的时间
 * */

function timeMiao(time, newTime) {
    return parseInt((newTime - time));
}