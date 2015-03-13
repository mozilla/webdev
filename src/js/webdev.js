;(function($) {
    'use strict';

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
})(jQuery);
