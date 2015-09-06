Once a month, web developers from across Mozilla get together to to work on our
containerization startup. While we buy up the latest stock of Tupperware, we
find time to talk about the work that we've shipped, share the libraries we're
working on, meet new folks, and talk about whatever else is on our minds. It's
the Webdev Extravaganza! The meeting is open to the public; you should stop by!

You can check out the [wiki page][wiki] that we use to organize the meeting, or
view a [recording of the meeting][recording] in Air Mozilla. Or just read on for
a summary!

## Shipping Celebration
The shipping celebration is for anything we finished and deployed in the past
month, whether it be a brand new site, an upgrade to an existing one, or even a
release of a library.

### Pontoon
[Pontoon][] is a tool for translating Mozilla software. This past month saw
several changes ship, including a brand new sync process that is up to 80%
faster than the old sync process. Other changes include a new listing page for
locale teams, a 50% speedup on the translation view, several new locales, and
several visual improvements.

[Pontoon]: https://pontoon.mozilla.org/

### Crash-Stats Faster Loading
[Crash-Stats][] is a service for analyzing crash reports from various Mozilla
products. This month they shipped more aggressive cache headers for static
assets, as well as Gzip compression for JavaScript, CSS, and HTML files. The
result was a [25% improvement in load time][speed-blog-post]! Further
improvements are planned to reduce the time-to-first-byte.

[Crash-Stats]: https://crash-stats.mozilla.com/
[speed-blog-post]: http://www.peterbe.com/plog/crash-stats-faster

### DXR 2.0
[DXR][] is a code search and navigation tool for Mozilla (and other) projects.
DXR 2.0 has been in development for a long time and has shipped at last! The new
version comes with a host of updates, including:

- Support for C++ and Rust, as well as limited Python and XPDIL support
- Parallel, clustered indexing
- Binary file and image browsing
- [Plugin-based architecture][]
- And more!

[DXR]: https://dxr.mozilla.org/
[Plugin-based architecture]: https://dxr.readthedocs.org/en/es/development.html#writing-plugins

## Open-source Citizenship
Here we talk about libraries we're maintaining and what, if anything, we need
help with for them.

### Optisorl
[Peterbe][] shared a library he created called [optisorl][]. It is a pluggable
backend for [sorl-thumbnail][] that optimizes thumbnails using [pngquant][],
[gifsicle][], and, coming soon, [mozjpeg][] for optimizing the generated
thumbnails.

[Peterbe]: https://mozillians.org/en-US/u/peterbe/
[optisorl]: https://github.com/peterbe/optisorl
[sorl-thumbnail]: https://github.com/mariocesar/sorl-thumbnail
[pngquant]: https://pngquant.org/
[gifsicle]: http://www.lcdf.org/gifsicle/
[mozjpeg]: https://github.com/mozilla/mozjpeg

## Roundtable
The Roundtable is the home for discussions that don't fit anywhere else.

### Hacks Blog Redesign
[Potch][] informed us of his in-progress redesign of the [Hacks blog][]. A
[demo of his progress is available][hax-demo] and he is looking for feedback.
Check it out! Tell him how you feel about it!

[Potch]: https://mozillians.org/en-US/u/potch/
[Hacks blog]: https://hacks.mozilla.org/
[hax-demo]: http://testmozilla.wpengine.com/hacks/

---

If you sign up in the next month, you get a free upgrade to Rubbermaid-brand
containers! As always, our compute instances are delivered straight to your door
and are always fresh, never frozen.

If you're interested in web development at Mozilla, or want to attend next
month's Extravaganza, subscribe to the
[dev-webdev@lists.mozilla.org mailing list][mailing-list] to be notified of the
next meeting, and maybe send a message introducing yourself. We'd love to meet
you!

See you next month!

[wiki]: https://wiki.mozilla.org/Webdev/Meetings/2015/September_1
[recording]: https://air.mozilla.org/webdev-extravaganza-september-2015/
[mailing-list]: https://lists.mozilla.org/listinfo/dev-webdev
