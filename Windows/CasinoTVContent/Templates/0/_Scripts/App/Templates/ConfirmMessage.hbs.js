(function ($) {
    $.templates['ConfirmMessage'] =
   ' <div class="modal checked">\
  <label class="modal__bg" for="modal-1"></label>\
  <div class="modal__inner" style="height:190px">\
    <label class="modal__close" for="modal-1"></label>\
    <h2>{{title}}</h2>\
    <p>{{message}}</p>\
    <div class="actions-panel" style="position:absolute;bottom:0;right: 0;">\
    <input id="confirm" class="action confirm" type="submit"value="Confirm"/>\
    <input id="cancel" class="action confirm" type="submit" value="Cancel"/>\
    </div>\
  </div>\
</div>';
})(jQuery);


