(function ($) {
    $.templates['MessageBox'] =
   ' <div class="modal checked">\
  <label class="modal__bg" for="modal-1"></label>\
  <div class="modal__inner">\
    <h2>{{title}}</h2>\
    <p class="message-text">{{message}}</p>\
     <div  class="message-confirm"><input id="confirm-attention" class="action confirm" type="submit" value="Ok"></div>\
    </div>\
</div>';
})(jQuery);


