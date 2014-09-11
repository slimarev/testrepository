(function ($) {
    $.controls['ActionsPartial'] =
        '<fieldset  class="actions-panel">\
         {{#each Actions}}\
         <input id={{Id}} class="action confirm" type="submit" value="{{Name}}">\
         {{/each}}\
        </fieldset>';
})(jQuery);



