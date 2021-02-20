/**
 * [pageExhibition5 控制只显示最多5条页码数]
 * @param  {[Number]} pageIndex    [当前页码]
 * @param  {[Number]} pageCount    [总页码]
 * @param  {[String]} onIndexStr   [是当前页码时的字符串（需要展示页码的位置写成"onIndex"）跳转路径固定字符串"##"]
 * @param  {[String]} noIndexStr   [非当前页码时的字符串（需要展示页码的位置写成"noIndex"）跳转路径固定字符串"##"]
 * @param  {[String]} urlStr       [当前列表首页url字符串]
 * @return {[String]} str          [动态拼接好的字符串，用来直接拼接到引用的分页串中]
 */
function pageExhibition5(pageIndex,pageCount,onIndexStr,noIndexStr,urlStr){
    var leaveOut = '<i class="dian uk-disabled"><span>...</span></i>';
	var str = "";
    var pageBeginNo = 1;
    var pageEndNo = pageCount;
    //总页数小于5，页码数全部展示
    if(pageCount<=5){
        pageBeginNo = 1;
    //总页数大于5，且总页数-当前页数>2  如：...34567...
    }else if((pageCount-pageIndex)>2) {
    	//当前页数>2
        if(pageIndex>2){
            //显示的起始页数为当前页数-2
            pageBeginNo = pageIndex-2;
            //显示的起始页数为当前页数+2
            pageEndNo = pageIndex+2;
        }else{
        //当前页数小于2，则显示12345
            pageEndNo = 5;
        }
    }else{
    //总页数大于5，且总页数-当前页数<=2
        pageBeginNo = pageCount-4;
    }
    //判断是否当前页
    for(var i=pageBeginNo;i<=pageEndNo;i++){
		if(i == pageIndex)
			//是当前页
			str += onIndexStr.replace(/onIndex/g,i).replace(/##/g,urlUtil(urlStr,i)).replace(/&&/g,i);
		else
			//非当前页
			str += noIndexStr.replace(/noIndex/g,i).replace(/##/g,urlUtil(urlStr,i)).replace(/&&/g,i);
    }
    if(pageBeginNo != 1)
        str = leaveOut+str; 
    if(pageEndNo != pageCount)
        str += leaveOut;
    return str;
}

function urlUtil(urlStr,i){
    if(i == 1) return urlStr;
    else return urlStr.substring(0,urlStr.lastIndexOf(".html"))+'_'+i+".html";
}

//判断字符是否为空
function isEmpty(obj){
    return (typeof obj === 'undefined' || obj === null || obj === "");
}

/*手机号验证，支持移动，电信，联通*/
function istel(tel) {
    var rtn = false;
    //移动号段
    var regtel = /^((13[4-9])|(15([0-2]|[7-9]))|(18[2|3|4|7|8])|(178)|(147))[\d]{8}$/;
    if (regtel.test(tel)) {
        rtn = true;
    }
    //电信号段
    regtel = /^((133)|(153)|(18[0|1|9])|(177))[\d]{8}$/;
    if (regtel.test(tel)) {
        rtn = true;
    }
    //联通号段
    regtel = /^((13[0-2])|(145)|(15[5-6])|(176)|(18[5-6]))[\d]{8}$/;
    if (regtel.test(tel)) {
        rtn = true;
    }
    return rtn;
}

/*邮箱验证*/
function checkEmail(str){
    var falg = true;
    var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (!re.test(str)) {
        falg = false;
    }
    return falg;
}

//身份证规则校验
function checkID(val) {
    if(checkCode(val)) {
        var date = val.substring(6,14);
        if(checkDate(date)) {
            if(checkProv(val.substring(0,2))) {
                return true;
            }
        }
    }
    return false;
}

//省级地址码校验
function checkProv(val) {
    var pattern = /^[1-9][0-9]/;
    var provs = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门"};
    if(pattern.test(val)) {
        if(provs[val]) {
            return true;
        }
    }
    return false;
}
//出生日期码校验
function checkDate(val) {
    var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
    if(pattern.test(val)) {
        var year = val.substring(0, 4);
        var month = val.substring(4, 6);
        var date = val.substring(6, 8);
        var date2 = new Date(year+"-"+month+"-"+date);
        if(date2 && date2.getMonth() == (parseInt(month) - 1)) {
            return true;
        }
    }
    return false;
}
//校验码校验
function checkCode(val) {
    var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
    var code = val.substring(17);
    if(p.test(val)) {
        var sum = 0;
        for(var i=0;i<17;i++) {
            sum += val[i]*factor[i];
        }
        if(parity[sum % 11] == code.toUpperCase()) {
            return true;
        }
    }
    return false;
}

