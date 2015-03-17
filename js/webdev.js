"use strict";

;(function ($) {
    "use strict";

    var PAGE_SIZE = 10;

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

    // Paginate project list.
    var $projects = $(".project");
    $projects.slice(PAGE_SIZE).hide();

    var $paginator = $("<div></div>");
    $("#projects").append($paginator);
    $paginator.pagination({
        items: $projects.length,
        itemsOnPage: PAGE_SIZE,
        onPageClick: function (page) {
            var sliceStart = (page - 1) * PAGE_SIZE;
            $projects.hide();
            $projects.slice(sliceStart, sliceStart + PAGE_SIZE).show();
        } });
})(jQuery);