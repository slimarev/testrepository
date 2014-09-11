(function ($) {
    $.controls['CapchaPartial'] =
        '<div  class="input-row {{#if settings.inlineInput}}input-inline{{/if}}" style="padding-top:{{settings.paddingTop}}px;padding-bottom:{{settings.paddingBottom}}px"> \
        {{#if settings.labelAsPlaceholder}}{{else}}<label class="field_label">{{compile Name.template Name.data}} \
        {{#if IsRequired}}(<label class="requiredLabel">*</label>){{/if}}{{/if}}</label>\
        <div class="input-wrap" width="{{inputWidth MaxLength}}px"><img src={{Capcha}}/><input id={{ModelId}}-{{Id}} type="text" class="input text_field" data-index={{index}} {{#if settings.labelAsPlaceholder}}placeholder="{{compile Name.template Name.data}}"{{/if}} value="{{Value}}"\
        {{#if IsReadonly}} readonly="readonly"{{/if}}> \
        {{#if TooltipText}} {{partial "Tooltip" .}}{{/if}}\
        {{#if Description}}<label class="description-label" style="">{{compile Description.template Description.data}}</label>{{/if}}</div>\
        </div>';
})(jQuery);