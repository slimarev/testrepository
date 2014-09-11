(function ($) {
    $.controls["TextAreaPartial"] =
        '<div  class="input-row {{#if settings.inlineInput}}input-inline{{/if}}" style="padding-top:{{settings.paddingTop}}px;padding-bottom:{{settings.paddingBottom}}px"> \
        <label class="field_label">{{compile Name.template Name.data}} \
        {{#if IsRequired}}(<label class="requiredLabel">*</label>){{/if}}</label>\
        <div class="input-wrap"><textarea  id={{ModelId}}-{{Id}} data-index={{index}} value="{{Value}}"\
        {{#if IsReadonly}}readonly="readonly"{{/if}}>{{Value}}</textarea>\
        {{#if TooltipText}} {{partial "Tooltip" .}}{{/if}}\
        {{#if Description}}<label class="description-label" style="">{{compile Description.template Description.data}}</label>{{/if}}</div>\
        </div>\
        <script>\
       if("{{Attributes.WYSIWYG}}"){;\
    var editor = new TINY.editor.edit("editor", {\
        id: "{{ModelId}}-{{Id}}",\
        cssclass: "tinyeditor",\
        controlclass: "tinyeditor-control",\
        rowclass: "tinyeditor-header",\
        dividerclass: "tinyeditor-divider",\
        controls: ["bold", "italic", "underline", "strikethrough", "|", "subscript", "superscript", "|",\
            "orderedlist", "unorderedlist", "|", "outdent", "indent", "|", "leftalign",\
            "centeralign", "rightalign", "blockjustify", "|", "unformat", "|", "undo", "redo", "n",\
            "font", "size", "style", "|", "image", "hr", "link", "unlink", "|", "print"],\
        footer: true,\
        fonts: ["Verdana","Arial","Georgia","Trebuchet MS"],\
        xhtml: true,\
        bodyid: "editor",\
        footerclass: "tinyeditor-footer",\
        toggle: {text: "source", activetext: "wysiwyg", cssclass: "toggle"},\
        resize: {cssclass: "resize"}\
    });\
    ;}\
        </script>';
})(jQuery);

