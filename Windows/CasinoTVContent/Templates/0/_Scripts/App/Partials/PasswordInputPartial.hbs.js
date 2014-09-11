(function($) {
    $.controls['PasswordInputPartial'] =
        '<div  class="input-row {{#if settings.inlineInput}}input-inline{{/if}}" style="padding-top:{{settings.paddingTop}}px;padding-bottom:{{settings.paddingBottom}}px"> \
        {{#if settings.labelAsPlaceholder}}{{else}}<label class="field_label">{{compile Name.template Name.data}} \
        {{#if IsRequired}}(<label class="requiredLabel">*</label>){{/if}}{{/if}}</label>\
        <div class="input-wrap" width="{{inputWidth MaxLength}}px"><input id={{ModelId}}-{{Id}} type="password" class="input text_field" data-index={{index}} {{#if settings.labelAsPlaceholder}}placeholder="{{compile Name.template Name.data}}"{{/if}} value="{{Value}}"\
        {{#if IsReadonly}} readonly="readonly"{{/if}}>\
        {{#if TooltipText}} {{partial "Tooltip" .}}{{/if}}\
        {{#if  Attributes.check_strength}}\
           <div id="pwdMeter-{{Id}}" class="neutral">\
                      <div class="pwdMeterWeak">Weak</div>\
                      <div class="pwdMeterMedium">Medium</div>\
                      <div class="pwdMeterStrong">Strong</div>\
                      <div class="pwdMeterPerfect">Perfect</div>\
            </div>\
        {{/if}}\
        {{#if Description}}<label class="description-label" style="">{{compile Description.template Description.data}}</label>{{/if}}</div>\
       </div>\
            <script>\
                    {{#if Attributes.check_strength}}\
                            $("#{{ModelId}}-{{Id}}").keyup(function(event) {\
                              $.validatePassword($("#"+event.target.id).val(),$("#pwdMeter-{{Id}}"));\
                            });\
                    {{/if}}\
            </script>';
})(jQuery);