$(window).scroll(
    function() {
        if ($(window).scrollTop() == 0) {
            $('#topButton').css('display', 'none');
            $('#topButton').css('opacity', '0');
        } else {
            $('#topButton').css('display', 'block');
            $('#topButton').css('opacity', '1');
        }

    });
function goTopOfPage() {
    $('html, body').animate({
        scrollTop: 0
    }, 'fast');
}


function showRegister() {
    $.target = "register_content";
    doAction("Register", "Global");
}
function minimizeBar() {
    if (document.getElementById('extraTool').style.bottom === '0px') {
        document.getElementById('extraTool').style.bottom = '-30px';
        $("#minimize_footer").addClass("up");
    }
    else {
        document.getElementById('extraTool').style.bottom = '0px';
        $("#minimize_footer").removeClass("up");
    }
}

function closeRegister() {
    $('#register').css('top', '-500px');
    $('#register_back').hide();
    $('#register_back').css('pointer-events', 'auto');
}

function showRegisterFromGame() {
    $('#register_back').show();
    $("#register").animate({ top: "50px" }, 500);
    $('#register_back').css('pointer-events', 'auto');

}
function showPopup(id) {
    $.doRequest({ requestId: id }, false);
}


function showContactPanel() {
    document.getElementById('contactPanel').style.right = '0px';
    $('#topButton').hide();
}
function showLanguagePanel() {
    $('.head_dialogLanguage').toggle();
}

function closeContactPanel() {
    document.getElementById('contactPanel').style.right = '-300px';
    $('#topButton').show();
}


function minimizeBar() {
    if (document.getElementById('extraTool').style.bottom === '0px') {
        document.getElementById('extraTool').style.bottom = '-30px';
        $("#minimize_footer").addClass("up");
    } else {
        document.getElementById('extraTool').style.bottom = '0px';
        $("#minimize_footer").removeClass("up");
    }
}

function showTime() {
    var timeNow = new Date();
    var hours = timeNow.getHours();
    var minutes = timeNow.getMinutes();
    var timeString = "" + ((hours > 12) ? hours - 12 : hours);
    timeString += ((minutes < 10) ? ":0" : ":") + minutes;
    var cdate = "<span class=\"head_hour\"> " + timeString + "</span> ";
    $('#clock').html(cdate);
    setTimeout(function() {
        showTime();
    }, 1000);
}

function doAction(id, scope) {
    $.action = { Id: id, Scope: scope };
    var data = JSON.stringify({
        actionInfo: $.action,
        context: $.models
    });
     $.doAction(data);
}

function showGamesPage() {
    $.doRequest("netent_games");
}
function showGamesPage() {
    $.doRequest("netent_games");
}
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
function resizeGameView() {
    var window_sizeW = $(window).width();
    var window_sizeH = $(window).height();
    if (window_sizeW > window_sizeH) {
        var game_factor = ((window_sizeH * 0.7) / 480);
        var new_w = ((670 * game_factor) + 40);
        var new_h = ((480 * game_factor) + 40);
        document.getElementById('GameWindow').style.width = new_w + "px";
        new_w = new_w - 40;
        new_h = new_h - 40;
        document.getElementById('GameWindow').style.width = new_w + "px";
        document.getElementById('GameWindow').style.height = new_h + "px";
    }
    else {
        var game_factor = ((window_sizeW * 0.7) / 640);
        var new_w = ((670 * game_factor) + 40);
        var new_h = ((480 * game_factor) + 40);
        document.getElementById('GameWindow').style.width = new_w + "px";
        new_w = new_w - 40;
        new_h = new_h - 40;
        document.getElementById('GameWindow').style.width = new_w + "px";
        document.getElementById('GameWindow').style.height = new_h + "px";
    }
}

function closeGame() {
    $.resetBalance();
    window.history.go(-2);
}

function goTo(path) {
    window.history.pushState("", "", $.LOCAL_URL + path);
    $.getCurrentPage();
}