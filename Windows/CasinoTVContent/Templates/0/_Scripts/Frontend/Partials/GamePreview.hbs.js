(function ($) {
    $.controls['GamePreview'] =
        '<div class="wx-ne-matrix-item-container">' +
            '<div class="wx-ne-matrix-item-preview">' +
            '<div class="wx-ne-matrix-item-image" style="background-image: url({{ImageUrl}});">' +
            '</div>' +
            '<div class="wx-ne-matrix-item-game-name">{{Description}}</div>' +
            '</div>' +
            '<div class="wx-ne-matrix-item-detail">' +
            '<div class="wx-ne-matrix-item-detail-dark">' +
            '<div class="wx-ne-matrix-item-image" style="background-image: url({{ImageUrl}});"></div>' +
            '</div>' +
            '<div class="wx-ne-matrix-item-playbtn-container">' +
            '<a href="./game/{{GameId}}"><div id="{{GameId}}" class="wx-ne-matrix-item-playbtn home_img_play">Play</div></a>' +
            '<a href="./game/{{GameId}}"><div id="{{GameId}}" class="wx-ne-matrix-item-playbtn home_img_playFF">Play for Fun</div></a>' +
            '</div>' +
            '<div class="wx-ne-matrix-item-game-name">{{Description}}</div>' +
            '<div class="wx-ne-matrix-item-description">{{Description}}</div>' +
            '</div>' +
            '</div>';
})(jQuery);

