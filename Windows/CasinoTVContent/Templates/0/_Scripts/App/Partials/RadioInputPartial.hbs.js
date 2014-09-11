
(function ($) {
    $.controls['RadioInputPartial'] =
        '<div class="input-row {{#if settings.inlineInput}}input-inline{{/if}}" style="padding-top:{{settings.paddingTop}}px;padding-bottom:{{settings.paddingBottom}}px> \
        <label class="field_label">{{compile Name.template Name.data}}} \
        {{#if IsRequired}}(<label class="requiredLabel">*</label>){{/if}}</label>\
        <div class="input-wrap">\
        {{#each RadioOptions}} \
        <input id={{ModelId}}-{{Id}} type="radio" class="input radio_field" name="{{../Id}}" data-index={{index}} value="{{Text}}"\
        {{#if IsReadonly}}readonly="readonly"{{/if}}> \
        {{#if TooltipText}} {{partial "Tooltip" .}}{{/if}}\
        {{#ifEqual Id ../Value}}\
        checked="checked"\
        {{/ifEqual}}\
        />{{Text}} <br>\
        {{/each}} \
        {{#if Description}}<label class="description-label" style="">{{compile Description.template Description.data}}</label>{{/if}}</div>\
        </div>';
})(jQuery);
