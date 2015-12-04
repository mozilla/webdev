Once a month, web developers from across Mozilla get together to prepare free
SSL tickets to hand out at the Let's Encrypt SSL Kitchen. While we train
volunteers to serve hot SSL tickets to needy websites, we find time to talk
about the work that we've shipped, share the libraries we're working on, meet
new folks, and talk about whatever else is on our minds. It's the Webdev
Extravaganza! The meeting is open to the public; you should stop by!

You can check out the [wiki page][wiki] that we use to organize the meeting, or
view a [recording of the meeting][recording] in Air Mozilla. Or just read on for
a summary!

[wiki]: https://wiki.mozilla.org/Webdev/Meetings/2015/December_1
[recording]: https://air.mozilla.org/webdev-extravaganza-december-2015/

## Shipping Celebration
The shipping celebration is for anything we finished and deployed in the past
month, whether it be a brand new site, an upgrade to an existing one, or even a
release of a library.

### donate.mozilla.org Shipped!
First off was [jbuck][] with the exciting news that the rebuilt
[donate.mozilla.org][] is live and processing donations! Previously hosted by
vendor [Blue State Digital][], the new page uses [PayPal][] and [Stripe][] to
handle payments. Since launching, the new page has already processed over $1
million in donations!

[jbuck]: https://mozillians.org/en-US/u/jbuck/
[donate.mozilla.org]: https://donate.mozilla.org/
[Blue State Digital]: https://www.bluestatedigital.com/
[PayPal]: https://www.paypal.com/
[Stripe]: https://stripe.com/

### Pip 8 Hashing Support
Next was [ErikRose][], who shared the news that [pip 8][] will support hash
verification, nearly obsoleting the need for [peep][]! Exciting new features:

- New official syntax for specifying hashes
- Hexadecimal hashes for generating hashes with other programs like OpenSSL
- Hashes for wheels
- Better error messaging and unfulfilled dependency detection
- HTTP caching support

Pip 8 is expected to be released sometime in January.

[ErikRose]: https://mozillians.org/en-US/u/ErikRose/
[pip 8]: https://pip.pypa.io/
[peep]: https://github.com/erikrose/peep/

### MDN Compatibility Tables
[Shobson][] stopped by to mention that a new design for compatibility tables on
[MDN][] has been enabled for beta users on select pages. The new design is
inspired by [CanIUse][] and, in addition to being easier to read, are also
mobile-friendly. The new design is the first public feature using MDN's
in-development compatibility API.

[Shobson]: https://mozillians.org/en-US/u/stephaniehobson/
[MDN]: https://developer.mozilla.org/
[CanIUse]: http://caniuse.com/

### DXR Large File Performance Improvements
Back to ErikRose, with news of performance improvements on [DXR][] for pages
that have many links on them. After profiling, Erik found that pages that
generate many URLs spend a majority of their time building and escaping URLs
due to [Werkzeug][]'s custom URL escaping. By switching to his own hard-coded
URL generation functions, the load time on the affect pages improved 4x from
17 seconds down to 3 seconds. Hooray!

[DXR]: https://dxr.mozilla.org/
[Werkzeug]: http://werkzeug.pocoo.org/

## Roundtable
The Roundtable is the home for discussions that don't fit anywhere else.

### Starfield Charts
ErikRose shared an interesting story about trying to understand logs from
[Firefox Hello][]. The logs available to him showed anonymous sessions with
join and leave events, and dots to represent time segments where nothing
happened. After sorting these logs by length and zooming out his text editor,
Erik was able to notice patterns in the data thanks to his editor's
[anti-aliasing of the zoomed-out text][]. Hooray for poor-man's data analysis!

[Firefox Hello]: https://www.mozilla.org/en-US/firefox/hello/
[anti-aliasing of the zoomed-out text]: http://picpaste.com/pics/10_29_success_starfield_png-pexGtb7v.1449264182.png

### Sched Colorblind User Style for Stylish
Next was shobson again, with a neat little fix for colorblind people using
[Sched][], the scheduling service Mozilla uses for its workweeks. She created
a [Stylish userstyle][] that adds colored stripes to the sides of event boxes
on Sched using colors that are visually differentiable to the most common forms
of colorblindness. If you're colorblind and are having trouble using Sched,
install [Stylish][] and try the stylesheet out!

[Sched]: https://sched.org/
[Stylish userstyle]: https://gist.github.com/stephaniehobson/f0604b866e47e596c49e
[Stylish]: https://addons.mozilla.org/en-US/firefox/addon/stylish/

### Mozlando Recommended Sessions
For Mozillians planning to attend the [Mozlando][] workweek, several people
brought up recommended sessions to attend:

- [Webdev Hack Day][]: An open room for anyone to stop by and hang out with
  web developers from across the company.
- [Sgt. Rose's Lonely Coders Club BOF][]: A session for developers who work on
  projects by themselves to discuss issues specific to single-developer
  projects. All are welcome!
- [How to Become a More Senior Engineer][]: A panel run by [laura][] for
  engineers who are interested promotion and how to take the next step in their
  career.

[Mozlando]: https://wiki.mozilla.org/Coincidental_work_weeks/2015_Orlando
[Webdev Hack Day]: http://mozlando2015.sched.org/event/4lNc/webdev-hack-day
[Sgt. Rose's Lonely Coders Club BOF]: http://mozlando2015.sched.org/event/4lRI/sgt-roses-lonely-code-club-bof
[How to Become a More Senior Engineer]: http://mozlando2015.sched.org/event/4lNT/career-planning-how-to-become-a-more-senior-engineer

---

Along with the SSL Kitchen, we also volunteer at the MDN job training school
to help websites get the skills they need to follow web standards and break the
cycle of -webkit-ness for good!

If you're interested in web development at Mozilla, or want to attend next
month's Extravaganza, subscribe to the
[dev-webdev@lists.mozilla.org mailing list][mailing-list] to be notified of the
next meeting, and maybe send a message introducing yourself. We'd love to meet
you!

See you next month!

[mailing-list]: https://lists.mozilla.org/listinfo/dev-webdev
