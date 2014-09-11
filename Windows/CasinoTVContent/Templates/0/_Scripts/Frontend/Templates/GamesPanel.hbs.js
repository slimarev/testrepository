(function ($) {
    $.templates['GamesPanel'] =
        '<div class="wx-ne-matrix-top-container">\
                <div class="wx-ne-matrix-side-column">\
                    <div class="wx-ne-matrix-top-categories-bar">\
                            <div class="wx-ne-matrix-top-categories-bar-title">Categories</div>\
                            <div class="wx-ne-matrix-top-group-categories-bar">\
                                {{#eachProp data}}\
                                    <div id={{key}} index={{index}} class="wx-ne-matrix-top-category-item gid1 {{#ifEqual index "0"}}selected{{/ifEqual}}">{{key}}</div>\
                                {{/eachProp}}\
                            </div>\
                     </div>\
                </div>\
            <div class="wx-ne-matrix-content-column">\
                <div class="wx-ne-matrix-content-column-title"></div>\
                <div class="wx-ne-matrix-game-detail-top-container" style="">\
                    <div class="wx-ne-matrix-game-detail"></div>\
                    <div class="wx-ne-matrix-game-detail-options"></div>\
                    <div class="wx-ne-matrix-game-detail-navigator"></div>\
               </div>\
            <div class="wx-ne-matrix-games-grid">\
                <div class="wx-ne-matrix-page-stripe">\
                    <div id="selected-category" class="wx-ne-matrix-page-container">\
                    {{#eachProp data}}\
                      {{partial "GameCategory" . index "" ../../data.settings}}\
                      {{/eachProp}}\
                </div>\
                </div>\
            </div>\
       </div>\
       <script>\
            $(".wx-ne-matrix-top-category-item").click(function(event){\
            $(".wx-ne-matrix-top-category-item").removeClass("selected");\
            $("#"+event.target.id).addClass("selected");\
            $(".game-category").hide();\
            $("#category-"+$("#"+event.target.id).attr("index")).show();\
            });\
       </script>';
})(jQuery);


