$(document).ready(function() {
    $("#addcollect").click(function() {
        var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd': 'CTRL';
        if (document.all) {
            window.external.addFavorite('http://net.bangong.cn:9863/', '新兴铸管股份有限公司')
        } else if (window.sidebar) {
            window.sidebar.addPanel('新兴铸管股份有限公司', 'http://net.bangong.cn:9863/', "")
        } else {
            alert('您可以尝试通过快捷键' + ctrl + ' + D 加入到收藏夹~')
        }
    })
});