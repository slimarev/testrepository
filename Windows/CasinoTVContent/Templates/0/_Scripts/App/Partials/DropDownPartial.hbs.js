(function ($) {
    $.controls['DropDownPartial'] =
        '<div class="input-row {{#if settings.inlineInput}}input-inline{{/if}}" style="padding-top:{{settings.paddingTop}}px;padding-bottom:{{settings.paddingBottom}}px"> \
        <label class="field_label">{{compile Name.template Name.data}} \
        {{#if IsRequired}}(<label class="requiredLabel">*</label>){{/if}}</label>\
        <div class="input-wrap" style="width:100%;"><select id={{ModelId}}-{{Id}} data-index={{index}} class="input list_field" value="{{Value}}"\
        {{#if IsReadonly}} disabled{{/if}}> \
        {{#each ListOptions}}\
        <option id={{Id}} value="{{Id}}"\
        {{#ifEqual Id ../Value}}\
        selected\
        {{/ifEqual}}\
        >{{#if Text.template}}{{compile Text.template Text.data}}{{/if}}</option>\
        {{/each}}\
        </select>\
        {{#if TooltipText}} {{partial "Tooltip" .}}{{/if}}\
        {{#if Description}}<label class="description-label" style="">{{compile Description.template Description.data}}</label>{{/if}}\
        </div> \
        </div>';
})(jQuery);


