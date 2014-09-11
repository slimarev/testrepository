(function ($) {
    $.templates['ViewTemplate'] =
        '{{#if GlobalActions}}\
        {{partial \'Menu\' .}}\
        {{/if}}\
       <h1 class="form_title">{{Title}}</h1>\
       {{#each Models}}\
       <div class="form_container" id={{Id}}> \
          {{#each Fields}} \
          {{partial Type . @index}} \
          {{/each}}\
       {{/each}}\
       {{partial \'Actions\' .}}';
})(jQuery);


