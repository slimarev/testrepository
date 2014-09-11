(function ($) {
    $.controls['TooltipPartial'] =
            '<div class="help-wrap"><div id="help-{{ModelId}}-{{Id}}" class="help">{{compile TooltipText.template TooltipText.data}}</div></div>\
             <script>\
                  $("#{{ModelId}}-{{Id}}").focusin(function() {\
                    $("#help-{{ModelId}}-{{Id}}").fadeIn(600);\
                });\
                 $("#{{ModelId}}-{{Id}}").focusout(function() {\
                    $("#help-{{ModelId}}-{{Id}}").fadeOut(1500);\
                });\
            </script>';
})(jQuery);

