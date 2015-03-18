;(function($) {
    'use strict';

    const PAGE_SIZE = 10;

    // Add expanding button for keyword lists that are too long.
    $('.keywords').each((_, list) => {
        let $list = $(list);
        let $keywords = $list.find('li');
        if ($keywords.length > 6) {
            $keywords.slice(6).hide();

            let $showAll = $('<li class="show-all"><a href="#">Show all &hellip;</a></li>');
            $showAll.on('click', 'a', e => {
                e.preventDefault();
                $keywords.show();
                $list.find('.show-all').remove();
            });
            $list.append($showAll);
        }
    });

    // Paginate project list.
    let $projects = $('.project');
    $projects.addClass('matched'); // So pagination works before first search.
    $projects.slice(PAGE_SIZE).hide();

    let $paginator = $('<div></div>');
    $('#projects').append($paginator);
    $paginator.pagination({
        items: $projects.length,
        itemsOnPage: PAGE_SIZE,
        onPageClick: page => {
            let sliceStart = (page - 1) * PAGE_SIZE;
            $projects.filter('.matched')
                .hide()
                .slice(sliceStart, sliceStart + PAGE_SIZE)
                .show();
        },
    });

    // Search projects
    let $noResults = $(`<p class="search-message">No matching projects found.</p>`);
    let $search = $(`
        <label id="search">
          <span>Search query</span>
          <input type="text" placeholder="Search name, description, keywords...">
        </label>
    `);
    $search.insertBefore('#projects .columns');

    let $query = $search.find('input');
    $query.keyup(e => {
        let query = $query.val().trim();
        if (!query) {
            $projects.addClass('matched'); // Empty queries match everything.
        } else {
            // Hide everything and re-show if all terms match.
            let terms = query.split(' ').filter(t => t != '');
            $projects
                .removeClass('matched')
                .each((_, project) => {
                    let $project = $(project);
                    for (let term of terms) {
                        if ($project.data('search').indexOf(term) === -1) {
                            return;
                        }
                    }
                    $project.addClass('matched');
                });
        }

        // Show a "No results" message if nothing is matched, otherwise show the
        // first page of results and update the pagination.
        $projects.hide();
        let $matchedProjects = $projects.filter('.matched');
        if ($matchedProjects.length === 0) {
            $paginator.hide();
            $noResults.appendTo('#projects .columns');
        } else {
            $noResults.remove();
            $matchedProjects.slice(0, PAGE_SIZE).show();
            $paginator.show();
            $paginator.pagination('updateItems', $matchedProjects.length);
        }
    });

    // Clicking keywords adds them to the current search query.
    $('.keyword').click(function(e) {
        $query.val($query.val() + ' ' + $(this).text()).keyup();
    });
})(jQuery);
