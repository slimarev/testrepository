(function ($) {
    $.templates['UserPanel'] =
        '<div class="header_utente_container"><div class="bsUser">\
        <div class="header_utente">\
            <div class="floatMenu usernameMenu">\
                <div id="user_menu" class="username" title="User options">\
                </div>\
                <div class="head_dialogMenu">\
                     <div id="EditProfile" class="bsMyData"><a onClick=doAction("EditProfile","Global");>Profile</a></div>\
                     <div id="ChangePassword" class="bsPassword"><a  onClick=doAction("ChangePassword","Global");>Password</a></div>\
                </div>\
            </div>\
    <div class="space"></div>\
  <div class="floatMenu accountMenu">\
    <div id="account" class="account" title="Transactions">\
        \
     </div>\
    <div class="head_dialogMenu head_accountMenu">\
        <div id="transaction_report_page" class="request bsuTransaction"><a  onClick=showPopup("transaction_report_page");>Transactions history</a></div>\
      <div class="titleMenuItem bsuMenuPrelievi">Withdrawals</div>\
      <div id="withdraw_report_page" class="request bsuListaRichieste"><a  onClick=showPopup("withdraw_report_page");>Requests list</a></div>\
      <div id="withdraw_page" class="request bsuPrelievoConCarta"><a  onClick=showPopup("withdraw_page");>Request a Withdrawal</a></div>\
      <div class="titleMenuItem">Deposit</div>\
      <div id="deposit_report_page" class="request bsuElencoVersamenti"><a  onClick=showPopup("deposit_report_page");>Deposits List</a></div>\
      <div id="deposit_page" class="request bsuAddCredit"><a  onClick=showPopup("deposit_page");>Deposits</a></div>\
	<div class="titleMenuItem">Games History</div>\
	<div id="transaction_page" class="request bsuTransaction"><a  onClick=showPopup("transaction_page");>Transactions</a></div>\
    </div>\
  </div>\
  <div class="space"></div>\
  <div class="floatMenu mailMenu" style="display: none;">\
    <div id="mail" class="mail" title="Post office">\
      <div class="pallino" style="display: block;">2</div>\
    </div>\
    <div class="head_dialogMenu" style="display: none;">\
      <div class="bsNewMessage"><a  onClick=showPopup("newMessage");>New message</a></div>\
      <div class="bsInBox"><a  onClick=showPopup("messagesReceived");>Messages received</a></div>\
      <div class="bsOutBox"><a  onClick=showPopup("messagesSent");>Messages sent</a></div>\
    </div>\
  </div>\
</div>\
</div></div>   \
     <div class="isLogged"><span class="Futura upp">{{Title}}.Your balance:<label id="gambler_balance">0</label></span><div id="Logout" class="global-action logout">Logout</div><div class="wx-wp-language"><div class="bsUserLanguagesDialog">\
  </div>\
</div></div></div>\
    <script>\
    $(".logout").click(function(){\
         doAction("Logout","Global")});\
    $(".floatMenu").click(function (event) {\
        var menuItem=$("#"+event.target.id).parent().find( ".head_dialogMenu");\
    if(menuItem.is(":visible")) $(".head_dialogMenu").hide(); else {$(".head_dialogMenu").hide();menuItem.show();}\
    }); \
    $(".head_dialogMenu").mouseleave(function() {\
        $(".head_dialogMenu").hide();\
    });\
    </script>';
})(jQuery);


