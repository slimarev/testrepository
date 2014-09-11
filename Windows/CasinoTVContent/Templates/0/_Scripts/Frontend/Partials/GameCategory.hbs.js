(function ($) {
    $.controls['GameCategory'] =
        '<div id="category-{{index}}" class="game-category"\
            {{#ifNotEqual index "0"}}style="display:none;"{{/ifNotEqual}}>\
             {{#eachProp value}}\
              {{#if ../settings.itemCount}}\
                {{#ifLess ../index ../../settings.itemCount}}{{> MainFormGamePreview value}}{{/ifLess}}\
                {{else}}{{> GamePreview value}}{{/if}}\
             {{/eachProp}}\
          </div>';
})(jQuery);

