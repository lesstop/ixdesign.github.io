function CheckLogin() {
if($.trim($("#txtUserName").val())==""){alert("请填写用户名");$("#txtUserName").select();return false;}
else if($.trim($("#txtPassword").val())==""){alert("请填写密码");$("#txtPassword").select();return false;}
else{return true;}
}