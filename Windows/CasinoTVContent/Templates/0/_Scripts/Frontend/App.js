(function($) {
    $.App = {
        init: function () {
            var requestList = ["netent_games", "netent_reset_balance", "deposit_page", "withdraw_page", "withdraw_report_page", "deposit_report_page", "transaction_report_page"];
            var balanceUpdateTimer;
            $.isLogged=false;
            var partialsHbs = [
                   'GamePreview',
                   'GameCategory',
                   'MainFormGamePreview'
            ];
            var templatesHbs = [
                  { name: 'UserPanel', template: {} },
                  { name: 'GamesPanel', template: {} },
                  { name: 'FramePanel', template: {} },
                  { name: 'MainPanel', template: {} },
                  { name: 'BodyTemplate', template: {} }

            ];
            $.each(partialsHbs, function(index, value) {
         
            $.getScript($.LOCAL_URL + "_Scripts/Frontend/Partials/" + value + '.hbs.js').then(function () {
                    return Handlebars.registerPartial(value, $.controls[value]);
            });
            });
            var templateLoaded = 0;
                $.each(templatesHbs, function (index, value) {
                    $.get($.LOCAL_URL + "_Scripts/Frontend/Templates/" + value.name + '.hbs.js').then(function () {
                        value.template = Handlebars.compile($.templates[value.name]);
                        templateLoaded++;
                        if (templateLoaded == templatesHbs.length) {
                            $.makePage('BodyTemplate', {}, $('#body'));
                            $.get($.LOCAL_URL + "_Content/Frontend/Pages/Contact.html", function (data) {
                                $("#contactPanel").html(data);
                            });
                            $("#backgrounVideo video, #backgrounVideo object").maximage('maxcover');
                            $.getCurrentGlobalModels(function (models) {
                                $.getView(models);
                            });
                            $.getCurrentPage();
                            showTime();
                        }
                    });
                });
                $.get($.LOCAL_URL + "_Scripts/App/StatusCode.js");
           $.userLogged = function (data) {
                $.isLogged = true;
                $("#login-panel").html(getByValue(templatesHbs, 'name', "UserPanel").template(data));
                clearInterval(balanceUpdateTimer);
                var updateBalance = function () {
                    $.getJSON($.LOCAL_URL + '_Handlers/ProxyHandler.ashx?url=' + $.SERVER_URL + '/get_user_info', function (responce) {
                        if (responceStatus(responce.result));
                        $("#gambler_balance").html(responce.bonusBalance + responce.realBalance);
                    }).fail(function(err) {
                        console.log(err);
                    });
                };
                balanceUpdateTimer = setInterval(function () {
                    updateBalance();
                }, 10000);
                getRequestList();
                updateBalance();
                showUserData();
                };
            $.userNotLogged = function () {
                $.isLogged = false;
                hideUserData();
                clearInterval(balanceUpdateTimer);
                getRequestList();
            };
            $.doRequest = function (data,main) {
                $.showProgress();
                $.ajax({
                    type: "POST",
                    url: $.LOCAL_URL + '_Handlers/ProxyHandler.ashx?url=' + $.SERVER_URL + '/execute_request',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(data),
                    error: function (response) {
                        console.log(response);
                        $.hideProgress();
                    },
                    success: function (response) {
                        $.hideProgress();
                        if (!response.IsSuccess) {
                            $.showMessageBox('Attention', response.Message);
                        } else {
                            if (main) {
                                var settings= {
                                    itemCount:4
                                };
                                response.ResponseData.settings = settings;
                                $.makePage("MainPanel", response.ResponseData, $("#main-form"));
                            } else {
                                if (data.requestId == "netent_games") {
                                    $.makePage("GamesPanel", response.ResponseData, $("#main-form"));
                                } else {
                                    var popupSettings = {
                                        showCloseBtn: true,
                                        autoWidht:true,
                                        animation: "slideDown"
                                    };
                                    $.showPopup(data.requestId, popupSettings);
                                    $.makePage("FramePanel", response.ResponseData, $("#pop-up-"+data.requestId));
                                };
                            }
                        }
                        if ($.isLogged) {
                            $.userLogged();
                        } else {
                            $.userNotLogged();
                        }
                    }
                });
            };
            $.getContent = function (data,target) {
                $.showProgress();
                $.ajax({
                    type: "POST",
                    url: $.LOCAL_URL + '_Handlers/ProxyHandler.ashx?url=' + $.SERVER_URL + '/get_content',
                    contentType: "application/json; charset=utf-8",
                    dataType: "html",
                    async:false,
                    headers: {
                      Accept:"text/html"  
                    },
                    data: JSON.stringify(data),
                    error: function (response) {
                        console.log(response);
                        $.hideProgress();
                    },
                    success: function (response) {
                        $.hideProgress();
                        var iframeDocument = document.querySelector('#' + target).contentWindow.document;
                        iframeDocument.open('text/html', 'replace');
                        iframeDocument.write(response);
                        iframeDocument.close();
                    }
                });
            };
            $.resetBalance = function () {
                $.showProgress();
                $.ajax({
                    type: "POST",
                    url: $.LOCAL_URL + '_Handlers/ProxyHandler.ashx?url=' + $.SERVER_URL + '/netent_reset_balance',
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    error: function (response) {
                        console.log(response);
                        $.hideProgress();
                    },
                    success: function (response) {
                        $.hideProgress();
                    }
                });

            };
            $.getPage = function (requestPage, target, callback) {
                $.get($.LOCAL_URL + "_Content/Frontend/Pages/" + requestPage, function (data) {
                    target.html(data);
                    if(callback)callback();
                });
            };
            $.makePage = function (templateName, data, target) {
                var template = getByValue(templatesHbs, 'name', templateName).template;
                target.html(template({
                    data: data
                }));
            };
            $.getCurrentGlobalModels = function(callback) {
                $.showProgress();
                $.getJSON($.LOCAL_URL + '_Handlers/ProxyHandler.ashx?url=' + $.SERVER_URL + '/current_global_models', function (models) {
                    $.hideProgress();
                    callback(models);
                }).fail(function(err) {
                    console.log(err);  
                    $.hideProgress();
                });
            };
            function getByValue(array, name, value) {
                var element = {};
                $.each(array, function (key, obj) {
                    if (obj[name] == value) {
                        element = obj;
                    }
                });
                return element;
            }

            function hideUserData() {
                $('.home_img_playFF').show();
                $('.home_img_login_play').show();
                $('#rightSideWidgetLogin').show();
                $('.home_img_play').hide();
                $('.recuperaPasswordSimple').show();
            }
            function showUserData() {
                $('#rightSideWidgetLogin').hide();
                $('.home_img_playFF').hide();
                $('.home_img_login_play').hide();
                $('.home_img_play').show();
                $('.recuperaPasswordSimple').hide();
            }

            function responceStatus(code) {
                var status, message;
                switch(code) {
                    case SUCCESS:{
                            status = true;
                        }
                        break;
                    case ERROR_LOGIN_FAILED:{
                        status = false;
                        message = "Authorization failed!";
                       }
                        break;
                    case ERROR_SESSION_EXPIRED:{
                        location.reload();
                       }
                        break;
                    case ERROR_PREVIOUS_BET_IN_PROGRESS:{
                        status = false;
                        message = "Previous bet in progress!";
                    }
                        break;
                    case ERROR_BETTING_LIMITS_VIOLATION:{
                        status = false;
                        message = "Betting limits violation!";
                    }
                        break;  
                    case ERROR_MAX_WAGER_LIMIT:{
                        status = false;
                        message = "Max wager limit!";
                    }
                        break;    
                    case     ERROR_MIN_WAGER_LIMIT:{
                        status = false;
                        message = "Min wager limit!";
                    }
                        break;
                    case     ERROR_TABLE_CLOSED:{
                        status = false;
                        message = "Table closed!";
                    }
                        break;
                    case     ERROR_INSUFFICIENT_FUNDS:{
                        status = false;
                        message = "Insufficient funds!";
                    }
                        break;    
                    case     ERROR_JOIN_GAME_FAILED:{
                        status = false;
                        message = "Join game failed!";
                    }
                        break;   
                    case     ERROR_GAME_NOT_JOINED:{
                        status = false;
                        message = "Game not joined!";
                    }
                        break;  
                    case     ERROR_MALFORMED_PARAM:{
                        status = false;
                        message = "Malformed param!";
                    }
                        break;   
                    case     ERROR_INPUT_ERROR:{
                        status = false;
                        message = "Input error!";
                    }
                        break;
                    case     ERROR_USER_ALREADY_EXISTS:{
                        status = false;
                        message = "User already exists!";
                    }
                        break;
                    case     ERROR_SYSTEM_UNAVAILABLE:{
                        status = false;
                        message = "System unavailable!";
                    }
                        break;
                    case     ERROR_NO_GAME_RUNNING:{
                        status = false;
                        message = "No game running!";
                    }
                        break;
                    case     ERROR_CLIENT_ID:{
                        status = false;
                        message = "Incorrect client Id!";
                    }
                        break;
                    case     ERROR_CLIENT_AUTH:{
                        status = false;
                        message = "Authorization failed!";
                    }
                        break;
                    case     ERROR_CALL_NOT_FOUND:{
                        status = false;
                        message = "Call not found!";
                    }
                        break;
                    case     ERROR_SYSTEM_ERROR:{
                        status = false;
                        message = "System error!";
                    }
                        break;
                    case     ERROR_DISPLAY_ROUND_ID_NOT_EXISTS:{
                        status = false;
                        message = "Display round id not exists!";
                    }
                        break;
                    case     ERROR_RESULT_ALREADY_DECLARED:{
                        status = false;
                        message = "Result already declared!";
                    }
                        break;
                    case     ERROR_ROUND_NOT_CLOSED:{
                        status = false;
                        message = "Round not closed!";
                    }
                        break;
                    case     ERROR_RESULT_NOT_DECLARED:{
                        status = false;
                        message = "Result not declared!";
                    }
                        break;  
                    case     ERROR_WINNINGS_ALREADY_UPDATED:{
                        status = false;
                        message = "Winning already updated!";
                    }
                        break;
                    case     ERROR_UNKNOWN:{
                        status = false;
                        message = "Unknown error!";
                    }
                        break;               
                case     ERROR_NO_INTERNET_ACCESS:{
                        status = false;
                        message = "No internet access!";
                    }
                        break;
                    default: {
                        status = false;
                        message = "Error!";
                    }
                }
                if(!status)
                $.showMessageBox("Error", message);
                return status;
            }

            function pathNameRequestId(pathname,callback) {
                if ((new RegExp("/games")).test(pathname))
                    callback("netent_games", false);
                else if ((new RegExp("/about-us")).test(pathname))
                    callback("about-us", true);
                else if ((new RegExp("/good-gaming")).test(pathname))
                    callback("good-gaming", true);
                else if ((new RegExp("/jackpots")).test(pathname))
                    callback("jackpots", true);
                else if ((new RegExp("/background")).test(pathname))
                    callback("background", true);
                else if ((new RegExp("/legal")).test(pathname))
                    callback("legal", true);
                else if ((new RegExp("/deposits")).test(pathname))
                    callback("deposits", true);
                else if ((new RegExp("/winnings")).test(pathname))
                    callback("winnings", true);
                else if ((new RegExp("/game")).test(pathname))
                    callback("game", true);
                else {
                    callback("main", false);
                }

            };

            function getRequestList() {
                $.getJSON($.LOCAL_URL + '_Handlers/ProxyHandler.ashx?url=' + $.SERVER_URL + '/get_requests', function (responce) {
                    setTimeout(function() {
                        $.each(requestList, function (lKey, lRequest) {
                            $.each(responce, function (key, request) {
                                if ($(lRequest == request))
                                    $("#" + request).show();
                                else {
                                    $("#" + request).hide();
                                }
                            });
                        });
                    }, 1000);
                }).fail(function (err) {
                    console.log(err);
                });
            };
          $.getCurrentPage = function () {
                pathNameRequestId(document.location.pathname, function(requestId, htmlResponse) {
                    if (htmlResponse) {
                        if (requestId == "about-us") {
                            $.getPage("About.html", $("#main-form"));
                        } else if (requestId == "good-gaming") {
                            $.getPage("GoodGaming.html", $("#main-form"));
                        } else if (requestId == "jackpots") {
                            $.getPage("Jackpots.html", $("#main-form"));
                        } else if (requestId == "background") {
                            $.getPage("Background.html", $("#main-form"));
                        } else if (requestId == "legal") {
                            $.getPage("Legal.html", $("#main-form"));
                        } else if (requestId == "deposits") {
                            $.getPage("Deposits.html", $("#main-form"));
                        } else if (requestId == "winnings") {
                            $.getPage("Winnings.html", $("#main-form"));
                        } else if (requestId == "game") {
                            $.getPage("Game.html", $("#main-form"), function () {
                                $.getContent({ requestId: "netent_game", gameId: document.location.pathname.split('/').slice(-1).pop() }, "gameFrame");
                                window.addEventListener('resize', function(event) {
                                    resizeGameView();
                                });
                            });
                        }
                    } else if (requestId == "main") {
                        $.doRequest({ requestId: "netent_games" }, true);
                    } else {
                        $.doRequest({ requestId: requestId }, false);
                    }
                });
            };
            $.loadStyles('frontend-styles', '../_Content/Frontend/Styles.css');
            $.loadStyles('datetimepicker-styles', '../_Content/jquery.datetimepicker.css');

        }
    };
})(jQuery);

