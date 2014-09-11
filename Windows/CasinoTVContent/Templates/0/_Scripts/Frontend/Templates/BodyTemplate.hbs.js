(function ($) {
    $.templates['BodyTemplate'] =
       '<div id="backgrounVideo" class="  height: 100%;\
            width: 100%;\
            position: fixed;\
            margin: 0;\
            padding: 0;">\
            <video autoplay=" autoplay" loop="loop" preload="auto" muted="muted" poster="../_Content/Frontend/Images/blackscreen.jpg">\
             <source src="../_Content/Frontend/Videos/footage_test_oldeffect.mp4" type="video/mp4">\
             <object type="application/x-shockwave-flash" data="http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf">\
                 <param name="movie" value="http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf">\
                 <param name="allowFullScreen" value="true">\
                 <param name="wmode" value="transparent">\
                 <img alt="Backscreen" src="../_Content/Frontend/Images/blackscreen.jpg" width="640" height="360" title="No video playback capabilities, please download the video below">\
             </object>\
             </video>\
             <script src="../_Scripts/jquery.maximage.js" type="text/javascript" charset="utf-8"></script>\
         </div>\
         <div id="gird"></div>\
         <div id="wrapper" class="hfeed">\
             <div id="header">\
                 <div id="main_menu" class="fixedNav">\
                     <div class="menu-logged-in-topmenu-container">\
                         <ul id="menu-logged-in-topmenu" class="menu">\
                             <li id="menu-item-48" class="menu_widget menuTop_logo menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-48"><a onclick=goTo("")><div class=""></div><h1>Home</h1></a></li>\
                             <li id="netent_games" class="request menu_widget menu-item menu-item-type-post_type menu-item-object-page menu-item-46"><a onclick=goTo("games")><div class="icon_widget"></div><h1>GAMES</h1></a></li>\
                             <li id="menu-item-47" class="menu_widget menu-item menu-item-type-post_type menu-item-object-page menu-item-47"><a onclick=goTo("about-us")><div class="icon_widget"></div><h1>ABOUT US</h1></a></li>\
                         </ul>\
                     </div>\
                     <div id="login-panel" class="user-login">\
                     </div>\
                    <div class="recuperaPasswordSimple utente_recpassword" style="display: none;"  onClick=doAction("RecoverPassword","Global");><a>Forgot Password</a></div>\
                   </div>\
             </div><!-- #header -->\
             <div id="main-form" class="main-form">\
                 <div id="main" class="wpPluginMain">\
                     <div id="container">\
                         <div id="content" role="main">\
                             <div id="sectionHomepage">\
                             </div>\
                         </div>\
                     </div><!-- #container -->\
                 </div><!-- #main -->\
             </div>\
             <div id="extraTool" style="bottom: 0px;">\
                 <div style="float: left; width: 75px; margin-left: 50px;">\
                     <h5>You may also like</h5>\
                 </div>\
                 <ul style="float: left;">\
                     <li class="history_li">\
                         <a onclick="goTo("game/southpark")">\
                             <div class="thumbnail_history_border">\
                                 <div class="thumbnail_history" style="background-image: url(http://www.casinotv.com/css/wx/netent/img/southpark.png); "></div>\
                             </div>\
                         </a>\
                     </li>\
                 </ul>\
                 <div id="rightSide_Tool">\
                     <a onclick="minimizeBar();"><div id="minimize_footer" class=""></div></a>\
                     <span id="timeTool">\
                         <div class="head_timer"><div id="clock" class="head_clock"><span class="head_hour"> 8:20</span> </div></div>\
                     </span>\
                 </div>\
                 <a onclick="goTopOfPage()">\
                     <div id="topButton" style="display: none; opacity: 0;">\
                         <img src="../_Content/Frontend/Images/top.png" alt="top">\
                     </div>\
                 </a>\
             </div>\
             <div class="wx-wp-language">\
                 <div class="bsUserLanguagesDialog">\
                     <div class="head_bt_language">\
                         <div class="head_bt_language_ico">\
                             <div class="head_flag_wrap" onclick="showLanguagePanel()">\
                                 <img class="head_flag" src="../_Content/Frontend/Images/flag_en.png" border="0">\
                                 <span>\
                                     &nbsp;&nbsp;English\
                                 </span>\
                             </div>\
                         </div>\
                         <div class="head_dialogLanguage" style="display: none;">\
                             <div class="linkLangage" id="en_GB" languagecode="en">\
                                 <img src="../_Content/Frontend/Images/flag_en.png" border="0" vspace="2" align="absmiddle">\
                                 English\
                             </div>\
</div>\
</div>\
</div>\
</div>\
<a onclick="showContactPanel()">\
    <div id="rightSideWidgetContact">\
        <div id="img_rightSideContact">\
        </div>\
        <div id="text_rightSideContact">\
            <h1>Contact</h1>\
        </div>\
    </div>\
</a>\
<div id="contactPanel" style="right: -300px;">\
</div>\
<a onclick="showRegister();">\
    <div id="rightSideWidgetLogin" style="display: none;">\
        <div id="img_rightSideLogin">\
        </div>\
        <div id="text_rightSideLogin">\
            <h1>Register</h1>\
        </div>\
    </div>\
</a>\
<div id="footer" role="contentinfo">\
    <div id="colophon">\
        <footer>\
            <!-- SOCIAL LOGOS -->\
            <span style="float: left; margin-left: 20px;">\
                <a href="https://www.facebook.com/casinotv"><img src="../_Content/Frontend/Images/social_facebook.png" alt="facebook" style="margin-left: 10px;"></a>\
                <a><img src="../_Content/Frontend/Images/social_twitter.png" alt="twitter" style="margin-left: 10px;"></a>\
                <a href="https://itunes.apple.com/gb/app/real-roulette-hd/id433390716?mt=8"><img src="../_Content/Frontend/Images/social_appstore.png" alt="appstore" style="margin-left: 20px; border-radius: 5px;"></a>\
            </span>\
            <hr style="clear: left; opacity: 0; width: 100%;">\
            <!-- FOOT INFORMATIONS -->\
            <div style="margin-top: 20px; padding: 0px 20px 20px 20px; width: 300px; border-right: 1px solid #a7a7a7; float: left; font-size: 11px;">\
                <span style="font-size: 11.5px">\
                    Casino TV<br>\
                    All Rights Reserved<br>\
                </span>\
            </div>\
            <div style="float: left; width: 600px;" id="footer_menu_container">\
                <!-- Links -->\
                <div class="menu-logged-in-footermenu-container">\
                    <ul id="menu-logged-in-footermenu" class="footermenu">\
                        <li id="menu-item-49" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-49"><a onclick="goTo("games")">All Games</a><span class=menudivider>|</span></li>\
                        <li id="menu-item-50" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-50"><a onclick="goTo("about-us")">About CasinoTV</a><span class=menudivider>|</span></li>\
                        <li id="menu-item-51" class="navMenu_contact menu-item menu-item-type-custom menu-item-object-custom menu-item-51"><a onclick="showContactPanel()">Contact us</a><span class=menudivider>|</span></li>\
                    </ul>\
                </div>\
                <img usemap="#logosMaps" src="../_Content/Frontend/Images/featuring_logo2.png" alt="featuring logo" style="margin-left: 75px; margin-top: 10px; border: 0;" />\
                <map id="logosMaps" name="logosMaps">\
                    <area shape="rect" coords="8,0,66,32" href="http://www.visa.com" alt="" title="" />\
                    <area shape="rect" coords="99,1,157,33" href="http://www.mastercard.com" alt="" title="" />\
                    <area shape="rect" coords="218,5,359,37" href="http://www.paysafecard.com/" alt="" title="" />\
                    <area shape="rect" coords="94,46,167,84" href="http://www.skrill.com/" alt="" title="" />\
                    <area shape="rect" coords="219,46,336,84" href="http://www.wmtransfer.com/" alt="" title="" />\
                    <area shape="rect" coords="373,50,410,88" href="http://www.gamcare.org.uk/" alt="" title="" />\
                    <area shape="rect" coords="498,98,500,100" href="http://www.image-maps.com/index.php?aff=mapped_users_7201311120459585" alt="Image Map" title="Image Map" />\
                </map>\
            </div>\
        </footer>\
    </div>\
</div>\
</div>\
<div id="message" class="message-box"></div>\
<div id="popup">\
</div>\
<div id="progressbar" class="progress-bar">\
    <div class="wBall" id="wBall_1">\
        <div class="wInnerBall">\
        </div>\
    </div>\
    <div class="wBall" id="wBall_2">\
        <div class="wInnerBall">\
        </div>\
    </div>\
    <div class="wBall" id="wBall_3">\
        <div class="wInnerBall">\
        </div>\
    </div>\
    <div class="wBall" id="wBall_4">\
        <div class="wInnerBall">\
        </div>\
    </div>\
    <div class="wBall" id="wBall_5">\
        <div class="wInnerBall">\
        </div>\
    </div>\
</div>';
})(jQuery);


