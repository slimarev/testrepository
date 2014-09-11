(function ($) {
    $.templates['MainPanel'] =
        '<div id="main-form" class="main-form">\
                <div id="main" class="wpPluginMain">\
                    <div id="container">\
                        <div id="content" role="main">\
                            <div id="sectionHomepage">\
                                <div id="globalContent" style="top: 0px;">\
                                    <div id="homeVideo">\
                                        <video autoplay="autoplay" loop="loop" preload="auto" muted="muted" poster="./_Content/Frontend/Images/blackscreen.jpg" width="640" height="360" style="padding: 0px 0px 0px 0px; margin: 0px 0px 0px 0px;">\
                                            <source src="./_Content/Frontend/Videos/footage_test_oldeffect.mp4" type="video/mp4">\
                                            <object data="./_Content/Frontend/Videos/footage_test_oldeffect.mp4" width="640" height="360">\
                                                <img alt="Backscreen" src="./_Content/Frontend/Images/blackscreen.jpg" width="640" height="360" title="No video playback capabilities, please download the video below">\
                                            </object>\
                                        </video>\
                                        <div id="vintageTv">\
                                        </div>\
                                        <div id="textInsideTv">\
                                            <h1 style="font-size: 42px; color: white; font-family: "prisma";"><span style="font-size: 56px;">MORE FUN </span> LESS RISK</h1>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                                    {{#eachProp data}}\
                                    {{#ifEqual index 0}}\
                                         <div id="home_gameList">\
                                                    <div class="home_headerGame">\
                                                        <hr style="opacity: 0; width: 100%;">\
                                                        <div style="float: left; text-align: left; margin-left: 25px;"><h1 style="font-size: 15px;">{{key}}</h1></div>\
                                                        <div style="position: absolute; right: 55px;"><a href="./games" style="color: #344d18;"> » all games</a></div>\
                                                    </div>\
                                                    <div class="wx-ne-matrix-games-grid">\
                                                                <div class="wx-ne-matrix-page-stripe">\
                                                                    <div id="selected-category" class="wx-ne-matrix-page-container">\
                                                                        {{partial "GameCategory" .  index "" ../../data.settings}}\
                                                                    </div>\
                                                                </div>\
                                                    </div>\
                                        </div>\
                                    {{/ifEqual}}\
                                    {{#ifEqual index 1}}\
                                         <div id="home_gameList">\
                                                    <div class="home_headerGame">\
                                                        <hr style="opacity: 0; width: 100%;">\
                                                        <div style="float: left; text-align: left; margin-left: 25px;"><h1 style="font-size: 15px;">{{key}}</h1></div>\
                                                        <div style="position: absolute; right: 55px;"><a href="./games" style="color: #344d18;"> » all games</a></div>\
                                                    </div>\
                                                    <div class="wx-ne-matrix-games-grid">\
                                                                <div class="wx-ne-matrix-page-stripe">\
                                                                    <div id="selected-category" class="wx-ne-matrix-page-container">\
                                                                        {{partial "GameCategory" .  @index "" ../../data.settings}}\
                                                                    </div>\
                                                                </div>\
                                                    </div>\
                                        </div>\
                                    {{/ifEqual}}\
                                    {{/eachProp}}\
                    </div>\
                </div>\
            </div';
})(jQuery);


