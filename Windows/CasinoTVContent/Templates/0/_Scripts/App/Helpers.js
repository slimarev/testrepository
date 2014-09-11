(function($) {
    $.Helpers = {
        init: function() {

            Handlebars.registerHelper('eachProp', function(context, options) {
                var ret = "";
                var i = 0;
                for (var key in context) {
                    if (context.hasOwnProperty(key)) {
                        ret = ret + options.fn({ key: key,value: context[key],index:i++});
                    }
                }
                return ret;
            });
            Handlebars.registerHelper('firstProp', function (context) {
                return context[Object.keys(context)[0]];
            });
            Handlebars.registerHelper('toFixed', function(value, precision) {
                return value.toFixed(precision);
            });


            Handlebars.registerHelper('ifEqual', function (v1, v2, options) {
                if (Object.prototype.toString.call(v1) === '[object Array]') {
                    if (v1.length == v2) {
                        return options.fn(this);
                    }
                } else if (Object.prototype.toString.call(v2) === '[object Array]') {
                    if (v1 == v2.length) {
                        return options.fn(this);
                    }
                } else {
                    if (v1 == v2) {
                        return options.fn(this);
                    }
                }
                return options.inverse(this);
            });
            Handlebars.registerHelper('ifNotEqual', function(v1, v2, options) {
                if (v1 != v2) {
                    return options.fn(this);
                } else
                    return options.inverse(this);
            });

            Handlebars.registerHelper('ifMore', function(v1, v2, options) {
                if (v1 > v2) {
                    return options.fn(this);
                }
                return options.inverse(this);
            });

            Handlebars.registerHelper('ifLess', function (v1, v2, options) {
                if (v1 < v2) {
                    return options.fn(this);
                }
                return options.inverse(this);
            });

            Handlebars.registerHelper('include', function(options) {
                var context = {},
                    mergeContext = function(obj) {
                        for (var k in obj) context[k] = obj[k];
                    };
                mergeContext(this);
                mergeContext(options.hash);
                return options.fn(context);
            });
           Handlebars.registerHelper('newLineReplace', function(text) {
               text.replace(/\n/g, "<br />");
               return new Handlebars.SafeString(text);
           });
           Handlebars.registerHelper('a', function (url, text) {
               var html;
               if (typeof Handlebars.partials["LinkPartial"] === 'string') {
                   html = Handlebars.compile(Handlebars.partials["LinkPartial"])({ url: url, text: text });
               }
               else {
                   html = Handlebars.partials["LinkPartial"];
               }
               return new Handlebars.SafeString(html);
           });
            Handlebars.registerHelper('compile', function (template,data) {
                var tpl = Handlebars.compile(template);
                return new Handlebars.SafeString(tpl(data));
            });

           Handlebars.registerHelper("partial", function (type, context, index, modelId, settings) {
               var template = '';
                context.settings = settings;
                if (modelId) {
                    context.ModelId = modelId;
                }
                if (index) {
                    context.index = index;
                } else {
                    context.index = 0;
                }
                if (type == 'Text')
                    template = 'TextInputPartial';
                if (type == 'Password')
                    template = 'PasswordInputPartial';
                if (type == 'TextArea')
                    template = 'TextAreaPartial';
                else if (type == 'Checkbox')
                    template = 'CheckboxPartial';
                else if (type == 'Actions')
                    template = 'ActionsPartial';
                else if (type == 'Menu')
                    template = 'MenuPartial';
                else if (type == 'Number')
                    template = 'NumberInputPartial';
                else if (type == 'ImageInput')
                    template = 'ImageInputPartial';
                else if (type == 'Radio')
                    template = 'RadioInputPartial';
                else if (type == 'Dropdown')
                    template = 'DropDownPartial';
                else if (type == 'Date')
                    template = 'DateInputPartial';
                else if (type == 'Label')
                    template = 'LabelPartial';
                else if (type == 'Image')
                    template = 'ImageInputPartial';
                else if (type == 'Filters')
                    template = 'FiltersPartial';
                else if (type == 'Tooltip')
                    template = 'TooltipPartial';
                else if (type == 'GameCategory')
                    template = 'GameCategory';
                else if (type == 'Frame')
                    template = 'FramePartial';
                else if (type == 'Capcha')
                    template = 'CapchaPartial';
                var field;
                if (typeof Handlebars.partials[template] === 'string') {
                    field = Handlebars.compile(Handlebars.partials[template])(context);
                } else {
                    field = Handlebars.partials[template];
                }
                if (!field) {
                    return "Partial not loaded";
                }
                return new Handlebars.SafeString(field);
            });

            Handlebars.registerHelper("checkboxValue", function(status) {

                if (status) {
                    return new Handlebars.SafeString('checked');
                } else {
                    return '';
                }
            });
            Handlebars.registerHelper("inputWidth", function(maxLength) {
                if (maxLength)
                    return new Handlebars.SafeString(maxLength * 12);
                else return '';
            });
        }
    };
})(jQuery);