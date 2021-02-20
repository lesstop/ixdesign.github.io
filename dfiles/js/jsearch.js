window.onload = function() {
    $('#j_search span').on('click', function(){
        $('#j_search span').toggleClass('jopen');
    });
    $('#j_qrcode').on('click', function(){
        $('#j_qrcode img').toggleClass('jopenl');
    });
    function AddFavorite(sURL, sTitle) {
        var sTitle =" ";                       //sTitle：添加到收藏夹中的网站页面标题名称。
        var sURL = location.href;              //sURL：添加到收藏夹的完整网站页面地址
        try {
            window.external.addFavorite(sURL, sTitle);//IE浏览器
        }
        catch (e) {
            try {
                window.sidebar.addPanel(sTitle, sURL, "");//Firefox浏览器
            }
            catch (e) {
                alert("加入收藏失败，请使用Ctrl+D进行添加");
            }
        }
    }
}

