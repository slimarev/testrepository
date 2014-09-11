(function($) {
    $.controls['MenuPartial'] =
        '<div id="menu-wrap" class="clearfix">\
        <ul id="menu-custom">\
       {{#each GlobalActions}}\
       <li><a id={{Id}} class="global-action">{{Name}}</a>\
           <ul>\
           {{#each Actions}}\
    	        <li><a id={{Id}} class="global-action">{{Name}}</a></li>\
           {{/each}}\
           {{#each InnerCategories}}\
                <li><a id={{Id}} class="global-action">{{Name}}</a>\
                    <ul>\
                        {{#each Actions}}\
                            <li><a id={{Id}} class="global-action">{{Name}}</a></li>\
                        {{/each}}\
                    </ul>\
                </li>\
            {{/each}}\
         </ul>\
        </li>\
       {{/each}}\
    </ul>\
</div>';
})(jQuery);