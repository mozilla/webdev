Once a month, web developers from across the Mozilla Project get together to
design programming languages that are intentionally difficult to reason about.
While we advanced the state-of-the-art in side effects, we find time to talk
about our side projects and drink, an occurrence we like to call
"Beer and Tell".

There's a [wiki page available][wiki] with a list of the presenters, as well as
links to their presentation materials. There's also a [recording
available][recording] courtesy of Air Mozilla.

## Peterbe: Headsupper.io
[Peterbe][] [started us off][] with [headsupper.io][], a service that sends
notification emails when you commit to a GitHub project with a specific keyword
in your commit message. The service is registered as a Github webhook, and you
can configure the service to only send emails on new tags if you so desire.

[Peterbe]: https://mozillians.org/en-US/u/peterbe/
[started us off]: https://air.mozilla.org/webdev-beer-and-tell-november-2015/#@26s
[headsupper.io]: https://headsupper.io/

## Osmose: Advanced Open File (Round 2)
Next up was [Osmose][] (that's me!), with an [Atom][] package for opening files
called [Advanced Open File][]. Advanced Open File adds a convenient modal dialog
for finding files to open or create that aims to replace use of the system file
dialog. Previously featured on Beer and Tell, today's update included news of
a rewrite in ES2015 using [Babel][], test coverage, Windows path fixes, and
more!

[Osmose]: https://mozillians.org/en-US/u/Osmose/
[Atom]: https://atom.io/
[Advanced Open File]: https://atom.io/packages/advanced-open-file
[Babel]: http://babeljs.io/

## Kumar: React + Redux Live Reload
[Kumar][] shared a demo of an impressive [React][] and [Redux][] development
setup that includes live-reloading of the app as the code changes, as well as
a detailed view of the state changes happening in the app and the ability to
walk through the history of state changes to debug your app. The tools even
replay state changes after live-reloading for an impressively short feedback
loop during development.

[Kumar]: https://mozillians.org/en-US/u/kumar/
[React]: https://facebook.github.io/react/
[Redux]: http://redux.js.org/

## Bwalker: ebird-mybird
[Bwalker][] was next with a site called [ebird-mybird][]. [eBird][] is a bird
observation checklist that bird watchers can use to track their observations.
ebird-mybird reads in a CSV file exported from eBird and displays the data in
various useful forms on a static site, including aggregate sightings by
year/month  and sightings categorized by species, location, and date.

The site itself is a frontend app that uses [C3][] for generating charts,
[PapaParse][] for parsing the CSV files, and [Handlebars][] for templating.

[Bwalker]: https://mozillians.org/en-US/u/bwalker/
[ebird-mybird]: https://wfwalker.github.io/ebird-mybird/
[eBird]: http://ebird.org/
[C3]: http://c3js.org/
[PapaParse]: http://papaparse.com/
[Handlebars]: http://handlebarsjs.com/

## Potch: Pseudorandom Number Generator
Last up was [Potch][] with a small experiment in generating pseudorandom numbers
in JavaScript. Inspired by a blog post about [issues with Math.random in V8][],
Potch create a very simple [Codepen that draws on a canvas][] based on
custom-generated random numbers.

If you need sound random number generation, the blog post recommends
[crypto.randomBytes][], also included in the Node standard library.

[Potch]: https://mozillians.org/en-US/u/potch/
[issues with Math.random in V8]: https://medium.com/@betable/tifu-by-using-math-random-f1c308c4fd9d
[Codepen that draws on a canvas]: http://codepen.io/potch/pen/WQWjbb
[crypto.randomBytes]: https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback

---

This week's result was a programming language composed entirely of pop culture
references, including a time-sensitive compiler that assigns optimization levels
based on how current your references are.

If you're interested in attending the next Beer and Tell, sign up for the
[dev-webdev@lists.mozilla.org mailing list][mailing-list]. An email is sent out
a week beforehand with connection details. You could even add yourself to the
wiki and show off your side-project!

See you next month!

[wiki]: https://wiki.mozilla.org/Webdev/Beer_And_Tell/November_2015
[recording]: https://air.mozilla.org/webdev-beer-and-tell-november-2015/
[mailing-list]: https://lists.mozilla.org/listinfo/dev-webdev
