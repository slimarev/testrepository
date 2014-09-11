(function ($) {
    $.controls['NumberInputPartial'] =
        '<div class="input-row {{#if settings.inlineInput}}input-inline{{/if}}" style="padding-top:{{settings.paddingTop}}px;padding-bottom:{{settings.paddingBottom}}px"> \
         <label class="field_label">{{compile Name.template Name.data}} \
         {{#if IsRequired}}(<label class="requiredLabel">*</label>){{/if}}</label>\
         <div class="input-wrap"><input id={{ModelId}}-{{Id}} type="number" class="input number_field" data-index={{index}} value="{{Value}}"\
        {{#if IsReadonly}}readonly="readonly"{{/if}}> \
        {{#if TooltipText}} {{partial "Tooltip" .}}{{/if}}\
       {{#if Description}}<label class="description-label" style="">{{compile Description.template Description.data}}</label>{{/if}}</div>\
       </div>';
})(jQuery);