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
    $projects.slice(PAGE_SIZE).hide();

    let $paginator = $('<div></div>');
    $('#projects').append($paginator);
    $paginator.pagination({
        items: $projects.length,
        itemsOnPage: PAGE_SIZE,
        onPageClick: page => {
            let sliceStart = (page - 1) * PAGE_SIZE;
            $projects.hide();
            $projects.slice(sliceStart, sliceStart + PAGE_SIZE).show();
        },
    });
})(jQuery);
