(function ($) {
    $.controls['MainFormGamePreview'] =
        '<li class="home_li_game">\
        <div class="home_preview_game">\
          <div class="home_thumbnails_small" style="background-image:url({{ImageUrl}})"></div>\
          <span class="home_title_game">{{Description}}</span>\
        </div>\
        <div class="home_details">\
          <div class="home_darkness_game">\
            <div class="home_thumbnails_big" style="background-image:url({{ImageUrl}})"></div>\
                  <div class="wx-ne-matrix-item-playbtn-container">\
                  <a href="javascript:showRegister();"><div class="home_img_login_play"></div></a>\
                  <a href="./game/{{GameId}}"><div id="{{GameId}}" class="wx-ne-matrix-item-playbtn home_img_play">Play</div></a>\
                  <a href="./game/{{GameId}}"><div id="{{GameId}}" class="wx-ne-matrix-item-playbtn home_img_playFF">Play for Fun</div></a>\
            </div>\
            </div>\
          <span class="home_title_game">{{Description}}</span>\
          <p style="font-size:9px;">\
          </p>\
        </div>\
      </li>';
})(jQuery);
