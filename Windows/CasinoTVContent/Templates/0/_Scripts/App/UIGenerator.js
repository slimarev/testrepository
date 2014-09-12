
(function ($) {

    $.LOCAL_URL = BASE_SERVER_URL;
    $.SERVER_URL = BASE_SERVICE_URL;
    $.UIGenerator = {
        init: function (mva_name, file_server_name, callback) {
            $.SERVER_URL = $.SERVER_URL + mva_name;
            $.FILE_SERVER_URL = BASE_SERVICE_URL + file_server_name;
            $.templates = {};
            $.controls = {};
            $.target = "Main";
            $.blockActions = false;
            $.gridSortColumn = {};
            $.gridSortDirection = {};
            $.currentGridPage = [];
            $.customPopups = [];
            var partialsHbs = [
                'CheckboxPartial',
                'DateInputPartial',
                'ImagePartial',
                'DropDownPartial',
                'FileInputPartial',
                'ImageInputPartial',
                'NumberInputPartial',
                'RadioInputPartial',
                'TextInputPartial',
                'PasswordInputPartial',
                'TextAreaPartial',
                'ActionsPartial',
                'LabelPartial',
                'FiltersPartial',
                'TooltipPartial',
                'LinkPartial',
                'CapchaPartial',
                'MenuPartial'
            ];
            var templatesHbs = [
                { name: 'FormTemplate', template: {} },
                { name: 'ConfirmMessage', template: {} },
                { name: 'Popup', template: {} },
                { name: 'ViewTemplate', template: {} },
                { name: 'ReportTemplate', template: {} },
                { name: 'MessageBox', template: {} }
            ];
            $.getScript($.LOCAL_URL + "_Scripts/App/ModelsGUID.js", function () {
                if (callback)
                    $.customPopups = [PORTAL_REGISTRATION_FORM, PROFILE_FORM, CHANGE_PASSWORD_FORM,RECOVER_PASSWORD_FORM, RECOVER_PASSWORD_BY_EMAIL, RECOVER_PASSWORD_BY_QUESTION];
            });

            $.each(partialsHbs, function (index, value) {
                $.get($.LOCAL_URL + "_Scripts/App/Partials/" + value + '.hbs.js').then(function () {
                    return Handlebars.registerPartial(value, $.controls[value]);
                });
            });

            $.getScript($.LOCAL_URL + "_Scripts/App/Helpers.js", function () {
                $.Helpers.init();
            });
            $.getScript($.LOCAL_URL + "_Scripts/App/DateFormat.js");
            $('#header_logo').click(function () {
                location.reload();
            });

            setTimeout(function () {
                $.each(templatesHbs, function (index, value) {
                    $.get($.LOCAL_URL + "_Scripts/App/Templates/" + value.name + '.hbs.js').then(function () {
                        value.template = Handlebars.compile($.templates[value.name]);
                    });
                });
            }, 100);

            $.getView = function (models) {
                $.showProgress();
                $.each(models, function (key, value) {
                    var target;
                    var popupSettings = {
                        showCloseBtn: false
                    };
                    if (models.length > 1)
                        if (key > 0) {
                            $.target = "Popup";
                        } else {
                            $.target = "Main";
                        }
                    if ($.target == "Main") {
                        $.hidePopup(value);
                        target = $('#main-form');
                    } else if ($.target == "Popup") {
                        target = $('#pop-up-' + value);
                    }

                    $.ajax({
                        dataType: "json",
                        url: $.LOCAL_URL + '_Handlers/ProxyHandler.ashx?url=' + $.SERVER_URL + '/get_view/' + value + "/" + $.target,
                        async: models.length > 1 ? false : true,
                        success: function (data) {
                            $.hideProgress();
                            if (data.Type == 'Form') {
                                var fieldPadding = 12-data.Models[0].Fields.length ;
                                if (fieldPadding < 3)
                                    fieldPadding = 3;
                                var formSettings = {
                                    layout: {
                                        type: 'vertical',
                                        centered: true
                                    },
                                    heigth: 780,
                                    showMenu: true,
                                    showTitle: true,
                                    fieldsSettings: {
                                        labelAsPlaceholder: false,
                                        inlineInput: true,
                                        paddingTop: fieldPadding,
                                        paddingBottom: fieldPadding
                                    }
                                };
                                if (data.Models[0].Id == PORTAL_LOGIN_FORM) {
                                    formSettings = {
                                        layout: {
                                            type: 'horizontal',
                                            centered: false,
                                            float: 'right'
                                        },
                                        heigth: 0,
                                        showTitle: false,
                                        showMenu: false,
                                        fieldsSettings: {
                                            labelAsPlaceholder: true,
                                            inlineInput: true,
                                            paddingTop: fieldPadding,
                                            paddingBottom: fieldPadding
                                        }
                                    };
                                    target = $("#login-panel");
                                    $.userNotLogged();
                                } else if (data.Models[0].Id == PORTAL_CONTACT_FORM) {
                                    $.target = "main";
                                    formSettings = {
                                        layout: {
                                            type: 'vertical',
                                            centered: false
                                        },
                                        heigth: 0,
                                        showTitle: true,
                                        showMenu: false,
                                        fieldsSettings: {
                                            labelAsPlaceholder: false,
                                            inlineInput: false,
                                            paddingTop: fieldPadding,
                                            paddingBottom: fieldPadding
                                        }
                                    };
                                    target = $('#contact_us_content');
                                } else if ($.inArray(data.Models[0].Id, $.customPopups) !=-1) {
                                    $.target = "Popup";
                                    popupSettings = {
                                        showCloseBtn: true,
                                        autoWidht: false,
                                        animation: "slideDown"
                                    };
                                    formSettings = {
                                        layout: {
                                            type: 'vertical',
                                            centered: true
                                        },
                                        heigth: 780,
                                        showMenu: false,
                                        showTitle: true,
                                        fieldsSettings: {
                                            labelAsPlaceholder: false,
                                            inlineInput: true,
                                            paddingTop: fieldPadding,
                                            paddingBottom: fieldPadding
                                        }
                                    };
                                    $.showPopup(value, popupSettings);
                                    target = $('#pop-up-' + value);
                                } else {
                                    formSettings = {
                                        layout: {
                                            type: 'vertical',
                                            centered: true
                                        },
                                        heigth: 780,
                                        showMenu: true,
                                        showTitle: true,
                                        fieldsSettings: {
                                            labelAsPlaceholder: false,
                                            inlineInput: true,
                                            paddingTop: fieldPadding,
                                            paddingBottom: fieldPadding
                                        }
                                    };
                                    if (models.length > 1)
                                        if (key > 0) {
                                            $.target = "Popup";
                                        } else {
                                            $.target = "Main";
                                        }
                                    if ($.target == "Main") {
                                        $.hidePopup(value);
                                        target = $('#main-form');
                                    } else if ($.target == "Popup") {
                                        $.showPopup(value, popupSettings);
                                        target = $('#pop-up-' + value);
                                    }
                                }
                                var template = getByValue(templatesHbs, 'name', "FormTemplate").template;
                                target.html(template({
                                    data: data,
                                    settings: formSettings
                                }));
                                if ($('.form-wrap')[0].scrollHeight < formSettings.heigth && $.target === "Main")
                                    $('.form-wrap').height(formSettings.heigth);
                                else if ($.target === "Main")
                                    $('.form-wrap').height($('.form-wrap')[0].scrollHeight);

                                target.on('keydown', 'input', function (event) {
                                    if (event.which == 13) {
                                        var $this = $(event.target);
                                        var index = parseFloat($this.attr('data-index'));
                                        var elem = $this.parents().parents().eq(2).find('[data-index="' + (index + 1).toString() + '"]');
                                        if (elem.length) {
                                            event.preventDefault();
                                            elem.focus();
                                        } else {
                                            $.each(data.Actions, function (key, value) {
                                                if (value['IsDefault'] == true) {
                                                    $.action = value;
                                                }
                                            });
                                            $.doAction(data);
                                            $(event.target).blur();
                                        }
                                    }
                                });
                                target.on('input', function (event) {
                                    if ($("#" + event.target.id).val()) {
                                        $("#" + event.target.id).removeClass("error");
                                    }
                                });
                                $(".image_field").on('change', function (event) {
                                    if (this.files && this.files[0]) {
                                        var reader = new FileReader();
                                        $.blockActions = true;

                                        reader.onload = function (e) {
                                            $('#image-' + event.target.id).attr('src', e.target.result);
                                            $("#upload-progress-" + event.target.id).show();
                                            $(".image_delete[value=" + event.target.id + "]").show();
                                            for (var i = 0; i < data.models.length; i++) {
                                                for (var j = 0; j < data.models[i].Fields.length; j++) {
                                                    var progressBar = $("#progress-" + data.models[i].Id + "-" + data.models[i].Fields[j].Id);
                                                    if (data.models[i].Fields[j].Type == 'Image') {
                                                        var formData = new FormData();
                                                        formData.append($.models[i].Fields[j].ExternalId, $("#" + data.models[i].Id + "-" + data.models[i].Fields[j].Id)[0].files[0]);
                                                        $.ajax({
                                                            url: $.LOCAL_URL + '_Handlers/ProxyHandler.ashx?url=' + $.FILE_SERVER_URL + "/upload/",
                                                            type: 'POST',
                                                            xhr: function () {
                                                                var myXhr = $.ajaxSettings.xhr();
                                                                if (myXhr.upload) {
                                                                    myXhr.upload.addEventListener('progress', function (event) {
                                                                        if (event.lengthComputable) {
                                                                            var percentComplete = event.loaded / event.total;
                                                                            percentComplete = parseInt(percentComplete * 100);
                                                                            if (percentComplete == 100) {
                                                                                progressBar.width("90%");
                                                                            } else {
                                                                                progressBar.width(percentComplete + "%");
                                                                            }
                                                                        }
                                                                    }, false);
                                                                }
                                                                return myXhr;
                                                            },
                                                            success: function (responce) {
                                                                $.blockActions = false;
                                                                var res = JSON.parse(responce);
                                                                if (res.IsSuccess) {
                                                                    progressBar.width("100%");
                                                                    $('#image-' + event.target.id).attr('imgUrl', res.Redirect);
                                                                    $("#image-status-" + $(event.target.id).attr("value")).addClass("image-uploaded");
                                                                    $("#image-status-" + $(event.target.id).attr("value")).removeClass("select-image");
                                                                } else {
                                                                    progressBar.width("0%");
                                                                    $("#upload-progress-" + event.target.id).hide();
                                                                    $('#image-' + event.target.id).attr('src', "../_Content/Images/image-stub.jpg");
                                                                    $("#image-status-" + $(event.target.id).attr("value")).removeClass("image-uploaded");
                                                                    $("#image-status-" + $(event.target.id).attr("value")).addClass("select-image");
                                                                }
                                                            },
                                                            error: function (err) {
                                                                $.blockActions = false;
                                                                progressBar.width("0%");
                                                                $("#upload-progress-" + event.target.id).hide();
                                                                $('#image-' + event.target.id).attr('src', "../_Content/Images/image-stub.jpg");
                                                            },
                                                            data: formData,
                                                            processData: false
                                                        });
                                                    }
                                                }
                                            }
                                        };
                                        reader.readAsDataURL(this.files[0]);
                                    } else {
                                        $("#upload-progress-" + event.target.id).hide();
                                        $('#image-' + event.target.id).attr('src', "../_Content/Images/image-stub.jpg");
                                    }
                                });

                            } else if (data.Type == 'View') {
                                if (data.Models[0].Id == "eb8faaaf-3b32-44f5-8a67-e0b07bf4d747") {
                                    $.userLogged(data);
                                } else {
                                    var template = getByValue(templatesHbs, 'name', "ViewTemplate").template;
                                    target.html(template(data));
                                }
                            } else if (data.Type == 'Report') {
                                var settings = {
                                    filtersSettings: {
                                        labelAsPlaceholder: false,
                                        inlineInput: true
                                    }
                                };
                                var template = getByValue(templatesHbs, 'name', "ReportTemplate").template;
                                target.html(template({
                                    data: data,
                                    settings: settings
                                }));
                                $(".list_field").change(function (event) {
                                    $("#" + event.target.id).attr("value", $(this).children(":selected").attr("Id"));
                                });
                                makeGrid(data);
                            }
                            $('.action').on('click', function (event) {
                                $(event.target).prop("disabled", true);
                                $.each(data.Actions, function (key, value) {
                                    if (value['Id'] == event.target.id) {
                                        $.action = value;
                                    }
                                });
                                if ($.action.ConfirmationText) {
                                    $.showConfirm("Confirm", $.action.ConfirmationText, function () { $.doAction(data); }, function () {
                                    });
                                } else {
                                    $.doAction(data);
                                }
                                setTimeout(function () {
                                    $(event.target).prop("disabled", false);
                                }, 400);

                            });

                            $('.global-action').on('click', function (event) {
                                $.each(data.GlobalActions, function (key, globalAction) {
                                    $.each(globalAction.Actions, function (key, action) {
                                        if (action['Id'] == event.target.id) {
                                            $.action = action;
                                        }
                                    });
                                });
                                $.showProgress();
                                $.ajax({
                                    type: "POST",
                                    url: $.LOCAL_URL + '_Handlers/ProxyHandler.ashx?url=' + $.SERVER_URL + '/execute_action',
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    data: JSON.stringify({
                                        actionInfo: $.action,
                                        context: []
                                    }),
                                    error: function (response) {
                                        console.log(response);
                                        $.hideProgress();
                                    },
                                    success: function (response) {
                                        $.hideProgress();
                                        if (!response.ExecuteActionResult.IsSuccess) {
                                            $.showMessageBox('Attention', response.ExecuteActionResult.Message);
                                        } else {
                                            if (response.ExecuteActionResult.RedirectMode == "View") {
                                                $.getView({ item: response.ExecuteActionResult.Redirect });
                                                $.target = response.ExecuteActionResult.Target;
                                            } else if (response.ExecuteActionResult.RedirectMode == "None") {
                                                $.showMessageBox('Attention', response.ExecuteActionResult.Message);
                                            } else if (response.ExecuteActionResult.RedirectMode == "Url") {
                                                window.location.replace(response.ExecuteActionResult.Redirect);
                                            }
                                        }
                                    }
                                });

                            });
                            $('.global-action').hide();
                            $.each(data.GlobalActions, function (key, globalAction) {
                                $.each(globalAction.Actions, function (k, action) {
                                    $("#" + action.Id).show();
                                });
                            });
                        },
                        error: function (error) {
                            $.hideProgress();
                            console.log(error);
                        }
                    });
                });
            };

            $.doAction = function (data) {
                if (!$.blockActions) {
                    $.blockActions = true;
                    var validData = true;
                    var context;
                    if ($.action.Scope == 'Report') {
                        for (var i = 0; i < data.Filters.length; i++) {
                            if (data.Filters[i].Type == 'Checkbox') {
                                data.Filters[i].Value = $("#" + data.Id + "-" + data.Filters[i].Id).prop('checked');
                            } else if (data.Filters[i].Type == 'Dropdown') {
                                data.Filters[i].Value = $("#" + data.Id + "-" + data.Filters[i]['Id']).attr("value");
                            } else if (data.Filters[i].Type == 'Radio') {
                                data.Filters[i].Value = $("input[name=" + data.Filters[i]['Id'] + "]:checked").attr('id');
                            } else {
                                data.Filters[i].Value = $("#" + data.Id + "-" + data.Filters[i].Id).val();
                            }
                        }
                        context = [data.Filters.length > 0 ? { Fields: data.Filters, Id: data.Id } : { Fields: [], Id: data.Id }];
                    } else if ($.action.Scope == 'Model' && data.Type == "Report") {
                        if ($.action.IsBulk) {
                            var checkedModels = [];
                            for (var i = 0; i < data.Models.length; i++) {
                                for (var j = 0; j < data.Models[i].Fields.length; j++) {
                                    if (data.Models[i].Fields[j].Id == 'Id') {
                                        if ($("#" + data.Models[i].Fields[j].Value).prop('checked')) {
                                            checkedModels.push(data.Models[i]);
                                        }
                                    }
                                }
                            }
                            context = data;
                            context.Models = checkedModels;
                        } else {
                            context = [data];
                        }
                    } else if ($.action.Scope == 'Model') {
                        if (data.Models)
                            for (var i = 0; i < data.Models.length; i++) {
                                for (var j = 0; j < data.Models[i].Fields.length; j++) {
                                    if (data.Models[i].Fields[j].Type == 'Checkbox') {
                                        data.Models[i].Fields[j].Value = $("#" + data.Models[i].Id + "-" + data.Models[i].Fields[j].Id).prop('checked');
                                    } else if (data.Models[i].Fields[j].Type == 'Dropdown') {
                                        data.Models[i].Fields[j].Value = $("#" + data.Models[i].Id + "-" + data.Models[i].Fields[j]['Id'] + " option:selected").attr('id');
                                    } else if (data.Models[i].Fields[j].Type == 'Radio') {
                                        data.Models[i].Fields[j].Value = $("input[name=" + data.Models[i].Fields[j]['Id'] + "]:checked").attr('id');
                                    } else if (data.Models[i].Fields[j].Type == 'Image') {
                                        data.Models[i].Fields[j].Value = $("#image-" + data.Models[i].Id + "-" + data.Models[i].Fields[j]['Id']).attr("imgUrl");
                                    } else if (data.Models[i].Fields[j].Type == 'Label') {
                                    } else if (data.Models[i].Fields[j].Type == 'TextArea') {
                                        if (!data.Models[i].Fields[j].Attributes.WYSIWYG) {
                                            data.Models[i].Fields[j].Value = $("#" + data.Models[i].Id + "-" + data.Models[i].Fields[j].Id).val();
                                        } else {
                                            $.editor.post();
                                            data.Models[i].Fields[j].Value = $.editor.t.value;
                                        }
                                    } else {
                                        data.Models[i].Fields[j].Value = $("#" + data.Models[i].Id + "-" + data.Models[i].Fields[j].Id).val();
                                    }
                                }
                            }
                        if ($.action.IsFormValidationRequired)
                            validData = $.validateFields(data.Models);
                        context = data.Models;
                    }
                    if ($.action.Scope == 'Local') {
                        if ($.action.Id == "Reset") {
                            for (var i = 0; i < data.Models.length; i++) {
                                for (var j = 0; j < data.Models[i].Fields.length; j++) {
                                    if (data.Models[i].Fields[j].Type == 'Checkbox') {
                                        $("#" + data.Models[i].Id + "-" + data.Models[i].Fields[j].Id).prop({ checked: false });
                                    } else if (data.Models[i].Fields[j].Type == 'Dropdown') {
                                        $("#" + data.Models[i].Id + "-" + data.Models[i].Fields[j]['Id'] + " option:selected").attr('id', false);
                                    } else if (data.Models[i].Fields[j].Type == 'Radio') {
                                        $("input[name=" + data.Models[i].Fields[j]['Id'] + "]:checked").attr('id', false);
                                    } else {
                                        $("#" + data.Models[i].Id + "-" + data.Models[i].Fields[j].Id).val("");
                                    }
                                }
                            }
                        }
                    } else {
                        if (validData) {
                            $.showProgress();
                            $.ajax({
                                type: "POST",
                                url: $.LOCAL_URL + '_Handlers/ProxyHandler.ashx?url=' + $.SERVER_URL + '/execute_action',
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                data: JSON.stringify({
                                    actionInfo: $.action,
                                    context: context
                                }),
                                error: function (response) {
                                    $.hideProgress();
                                    $.blockActions = false;
                                    console.log(response);
                                },
                                success: function (response) {
                                    $.blockActions = false;
                                    if (!response.ExecuteActionResult.IsSuccess) {
                                        $.showMessageBox('Attention', response.ExecuteActionResult.Message);
                                    }
                                    if (response.ExecuteActionResult.RedirectMode == "View") {
                                        $.target = response.ExecuteActionResult.Target;
                                        $.getView({ item: response.ExecuteActionResult.Redirect });
                                    } else if (response.ExecuteActionResult.RedirectMode == "None") {
                                        $.showMessageBox('Attention', response.ExecuteActionResult.Message);
                                    } else if (response.ExecuteActionResult.RedirectMode == "Reset") {
                                        $.showMessageBox('Attention', response.ExecuteActionResult.Message);
                                        $.action = { Scope: 'Local', Id: 'Reset' };
                                        $.doAction(data);
                                    } else if (response.ExecuteActionResult.RedirectMode == "Url") {
                                        window.location.replace(response.ExecuteActionResult.Redirect);
                                    }
                                    $.hideProgress();
                                }
                            });
                        } else {
                            $.blockActions = false;
                        }
                    }
                }
            };

            function getCurrentModels(callback) {
                $.showProgress();
                $.getJSON($.LOCAL_URL + '_Handlers/ProxyHandler.ashx?url=' + $.SERVER_URL + '/current_models', function (model) {
                    $.hideProgress();
                    callback(model);
                }).fail(function (err) {
                    console.log(err);
                    $.hideProgress();
                });
            }

            function getByValue(array, name, value) {
                var element = {};
                $.each(array, function (key, obj) {
                    if (obj[name] == value) {
                        element = obj;
                    }
                });
                return element;
            }

            $.showMessageBox = function (title, message) {
                $('#message').html(getByValue(templatesHbs, 'name', "MessageBox").template({ title: title, message: message }));
                var timer = setTimeout(function () {
                    $('#message').html('');
                }, 100000);
                $('#confirm-attention').focus();
                $('#confirm-attention').on('click', function () {
                    clearTimeout(timer);
                    $('#message').html('');
                });

            };
            $.showPopup = function (id, settings) {
                $('#popup').html(getByValue(templatesHbs, 'name', "Popup").template({ data: { Id: id }, settings: settings }));
                $("#popup").fadeIn(200);
                if (settings.animation == "slideDown") {
                    $(".popup-inner").css('top', '-800px');
                    $(".popup-inner").animate({ top: "0" }, 1500);
                }
                $(".popup-inner").draggable();
            };
            $.hidePopup = function (id) {
                $('#popup').fadeOut(200);
            };
            $.showConfirm = function (title, message, confirm, cancel) {
                $('#message').html(getByValue(templatesHbs, 'name', "ConfirmMessage").template({ title: title, message: message }));
                $('.modal__close').on('click', function () {
                    $('#message').html('');
                });
                $('#confirm').on('click', function (event) {
                    $('#message').html('');
                    confirm();
                });
                $('#cancel').on('click', function (event) {
                    $('#message').html('');
                    cancel();
                });
            };
            $.validateFields = function (models) {
                var valid = true;
                for (var i = 0; i < models.length; i++) {
                    for (var j = 0; j < models[i].Fields.length; j++) {
                        var fieldValue;
                        if (models[i].Fields[j].Type == 'Checkbox') {
                            fieldValue = $("#" + models[i].Id + "-" + models[i].Fields[j].Id).prop('checked');
                        } else if (models[i].Fields[j].Type == 'Dropdown') {
                            fieldValue = $("#" + models[i].Id + "-" + models[i].Fields[j]['Id'] + " option:selected").attr('id');
                        } else if (models[i].Fields[j].Type == 'Radio') {
                            fieldValue = $("input[name=" + models[i].Fields[j]['Id'] + "]:checked").attr('id');
                        } else if (models[i].Fields[j].Type == 'Image') {
                            fieldValue = $("#image-" + models[i].Id + "-" + models[i].Fields[j]['Id']).attr("imgUrl");
                        } else if (models[i].Fields[j].Type == 'Label') {
                            fieldValue = $("#" + models[i].Id + "-" + models[i].Fields[j]['Id']).attr("value");
                            console.log($("#" + models[i].Id + "-" + models[i].Fields[j]['Id']));
                        } else {
                            fieldValue = $("#" + models[i].Id + "-" + models[i].Fields[j].Id).val();
                        }
                       
                        if (!fieldValue && models[i].Fields[j].IsRequired) {
                            $("#" + models[i].Id + "-" + models[i].Fields[j]['Id']).addClass("error");
                            $("#" + models[i].Id + "-" + models[i].Fields[j]['Id']).focus();;
                            valid = false;
                        } else {
                            $("#" + models[i].Id + "-" + models[i].Fields[j]['Id']).removeClass("error");
                        }
                        if (models[i].Fields[j].Attributes) {
                            if (models[i].Fields[j].Attributes.email) {
                                if (!$.validateEmail(fieldValue)) {
                                    $("#" + models[i].Id + "-" + models[i].Fields[j]['Id']).addClass("error");
                                    $("#" + models[i].Id + "-" + models[i].Fields[j]['Id']).focus();
                                    valid = false;
                                }
                            } else if (models[i].Fields[j].Attributes.url) {
                                if (!$.validateUrl(fieldValue)) {
                                    $("#" + models[i].Id + "-" + models[i].Fields[j]['Id']).addClass("error");
                                    $("#" + models[i].Id + "-" + models[i].Fields[j]['Id']).focus();
                                    valid = false;
                                }
                            }else if (models[i].Fields[j].Attributes.domain) {
                                if (!$.validateDomain(fieldValue)) {
                                    $("#" + models[i].Id + "-" + models[i].Fields[j]['Id']).addClass("error");
                                    $("#" + models[i].Id + "-" + models[i].Fields[j]['Id']).focus();
                                    valid = false;
                                }
                            }
                        }
                    }
                }
                return valid;
            };
            setTimeout(function () {
                getCurrentModels(function (models) {
                    $.getView(models);
                });
            }, 500);
            function makeGrid(report) {
                var data = [];
                var columns= [];
                var models = report.Models;
                var sortColumn = $.gridSortColumn[report.Id];
                var sortDir = $.gridSortDirection[report.Id];
                var isBulk = false;
                var actions = models[0]?models[0].Actions:[];

                function comparer(a, b) {
                    var x = a[sortColumn], y = b[sortColumn];
                    return (x == y ? 0 : (x > y ? 1 : -1));
                }

                function actionsFormatter(row, cell, value, columnDef, dataContext) {
                    var actionsHtml = "<div style='float: right;'>";
                    for (var j = 0; j < actions.length; j++) {
                        actionsHtml += "<button  class='grid-action' value=" + dataContext.id + " actionId="+models[0].Actions[j].Id+">" + models[0].Actions[j].Name + "</button>";
                    }
                    actionsHtml += "</div>";
                    return actionsHtml;
                }

                function bindGridAction() {
                    $('.grid-action').unbind();
                    $('.grid-action').on('click', function (event) {
                        var model;
                        $.each(report.Models, function (key, value) {
                            for (var j = 0; j < value.Actions.length; j++) {
                                if (value.Actions[j].Id == $(event.target).attr("actionId"))
                                    $.action = value.Actions[j];
                            }
                        });
                        $.each(report.Models, function (key, value) {
                            for (var j = 0; j < value.Fields.length; j++) {
                                if (value.LocalId == event.target.value) {
                                    model = value;
                                }

                            }
                        });
                        model.Type = "Report";
                        if ($.action.ConfirmationText) {
                            $.showConfirm("Confirm", $.action.ConfirmationText, function () { $.doAction(model); }, function () {
                                console.log("cancel");
                            });
                        } else {
                            $.doAction(model);
                        }
                    });
                }
                if (models.length > 0) {
                    for (var i = 0; i < models.length; i++) {
                        var row = {};
                        var id;
                        for (var j = 0; j < models[i].Fields.length; j++) {
                            if (models[i].Fields[j].Text)
                                row[report.DefaultModel.Fields[j].Id] = models[i].Fields[j].Text;
                            else {
                                row[report.DefaultModel.Fields[j].Id] = models[i].Fields[j].Value;
                            }
                            if(models[i].Fields[j].Id=="Id")
                                id = models[i].LocalId;
                        }
                        row['id'] = id?id:i;
                        data.push(row);
                    }
                } else {
                    data = [];
                }
              
                if (report.DefaultModel.Fields.length > 0) {
                    for (var j = 0; j < report.DefaultModel.Fields.length; j++) {
                        var tpl = Handlebars.compile(report.DefaultModel.Fields[j].Name.template);
                        columns.push(
                            {
                                id: report.DefaultModel.Fields[j].Id,
                                name: tpl(report.DefaultModel.Fields[j].Name.data),
                                toolTip: tpl(report.DefaultModel.Fields[j].Name.data),
                                field: report.DefaultModel.Fields[j].Id,
                                sortable: report.DefaultModel.Fields[j].IsSortable,
                                width: 150,
                                resizable:true
                            });
                    }
                }
                if(actions.length>0)
                    columns.push({
                        id: 'action', field: 'actions', name: '', width: 100, minWidth: 130, formatter: actionsFormatter, resizable: true
                    });

                var options = {
                    enableAddRow: true,
                    enableColumnReorder: true,
                    forceFitColumns: true,
                    rowHeight: 30,
                    editable: true
                };
                var gridHeight = data.length * 30 + 70;
                $("#grid-" + report.Id).css("height", gridHeight>600?600:gridHeight);
                var dataView = new Slick.Data.DataView({ inlineFilters: true });
                var grid = new Slick.Grid("#grid-" + report.Id, dataView, columns, options);
            
                grid.onDblClick.subscribe(function (e, args) {
                    var cell = grid.getCellFromEvent(e);
                    var row = cell.row;
                    var item = dataView.getItem(row);
                    var model;
                    var defaultAction;
                    $.each(report.Models, function (key, value) {
                        for (var j = 0; j < value.Actions.length; j++) {
                            if (value.Actions[j].IsDefault)
                                defaultAction = value.Actions[j];
                        }
                    });
                    if (defaultAction) {
                        $.action = defaultAction;
                        $.each(report.Models, function (key, value) {
                                if (value.LocalId == item.id) {
                                    model = value;
                                }
                        });
                        model.Type = "Report";
                        if ($.action.ConfirmationText) {
                            $.showConfirm("Confirm", $.action.ConfirmationText, function () { $.doAction(model); }, function () {
                                console.log("cancel");
                            });
                        } else {
                            $.doAction(model);
                        }
                    }
                });
                sortColumn = report.SortingField ? report.SortingField : sortColumn;
                sortColumn = sortColumn ? sortColumn : columns[0].id;
                sortDir = sortDir ? sortDir : "ASC";
            
                grid.onSort.subscribe(function (e, args) {
                    sortDir = args.sortAsc ? "ASC" : "DESC";
                    $.gridSortDirection[report.Id] = sortDir;
                    sortColumn = args.sortCol.field;
                    $.gridSortColumn[report.Id] = args.sortCol.field;
                    dataView.sort(comparer, args.sortAsc);
                    bindGridAction();
                });
               var pager = new Slick.Controls.Pager(dataView, grid, $("#grid-pager-" + report.Id));
               var columnpicker = new Slick.Controls.ColumnPicker(columns, grid, options);
               dataView.onRowsChanged.subscribe(function (e, args) {
                   grid.invalidateRows(args.rows);
                   grid.render();
               });
               dataView.onRowCountChanged.subscribe(function (e, args) {
                   grid.updateRowCount();
                   grid.render();
               });

               dataView.onPagingInfoChanged.subscribe(function (e, pagingInfo) {
                   var isLastPage = pagingInfo.pageNum == pagingInfo.totalPages - 1;
                   var enableAddRow = isLastPage || pagingInfo.pageSize == 0;
                   var options = grid.getOptions();
                   if (options.enableAddRow != enableAddRow) {
                       grid.setOptions({ enableAddRow: enableAddRow });
                   }
               });
               dataView.beginUpdate();
               dataView.setItems(data);
               dataView.endUpdate();
               grid.setSortColumn(sortColumn, sortDir=="ASC");
               dataView.sort(comparer, sortDir == "ASC");
               bindGridAction();
             
            }

            var progressTimer;
            $.showProgress = function () {
                clearTimeout(progressTimer);
                $("#progressbar").show();
            };
            $.hideProgress = function () {
                progressTimer = setTimeout(function () {
                    $("#progressbar").hide();
                }, 1000);
            };
            $.loadStyles('generator-styles','../_Content/styles.css');
            callback();
        }
    };
    $.loadStyles = function (stylesId, stylePath) {
        var cssId = stylesId;
        if (!document.getElementById(cssId)) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = stylePath;
            link.media = 'all';
            head.appendChild(link);
        }

    };
    $.validateEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    $.validateUrl = function (url) {
        var re = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/\~\+#])?$/;
        return re.test(url);
    };
    $.validateDomain = function (domain) {
        var re = /^([a-z0-9]+([\-a-z0-9]*[a-z0-9]+)?\.){0,}([a-z0-9]+([\-a-z0-9]*[a-z0-9]+)?){1,63}(\.[a-z0-9]{2,10})+$/;
        return re.test(domain);
    };
    $.validatePassword = function (password, passMeter) {
        var passwordStrength = 0;
        if ((password.length > 0) && (password.length <= 5)) passwordStrength = 1;
        if (password.length >= 6) passwordStrength++;
        if ((password.match(/[a-z]/)) && (password.match(/[A-Z]/))) passwordStrength++;
        if (password.match(/\d+/)) passwordStrength++;
        if (password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) passwordStrength++;
        if (password.length > 12) passwordStrength++;
        passMeter.removeClass();
        passMeter.addClass('neutral');
        switch (passwordStrength) {
            case 1:
                passMeter.addClass('veryweak');
                break;
            case 2:
                passMeter.addClass('weak');
                break;
            case 3:
                passMeter.addClass('medium');
                break;
            case 4:
                passMeter.addClass('strong');
                break;
            case 5:
                passMeter.addClass('verystrong');
                break;
            default:
                passMeter.addClass('neutral');
        }
    };
    
})(jQuery);