(function ($) {
    $.templates['FormTemplate'] =
       '{{#if settings.showMenu}}{{#if data.GlobalActions}}\
        {{partial \'Menu\' data}}\
        {{/if}}{{/if}}\
        <div class="form-wrap" style=\
        {{#if settings.layout.centered}}\
          display:table\
        {{/if}}><div class="form"\
             {{#if settings.layout.centered}}\
                style="display:table-cell";\
                {{else}}\
                    {{#ifEqual settings.layout.float "left"}}\
                            style="float:left"\
                    {{else}}\
                        {{#ifEqual settings.layout.float "right"}}\
                            style="float:right"\
                        {{/ifEqual}}\
                    {{/ifEqual}}\
              {{/if}}>\
       {{#if settings.showTitle}}<h1 class="form_title">{{data.Title}}{{/if}}</h1>\
       {{#each data.Models}}\
       <div class="form_container" id="{{Id}}" style=display:{{#ifEqual ../settings.layout.type  "vertical"}}{{#if ../../settings.layout.centered}}table{{else}}block{{/if}}{{else}}flex;{{/ifEqual}}> \
          {{#each Fields}} \
          {{partial Type .  @index ../Id ../../settings.fieldsSettings}} \
          {{/each}}\
       {{/each}}\
       {{partial \'Actions\' data}}</div></div></div>';
})(jQuery);


