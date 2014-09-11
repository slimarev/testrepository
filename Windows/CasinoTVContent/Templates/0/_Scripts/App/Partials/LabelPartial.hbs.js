(function ($) {
    $.controls['LabelPartial'] =
        '<div  class="input-row"> \
         <label class="field_label">{{compile Name.template Name.data}}</label> \
          <label id={{ModelId}}-{{Id}} class="field_label"  value={{Value}}>{{Value}}</label> \
          {{#if  Attributes.separator}}<hr class="separator"></hr>{{/if}}\
           </div>';
})(jQuery);
