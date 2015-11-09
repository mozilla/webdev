Once a month, web developers from across Mozilla get together to revolutionize
layoffs. While we calculate the optimum distance away an employee should be from
their desk when they're informed of their impending doom, we find time to talk
about the work that we've shipped, share the libraries we're working on, meet
new folks, and talk about whatever else is on our minds. It's the Webdev
Extravaganza! The meeting is open to the public; you should stop by!

You can check out the [wiki page][wiki] that we use to organize the meeting, or
view a [recording of the meeting][recording] in Air Mozilla. Or just read on for
a summary!

## Shipping Celebration
The shipping celebration is for anything we finished and deployed in the past
month, whether it be a brand new site, an upgrade to an existing one, or even a
release of a library.

### Pontoon is replacing Verbatim
[Osmose][] (that's me!) started us off with the news that [Pontoon][], a
Mozilla-developed website for translating software, is going to replace
[Verbatim][], Mozilla's instance of [Pootle][], which is an externally-developed
website for translating software. Pontoon is able to do certain things that
Pootle doesn't, such as in-page translation.

Over 60% of active localization teams have voluntarily moved to Pontoon already,
and the team currently aims to have 100% of active localization to have moved
over by the first week of December.

[Osmose]: https://mozillians.org/en-US/u/Osmose/
[Pontoon]: https://pontoon.mozilla.org/
[Verbatim]: https://localize.mozilla.org/
[Pootle]: http://pootle.translatehouse.org/

### mozilla.org on Deis Update
Next was [jgmize][], who shared a small update about the previously-mentioned
move of [mozilla.org][] to [Deis][], an open-source PaaS. The site has now
fully transitioned out of the PHX1 datacenter and is split between Deis on
[AWS][] and SCL3.

[jgmize]: https://mozillians.org/en-US/u/jmize/
[mozilla.org]: https://www.mozilla.org/
[Deis]: http://deis.io/
[AWS]: https://aws.amazon.com/

## Open-source Citizenship
Here we talk about libraries we're maintaining and what, if anything, we need
help with for them.

### django-browserid 1.0.1
Last was Osmose again with the news that [django-browserid 1.0.1][] has been
released. The only changes are the addition of a universal wheel distribution
and preliminary Django 1.9 support.

[django-browserid 1.0.1]: https://github.com/mozilla/django-browserid

---

This month's excellence award went to Mythmon's "Severance Santa" plan for
holding layoffs over the holiday break.

If you're interested in web development at Mozilla, or want to attend next
month's Extravaganza, subscribe to the
[dev-webdev@lists.mozilla.org mailing list][mailing-list] to be notified of the
next meeting, and maybe send a message introducing yourself. We'd love to meet
you!

See you next month!

[wiki]: https://wiki.mozilla.org/Webdev/Meetings/2015/November_3
[recording]: https://air.mozilla.org/webdev-extravaganza-november-2015/
[mailing-list]: https://lists.mozilla.org/listinfo/dev-webdev
