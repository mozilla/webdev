"use strict";

;(function ($) {
    "use strict";

    // Add expanding button for keyword lists that are too long.
    $(".keywords").each(function (_, list) {
        var $list = $(list);
        var $keywords = $list.find("li");
        if ($keywords.length > 6) {
            $keywords.slice(6).hide();

            var $showAll = $("<li class=\"show-all\"><a href=\"#\">Show all &hellip;</a></li>");
            $showAll.on("click", "a", function (e) {
                e.preventDefault();
                $keywords.show();
                $list.find(".show-all").remove();
            });
            $list.append($showAll);
        }
    });
})(jQuery);