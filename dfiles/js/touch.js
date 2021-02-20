$(function () {
    $('.chbnav_touch_top_list').click(function () {
        $('.chbnav_touch_nav_box').addClass('chbnav_select');
        $('body').css('position','fixed');
    });
    $('.chbnav_touch_navli1 img').click(function () {
        $('.chbnav_touch_nav_box').removeClass('chbnav_select');
        $('body').css('position','relative');
    });

    $(".chbnav_touch_navli").click(function () {

        $(".chbnav_touch_erji").slideUp();

        if($(".chbnav_touch_erji",this).css("display")=="block"){

        }else{
            $(".chbnav_touch_erji",this).slideDown();
        }
    });
})
