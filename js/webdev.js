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
            $projects.filter(".matched").hide().slice(sliceStart, sliceStart + PAGE_SIZE).show();
        } });

    // Search projects
    var $noResults = $("<p class=\"search-message\">No matching projects found.</p>");
    var $search = $("\n        <label id=\"search\">\n          <span>Search query</span>\n          <input type=\"text\" placeholder=\"Search name, description, keywords...\">\n        </label>\n    ");
    $search.insertBefore("#projects .columns");

    var $query = $search.find("input");
    $query.keyup(function (e) {
        var query = $query.val().trim();
        if (!query) {
            $projects.addClass("matched"); // Empty queries match everything.
        } else {
            (function () {
                // Hide everything and re-show if all terms match.
                var terms = query.split(" ").filter(function (t) {
                    return t != "";
                });
                $projects.removeClass("matched").each(function (_, project) {
                    var $project = $(project);
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = terms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var term = _step.value;

                            if ($project.data("search").indexOf(term) === -1) {
                                return;
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator["return"]) {
                                _iterator["return"]();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    $project.addClass("matched");
                });
            })();
        }

        // Show a "No results" message if nothing is matched, otherwise show the
        // first page of results and update the pagination.
        $projects.hide();
        var $matchedProjects = $projects.filter(".matched");
        if ($matchedProjects.length === 0) {
            $paginator.hide();
            $noResults.appendTo("#projects .columns");
        } else {
            $noResults.remove();
            $matchedProjects.slice(0, PAGE_SIZE).show();
            $paginator.show();
            $paginator.pagination("updateItems", $matchedProjects.length);
        }
    });

    // Clicking keywords adds them to the current search query.
    $(".keyword").click(function (e) {
        $query.val($query.val() + " " + $(this).text()).keyup();
    });
})(jQuery);