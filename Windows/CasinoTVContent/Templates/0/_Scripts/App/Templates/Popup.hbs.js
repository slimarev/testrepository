(function ($) {
    $.templates['Popup'] =
        ' <div id="{{data.Id}}" class="modal checked">\
  <label class="modal__bg" for="modal-1"></label>\
  <div class="popup-inner   {{#if settings.autoWidht}}custom-popup{{else}}standart-popup{{/if}}">\
    <div class="draggable-popup">\
       {{#if settings.showCloseBtn}}\
        <label id="close-{{Id}}" class="modal__close" for="modal-1"></label>\
    {{/if}}</div>\
        <div id="pop-up-{{data.Id}}" class="popup-body"></div>\
  </div>\
</div>\
       <script>\
            $("#close-{{Id}}").click(function(){\
         doAction("_stack_pop","Model")});\
       </script>';
})(jQuery);


