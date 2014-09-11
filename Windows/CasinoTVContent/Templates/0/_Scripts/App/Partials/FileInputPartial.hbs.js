(function ($) {
    $.controls['FileInputPartial'] =
        '<div class="input-row" style="padding-top:{{settings.paddingTop}}px;padding-bottom:{{settings.paddingBottom}}px"> \
         <label class="field_label">{{compile Name.template Name.data}}\
         {{#if IsRequired}}(<label class="requiredLabel">*</label>){{/if}}</label>\
         <div class="input-wrap"><input id={{ModelId}}-{Id} type="file" class="input file_field" data-index={{index}} multiple="" \
         {{#if IsReadonly}}readonly="readonly"{{/if}}>\
        {{#if TooltipText}} {{partial "Tooltip" .}}{{/if}}\
        {{#if Description}}<label class="description-label" style="">{{compile Description.template Description.data}}</label></div>{{/if}}\
        </div> \
         </div>';
})(jQuery);