(function ($) {
    $.controls['ImagePartial'] =
        '<div  class="input-row {{#if settings.inlineInput}}input-inline{{/if}}" style="padding-top:{{settings.paddingTop}}px;padding-bottom:{{settings.paddingBottom}}px"> \
         <label class="field_label">{{compile Name.template Name.data}}</label> \
         <img src={{Value}} alt={{Name}} /> \
         </div>';
})(jQuery);

