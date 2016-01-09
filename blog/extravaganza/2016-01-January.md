Once a month, web developers from across Mozilla get together to talk about the
work that we've shipped, share the libraries we're working on, meet new folks,
and talk about whatever else is on our minds. It's the Webdev Extravaganza! The
meeting is open to the public; you should stop by!

You can check out the [wiki page][wiki] that we use to organize the meeting, or
view a [recording of the meeting][recording] in Air Mozilla. Or just read on for
a summary!

[wiki]: https://wiki.mozilla.org/Webdev/Meetings/2016/January_5
[recording]: https://air.mozilla.org/webdev-extravaganza-january-2016/

## Shipping Celebration
The shipping celebration is for anything we finished and deployed in the past
month, whether it be a brand new site, an upgrade to an existing one, or even a
release of a library.

### Verbatim is Dead! Long Live Pontoon!
First up was [Osmose][] (that's me!), sharing the exciting news that Verbatim,
otherwise known as localize.mozilla.org, has been decommissioned and replaced by
[Pontoon][]! Verbatim was an extremely out-of-date instance of the [Pootle][]
translation software. Mozilla websites that wish to translate their content are
now encouraged to contact the [Pontoon team][] when they want to enable the L10n
community to translate their site.

[Osmose]: https://mozillians.org/en-US/u/Osmose/
[Pontoon]: https://pontoon.mozilla.org/
[Pootle]: http://pootle.translatehouse.org/
[Pontoon team]: mailto:pontoon@mozilla.org

### Mozilla.org Dual SHA1/SHA256 Certificate Negotiation
Next was [jgmize][] with info about [www.mozilla.org][]'s recent work around
enabling both SHA1 and SHA256 certificates to be used on the site. Firefox is
[phasing out support for SHA1 certificates][] along with the other major
browsers, but users on older browsers need to be able to download new versions
of Firefox from www.mozilla.org. Some of these older versions are from before
browsers supported SHA256 certificates. In order to avoid leaving these users
stuck without a way to get a modern browser, www.mozilla.org needs to be able to
fall back to SHA1 certificates when necessary.

Happily, www.mozilla.org is now correctly using a SHA256 certificate and falling
back to a SHA1 certificate for users whose browser does not support SHA256
certificates, thanks to our [CloudFlare][] CDN.

[jgmize]: https://mozillians.org/en-US/u/jmize/
[www.mozilla.org]: https://www.mozilla.org/en-US/
[phasing out support for SHA1 certificates]: https://blog.mozilla.org/security/2015/10/20/continuing-to-phase-out-sha-1-certificates/
[CloudFlare]: https://www.cloudflare.com/

### Peep Now Compatible with Pip 7
[ErikRose][] shared the welcome news that [Peep][], the wrapper for [Pip][] that
supports hash verification of downloaded dependencies, now supports Pip 7
correctly! He also reminded us that pip 8 will obsolete Peep as it will have
hash verification built-in.

[ErikRose]: https://mozillians.org/en-US/u/ErikRose/
[Peep]: https://github.com/erikrose/peep/
[Pip]: https://pip.pypa.io/en/stable/

### Web App Developer Initiative Sites
Next was [bwalker][] with a list of websites and tools that the Web App
Developer Initiative team shipped in the last quarter:

- [Firefox Platform Status][]: A tool reporting on the roadmap and status of
  support in Firefox for new and upcoming web platform features.
- [Oghliner][]: A [Node.js][]-based tool for deploying offline web apps to
  Github Pages.
- [ServiceWorker Cookbook][]: A collection of working, practical examples of
  using [ServiceWorkers][] in modern web apps.

[bwalker]: https://mozillians.org/en-US/u/bwalker/
[Firefox Platform Status]: https://platform-status.mozilla.org/
[Oghliner]: https://mozilla.github.io/oghliner/
[Node.js]: https://nodejs.org/en/
[ServiceWorker Cookbook]: https://serviceworke.rs/
[ServiceWorkers]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

### DXR Updates
ErikRose shared a slew of [DXR][] updates:

- Recognizing overrides of virtual methods
- Recognizing multiple directly overridden virtual methods
- The ability to index [Cargo][] packages
- Not offering sub/superclass search when none exist

Thanks to [Tom Klein][] and [Nick Cameron][] for these updates!

[DXR]: https://dxr.mozilla.org/
[Cargo]: https://crates.io/
[Tom Klein]: https://github.com/kleintom
[Nick Cameron]: https://github.com/nrc

## Open-source Citizenship
Here we talk about libraries we're maintaining and what, if anything, we need
help with for them.

### Product-Details Supports Python 2 and 3 and Django 1.9
[Pmac][] shared the news that [django-mozilla-product-details][] now supports
Python 2 and 3 simultaneously, as well as supporting Django 1.9. He also shared
the slightly-older news that the library supports optionally storing the data in
the database instead of the filesystem.

[Pmac]: https://mozillians.org/en-US/u/pmac/
[django-mozilla-product-details]: https://github.com/mozilla/django-product-details

## New Hires / Interns / Volunteers / Contributors
Here we introduce any newcomers to the Webdev group, including new employees,
interns, volunteers, or any other form of contributor.

- [jpetto][] is switching from a contractor to a full-time web developer on the
  Engagement Web Development team!
- [davidwalsh][] is moving to the Web App Developer Initiative team!
- Osmose is moving to the Support Engineering team working on [Input][],
  [SUMO][], and other projects!

[jpetto]: https://github.com/jpetto
[davidwalsh]: https://github.com/darkwing
[Input]: https://input.mozilla.org/en-US/
[SUMO]: https://support.mozilla.org/en-US/

## Roundtable
The Roundtable is the home for discussions that don't fit anywhere else.

### Docker Practices for Development
ErikRose closed us out with a few tips for using [Docker][] for developing a
website:

- [Store your virtualenv on a data volume](https://github.com/mozilla/dxr/blob/master/tooling/docker/docker-compose.yml#L19-L22)
- [Create virtualenvs using a Makefile](https://github.com/mozilla/dxr/blob/master/makefile#L76-L81)
- [Add a Makefile target for interactive debugging](https://github.com/mozilla/dxr/blob/master/makefile#L44-L50)

[Docker]: https://www.docker.com/

---

If you're interested in web development at Mozilla, or want to attend next
month's Extravaganza, subscribe to the
[dev-webdev@lists.mozilla.org mailing list][mailing-list] to be notified of the
next meeting, and maybe send a message introducing yourself. We'd love to meet
you!

See you next month!

[mailing-list]: https://lists.mozilla.org/listinfo/dev-webdev
