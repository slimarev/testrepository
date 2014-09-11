(function ($) {
    $.controls['FiltersPartial'] =
        '<fieldset  class="filters-panel">\
          {{#each Filters}}\
          {{partial Type . @index ../Id ../settings}} \
          {{/each}}\
        </fieldset>';
})(jQuery);



