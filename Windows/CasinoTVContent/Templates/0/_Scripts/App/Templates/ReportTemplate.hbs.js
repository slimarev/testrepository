(function ($) {
    $.templates['ReportTemplate'] =
        '{{partial "Menu" data}}\
       <h1 class="form_title">{{data.Title}}</h1>\
      <div class="report-header">\
      {{partial "Actions" data}}\
      {{#if data.Actions}}{{partial "Filters" data ""  data.Id settings.filtersSettings}}{{/if}}\
      </div>\
     <div id="grid-{{data.Id}}" style="width:100%;"></div>\
    <div id="grid-pager-{{data.Id}}" style="width:100%;height:20px;"></div>';
})(jQuery);


