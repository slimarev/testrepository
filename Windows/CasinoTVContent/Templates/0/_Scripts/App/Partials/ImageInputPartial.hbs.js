(function ($) {
    $.controls['ImageInputPartial'] =
        '<div class="input-row {{#if settings.inlineInput}}input-inline{{/if}}" style="padding-top:{{settings.paddingTop}}px;padding-bottom:{{settings.paddingBottom}}px"> \
         <label class="field_label">{{compile Name.template Name.data}} \
        {{#if IsRequired}}(<label class="requiredLabel">*</label>){{/if}}</label>\
         <div class="image-wrap"><img class="image-preview" id="image-{{ModelId}}-{{Id}}" \
        {{#if Value}}\
        src={{Value}} imgUrl={{Value}}><div id="image-status-{{ModelId}}-{{Id}}" class="image-status image-uploaded">\
        {{else}}\
        src="../_Content/Images/image-stub.jpg" imgUrl="" ><div id="image-status-{{ModelId}}-{{Id}}" class="image-status select-image">\
        {{/if}}\
        </div><div  value="{{ModelId}}-{{Id}}" fieldId={{Id}} class="image_delete"\
        {{#if Value}}\
        {{else}}\
        style="display:none;"\
        {{/if}}\
         ></div>\
        <div id="upload-progress-{{ModelId}}-{{Id}}" class="upload-progress"><span id="progress-{{ModelId}}-{{Id}}" class="progress"></span></div></img>\
        <div class="input-wrap"><input  id="{{ModelId}}-{{Id}}" type="file" class="input image_field" multiple=""  data-index={{index}} style="display:none;" accept="image/*,image/jpeg" \
        {{#if IsReadonly}}readonly="readonly"{{/if}}>{{#if TooltipText}} {{partial "Tooltip" .}}{{/if}}\
        </div>\
        {{#if Description}}<label class="description-label" style="">{{compile Description.template Description.data}}</label>{{/if}}\
        </div> \
         </div>\
        <script>\
        $("#image-{{ModelId}}-{{Id}}").click(function() {\
            $("#{{ModelId}}-{{Id}}").click();\
        });\
        $(".image_delete").on("click", function (event) {\
            $("#image-" + event.target.id).attr("imgUrl", "");\
            $("#image-" + $(event.target).attr("value")).attr("src", "../_Content/Images/image-stub.jpg");\
            $("#image-status-" + $(event.target).attr("value")).removeClass("image-uploaded");\
            $("#image-status-" + $(event.target).attr("value")).addClass("select-image");\
            $("#upload-progress-" + $(event.target).attr("value")).hide();\
            $(".image_delete[value=" + $(event.target).attr("value") + "]").hide();\
        });\
        </script>';
})(jQuery);
