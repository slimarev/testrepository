
(function($) {

    $.LOCAL_URL = BASE_SERVER_URL;
    $.SERVER_URL = BASE_SERVICE_URL;

    $.App = {
        init: function(mva_name, file_server_name) {
            $.SERVER_URL = $.SERVER_URL + mva_name;
            $.FILE_SERVER_URL = BASE_SERVICE_URL + file_server_name;
            $.templates = {};
            $.controls = {};
            $.target = "Main";

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

            $.each(partialsHbs, function(index, value) {
                $.get($.LOCAL_URL + "Scripts/App/Partials/" + value + '.hbs.js').then(function() {
                    return Handlebars.registerPartial(value, $.controls[value]);
                });
            });

            $.getScript($.LOCAL_URL + "Scripts/App/Helpers.js", function() {
                $.Helpers.init();
            });
            $.getScript($.LOCAL_URL + "Scripts/App/PagingGrid.js", function() {

            });
            $('#header_logo').click(function () {
                location.reload();
            });

            setTimeout(function() {
                $.each(templatesHbs, function(index, value) {
                    $.get($.LOCAL_URL + "Scripts/App/Templates/" + value.name + '.hbs.js').then(function() {
                        value.template = Handlebars.compile($.templates[value.name]);
                    });
                });
            }, 100);

            $.getView = function (models) {
                $.showProgress();
                $.each(models, function (key, value) {
                    if (models.length > 1)
                    if (key > 0) {
                        $.target = "Popup";
                    } else {
                        $.target = "Main";
                    }
                    $.ajax({
                        dataType: "json",
                        url: $.LOCAL_URL + '_Handlers/ProxyHandler.ashx?url=' + $.SERVER_URL + '/get_view/' + value + "/" + $.target,
                        async:false,
                        success: function (data) {
                            $.hideProgress();
                            if (models.length > 1)
                                if (key > 0) {
                                    $.target = "Popup";
                                } else{
                                    $.target = "Main";
                                }
                            $.models = data.Models;
                            var target;
                            if ($.target == "Main") {
                                $.hidePopup(value);
                                target = $('#main-form');
                            } else if ($.target == "Popup") {
                                $.showPopup(value);
                                target = $('#pop-up-' + value);
                            }
                            if (data.Type == 'Form') {
                                var template = getByValue(templatesHbs, 'name', "FormTemplate").template;
                                target.html(template(data));
                                target.on('keydown', 'input', function (event) {
                                    if (event.which == 13) {
                                        var $this = $(event.target);
                                        var index = parseFloat($this.attr('data-index'));
                                        if ($('[data-index="' + (index + 1).toString() + '"]').length) {
                                            event.preventDefault();
                                            $('[data-index="' + (index + 1).toString() + '"]').focus();
                                        } else {
                                            $.each(data.Actions, function (key, value) {
                                                if (value['IsDefault'] == true) {
                                                    $.action = value;
                                                }
                                            });
                                            doAction(data);
                                            $(event.target).blur();
                                        }
                                    }
                                });
                                target.on('input', function (event) {
                                    if ($("#" + event.target.id).val()) {
                                        $("#" + event.target.id).removeClass("error");
                                    }
                                });
                                $(".image_delete").on("click", function (event) {
                                    for (var i = 0; i < $.models.length; i++) {
                                        for (var j = 0; j < $.models[i].Fields.length; j++) {
                                            if ($.models[i].Fields[j].Id == $(event.target).attr("value")) {
                                                $.models[i].Fields[j].Value = "";
                                            };
                                        }
                                    }
                                    $("#upload-progress-" + $(event.target).attr("value")).hide();
                                    $(".image_delete[value=" + $(event.target).attr("value") + "]").hide();
                                    $('#image-' + $(event.target).attr("value")).attr('src', "../Content/Images/image-stub.jpg");
                                });
                                $(".image_field").on('change', function (event) {
                                    if (this.files && this.files[0]) {
                                        var reader = new FileReader();
                                        reader.onload = function(e) {
                                            $('#image-' + event.target.id).attr('src', e.target.result);
                                            $("#upload-progress-" + event.target.id).show();
                                            $(".image_delete[value=" + event.target.id + "]").show();
                                            for (var i = 0; i < $.models.length; i++) {
                                                for (var j = 0; j < $.models[i].Fields.length; j++) {
                                                    var currentField = $.models[i].Fields[j];
                                                    var progressBar = $("#progress-" + $.models[i].Fields[j].Id);
                                                    if ($.models[i].Fields[j].Type == 'Image') {
                                                        var formData = new FormData();
                                                        formData.append($.models[i].Fields[j].ExternalId, $("#" + $.models[i].Fields[j].Id)[0].files[0]);
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
                                                                            progressBar.width(percentComplete + "%");
                                                                        }
                                                                    }, false);
                                                                }
                                                                return myXhr;
                                                            },
                                                            success: function (responce) {
                                                                var res=JSON.parse(responce);
                                                                if (res.IsSuccess) {
                                                                    progressBar.width("100%");
                                                                    currentField.Value = res.Redirect;
                                                                    console.log($.models);
                                                                } else {
                                                                    progressBar.width("0%");
                                                                    $("#upload-progress-" + event.target.id).hide();
                                                                    $('#image-' + event.target.id).attr('src', "../Content/Images/image-stub.jpg");
                                                                }
                                                                console.log(responce);
                                                            },
                                                            error: function(err) {
                                                                progressBar.width("0%");
                                                                $("#upload-progress-" + event.target.id).hide();
                                                                $('#image-' + event.target.id).attr('src', "../Content/Images/image-stub.jpg");
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
                                        $('#image-' + event.target.id).attr('src', "../Content/Images/image-stub.jpg");
                                    }
                                });
                            
                                if ($('.form-wrap')[0].scrollHeight < 600 && $.target==="Main")
                                    $('.form-wrap').height(600);
                                else if($.target==="Main")
                                    $('.form-wrap').height($('.form-wrap')[0].scrollHeight);
                            } else if (data.Type == 'View') {
                                var template = getByValue(templatesHbs, 'name', "ViewTemplate").template;
                                target.html(template(data));
                            } else if (data.Type == 'Report') {
                                var template = getByValue(templatesHbs, 'name', "ReportTemplate").template;
                                target.html(template(data));
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
                                    $.showConfirm("Confirm", $.action.ConfirmationText, function () { doAction(data); }, function () {
                                    });
                                } else {
                                    doAction(data);
                                }
                                setTimeout(function() {
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
                                    failure: function (response) {
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

                        },
                        error: function (error) {
                            $.hideProgress();
                            console.log(error);
                        }
                    });


                });

            };

            function doAction(data) {
                $.showProgress();
                var validData=true;
                if ($.action.Scope == 'Report') {
                    for (var i = 0; i < data.Filters.length; i++) {
                        if (data.Filters[i].Type == 'Checkbox') {
                            data.Filters[i].Value = $("#" + data.Filters[i].Id).prop('checked');
                        } else if (data.Filters[i].Type == 'Dropdown') {
                            data.Filters[i].Value = $("#" + data.Filters[i]['Id']).attr("value");
                        } else if (data.Filters[i].Type == 'Radio') {
                            data.Filters[i].Value = $("input[name=" + data.Filters[i]['Id'] + "]:checked").attr('id');
                        } else {
                            data.Filters[i].Value = $("#" + data.Filters[i].Id).val();
                        }
                    }
                    $.models = [data.Filters.length > 0 ? { Fields: data.Filters, Id: data.Id } : { Fields: [], Id: data.Id }];
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
                        data.Models = checkedModels;
                        $.models = [data];
                    } else {
                        $.models = [data];
                    }
                }
                else if ($.action.Scope == 'Model') {
                    for (var i = 0; i < $.models.length; i++) {
                        for (var j = 0; j < $.models[i].Fields.length; j++) {
                            if ($.models[i].Fields[j].Type == 'Checkbox') {
                                $.models[i].Fields[j].Value = $("#" + $.models[i].Fields[j].Id).prop('checked');
                            } else if ($.models[i].Fields[j].Type == 'Dropdown') {
                                $.models[i].Fields[j].Value = $("#" + $.models[i].Fields[j]['Id'] + " option:selected").attr('id');
                            } else if ($.models[i].Fields[j].Type == 'Radio') {
                                $.models[i].Fields[j].Value = $("input[name=" + $.models[i].Fields[j]['Id'] + "]:checked").attr('id');
                            }else if ($.models[i].Fields[j].Type == 'Image') {
                            } else if ($.models[i].Fields[j].Type == 'Label') {
                            }  else {
                                $.models[i].Fields[j].Value = $("#" + $.models[i].Fields[j].Id).val();
                            }
                        }
                    }
                    if ($.action.IsFormValidationRequired)
                    validData=$.validateFields($.models);
                }

                if ($.action.Scope == 'Local') {
                    if ($.action.Id == "Reset") {
                        for (var i = 0; i < $.models.length; i++) {
                            for (var j = 0; j < $.models[i].Fields.length; j++) {
                                if ($.models[i].Fields[j].Type == 'Checkbox') {
                                    $("#" + $.models[i].Fields[j].Id).prop({ checked: false });
                                } else if ($.models[i].Fields[j].Type == 'Dropdown') {
                                    $("#" + $.models[i].Fields[j]['Id'] + " option:selected").attr('id', false);
                                } else if ($.models[i].Fields[j].Type == 'Radio') {
                                    $("input[name=" + $.models[i].Fields[j]['Id'] + "]:checked").attr('id', false);
                                } else {
                                    $("#" + $.models[i].Fields[j].Id).val("");
                                }
                            }
                        }
                    }
                    $.hideProgress();
                } else {
                    if (validData) {
                        $.ajax({
                            type: "POST",
                            url: $.LOCAL_URL + '_Handlers/ProxyHandler.ashx?url=' + $.SERVER_URL + '/execute_action',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({
                                actionInfo: $.action,
                                context: $.models
                            }),
                            failure: function(response) {
                                $.hideProgress();
                                console.log(response);
                            },
                            success: function(response) {
                                if (!response.ExecuteActionResult.IsSuccess) {
                                    $.showMessageBox('Attention', response.ExecuteActionResult.Message);
                                }
                                if (response.ExecuteActionResult.RedirectMode == "View") {
                                    $.target = response.ExecuteActionResult.Target;
                                    $.getView({ item: response.ExecuteActionResult.Redirect });
                                } else if (response.ExecuteActionResult.RedirectMode == "None") {
                                    $.showMessageBox('Attention', response.ExecuteActionResult.Message);
                                } else if (response.ExecuteActionResult.RedirectMode == "Url") {
                                    window.location.replace(response.ExecuteActionResult.Redirect);
                                }
                                $.hideProgress();
                            }
                        });
                    } else {
                        $.hideProgress();
                    }
                }
            }
            function getCurrentModels(callback) {
                $.showProgress();
                $.getJSON($.LOCAL_URL + '_Handlers/ProxyHandler.ashx?url=' + $.SERVER_URL + '/current_models', function (model) {
                    $.hideProgress();
                    callback(model);
                }).fail(function(err) {
                    console.log(err);
                    $.hideProgress();
                });
            }

            function getByValue(array, name, value) {
                var element = {};
                $.each(array, function(key, obj) {
                    if (obj[name] == value) {
                        element = obj;
                    }
                });
                return element;
            }

            $.showMessageBox = function(title, message) {
                $('#message').html(getByValue(templatesHbs, 'name', "MessageBox").template({ title: title, message: message }));
                var timer = setTimeout(function() {
                    $('#message').html('');
                }, 5000);
                $('.modal__close').on('click', function() {
                    clearTimeout(timer);
                    $('#message').html('');
                });

            };
            $.showPopup = function (id) {
                $('#popup').append(getByValue(templatesHbs, 'name', "Popup").template({ Id: id }));
            };
            $.hidePopup = function (id) {
                $('#popup').empty();
            };
            $.showConfirm = function (title, message,confirm,cancel) {
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
                            fieldValue = $("#" + models[i].Fields[j].Id).prop('checked');
                        } else if (models[i].Fields[j].Type == 'Dropdown') {
                            fieldValue = $("#" + models[i].Fields[j]['Id'] + " option:selected").attr('id');
                        } else if (models[i].Fields[j].Type == 'Radio') {
                            fieldValue = $("input[name=" + models[i].Fields[j]['Id'] + "]:checked").attr('id');
                        } else if (models[i].Fields[j].Type == 'Image') {
                            fieldValue = models[i].Fields[j].Value;
                        } else {
                            fieldValue = $("#" + models[i].Fields[j].Id).val();
                        }
                        if (!fieldValue && models[i].Fields[j].IsRequired) {
                            $("#" + models[i].Fields[j]['Id']).addClass("error");
                            valid = false;
                        } else {
                            $("#" + models[i].Fields[j]['Id']).removeClass("error");
                        }
                    }
                }
                return valid;
            };
            setTimeout(function() {
                getCurrentModels(function(models) {
                    $.getView(models);
                }); 
            }, 500);

            function makeGrid(report) {

                var data = [];
                var columns = [];
                var columnsSorting = [];
                var models = report.Models;
                var fieldsTemplate = [];
                var columnWidths = [];
                var actionTemplate = "<div class='grid-actions'>";
                var isBulk = false;
                if (models.length > 0) {
                    for (var i = 0; i < models.length; i++) {
                        var row = {};
                        for (var j = 0; j < models[i].Fields.length; j++) {
                            if (models[i].Fields[j].Text)
                                row[models[i].Fields[j].Name] = models[i].Fields[j].Text;
                            else {
                                row[models[i].Fields[j].Name] = models[i].Fields[j].Value;
                            }
                        }
                        data.push(row);
                    }
                    for (var j = 0; j < models[0].Actions.length; j++) {
                        actionTemplate += ("<button id='{{ID}}' class='grid-action' value=" + models[0].Actions[j].Id + ">" + models[0].Actions[j].Name + "</button>");
                    }
                    actionTemplate += "</div>";
                } else {
                     data=[];
                }
                  for (var j = 0; j < report.Actions.length; j++) {
                      if (report.Actions[j].IsBulk) {
                          isBulk = true;
                      }
                  }
                if (report.DefaultModel.Fields.length>0) {
                    for (var j = 0; j < report.DefaultModel.Fields.length; j++) {
                        columns.push(report.DefaultModel.Fields[j].Name);
                        columnsSorting.push(report.DefaultModel.Fields[j].IsSortable);
                        columnWidths.push(100 / report.DefaultModel.Fields.length + "%");
                    }
                    for (var j = 0; j < columns.length; j++) {
                        fieldsTemplate.push(null);
                    }
                    columns.push("");
                    fieldsTemplate.push(actionTemplate);
                    var sortedField = '';
                    for (var j = 0; j < report.DefaultModel.Fields.length; j++) {
                        if (report.DefaultModel.Fields[j].Id == report.SortingField)
                            sortedField = report.DefaultModel.Fields[j].Name;
                    }
                }

                $("#grid-" + report.Id).simplePagingGrid({
                    columnNames: columns,
                    columnKeys: columns,
                    data: data,
                    columnWidths: columnWidths,
                    sortable: columnsSorting,
                    sortOrder: report.SortingDirection.toLowerCase(),
                    initialSortColumn: sortedField ? sortedField : columns[0],
                    cellTemplates: fieldsTemplate,
                    isBulk: isBulk,
                    bulkTemplate:"<td><input id='{{ID}}' type='checkbox'></input></td>",
                    showGotoPage: data.length > 1 ? true : false,
                    showPageNumbers: data.length > 1 ? true : false,
                    pagingEnabled: data.length > 1 ? true : false,
                    localSort: data.length < 1000 ? true : false,
                    nextChank: function() {
                        alert("nextChank");
                    },
                    sort: function (field, direction) {
                        var fieldId = '';

                        for (var j = 0; j < report.DefaultModel.Fields.length; j++) {
                            if (report.DefaultModel.Fields[j].Name == field)
                                fieldId = report.DefaultModel.Fields[j].Id;
                        }
                      
                        $.showProgress();
                        $.ajax({
                            type: "POST",
                            url: $.LOCAL_URL + '_Handlers/ProxyHandler.ashx?url=' + $.SERVER_URL + '/execute_action',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({
                                actionInfo: {
                                    Description: null,
                                    Id: "Refresh",
                                    ImageUrl: null,
                                    IsBulk: false,
                                    Name: "Refresh",
                                    Scope: "Report",
                                },
                                context: [{
                                    Fields: [
                                        { "Id": "SortingField", Type: "Text", Value: fieldId },
                                        { "Id": "SortingDirection", Type: "Text", Value: direction.toUpperCase() }
                                    ],
                                    Id: report.Id
                                }]
                            }),
                            failure: function(response) {
                                $.hideProgress();
                                console.log(response);
                            },
                            success: function (response) {
                                if (!response.ExecuteActionResult.IsSuccess) {
                                    $.showMessageBox('Attention', response.ExecuteActionResult.Message);
                                }
                                if (response.ExecuteActionResult.RedirectMode == "View") {
                                    $.getView({ item: response.ExecuteActionResult.Redirect });
                                } else if (response.ExecuteActionResult.RedirectMode == "None") {
                                    $.showMessageBox('Attention', response.ExecuteActionResult.Message);
                                } else if (response.ExecuteActionResult.RedirectMode == "Url") {
                                    window.location.replace(response.ExecuteActionResult.Redirect);
                                }
                                $.hideProgress();
                            }
                        });

                    },
                    dataChanged: function () {
                        $('.grid-action').on('click', function (event) {
                            var model;
                            $.each(report.Models, function (key, value) {
                                for (var j = 0; j < value.Actions.length; j++) {
                                    if (value.Actions[j].Id == $(event.target).attr("value"))
                                        $.action = value.Actions[j];
                                }
                            });
                            $.each(report.Models, function (key, value) {
                                for (var j = 0; j < value.Fields.length; j++) {
                                    if (value.Fields[j].Value == event.target.id)
                                        model = value;
                                }
                            });
                            model.Type = "Report";
                            if ($.action.ConfirmationText) {
                                $.showConfirm("Confirm", $.action.ConfirmationText, function () { doAction(model); }, function () {
                                    console.log("cancel");
                                });
                            } else {
                                doAction(model);
                            }

                        });
                    }
                });
            }

            $.showProgress = function () {
                $("#progressbar").show();
            };
            $.hideProgress = function () {
                $("#progressbar").hide();
            };
            
        }
    };
})(jQuery);