Once a month, web developers from across Mozilla get together to see who can
score the highest car emissions rating. While we scour the world for dangerous
combustibles, we find time to talk about the work that we've shipped, share the
libraries we're working on, meet new folks, and talk about whatever else is on
our minds. It's the Webdev Extravaganza! The meeting is open to the public; you
should stop by!

You can check out the [wiki page][wiki] that we use to organize the meeting, or
view a [recording of the meeting][recording] in Air Mozilla. Or just read on for
a summary!

## Shipping Celebration
The shipping celebration is for anything we finished and deployed in the past
month, whether it be a brand new site, an upgrade to an existing one, or even a
release of a library.

### One and Done on Heroku
First up was [bsilverberg][] with the news that [One and Done][], Mozilla's
contributor task board, has successfully migrated from the Mozilla-hosted
[Stackato][] PAAS to [Heroku][]. One and Done takes advantage of a few
interesting features of Heroku, such as [App Pipelines][] and [Review Apps][].

[bsilverberg]: https://github.com/bobsilverberg
[One and Done]: https://oneanddone.mozilla.org/
[Stackato]: http://stackato.com
[Heroku]: https://www.heroku.com/
[App Pipelines]: https://devcenter.heroku.com/articles/pipelines
[Review Apps]: https://devcenter.heroku.com/articles/github-integration-review-apps

### Pontoon Sync Improvements and New Leaderboards
Next was [Osmose][] (that's me!) sharing a few new features on [Pontoon][], a
site for submitting translations for Mozilla software:

- [mathjazz][] added a new "Latest Activity" column to [project][] and
  [locale][] listings.
- [jotes][] added time-based filters to the [leaderboard][] as well as several
  performance improvements to the page.
- I added `inc` file support to the new sync process, as well as a few other
  fixes such that all Pontoon projects are now using the new sync. Yay!

[Osmose]: https://mozillians.org/en-US/u/Osmose/
[Pontoon]: https://pontoon.mozilla.org/
[mathjazz]: https://mozillians.org/en-US/u/mathjazz/
[project]: https://pontoon.mozilla.org/projects/
[locale]: https://pontoon.mozilla.org/teams/
[jotes]: https://mozillians.org/en-US/u/jotes/
[leaderboard]: https://pontoon.mozilla.org/contributors/

### Air Mozilla iTunes Video Podcast
[Peterbe][] stopped by to share the news that [Air Mozilla][] now has an
iTunes-compatible [podcast feed][] for all of its videos. The feed has already
been approved by Apple and is available on the iTunes Store.

[Peterbe]: https://mozillians.org/en-US/u/peterbe/
[Air Mozilla]: https://air.mozilla.org/
[podcast feed]: https://air.mozilla.org/feed/itunes/

### DXR Static File Cachebusting
[ErikRose][] shared the news that [DXR][] now adds hashes to static file
filenames so that updates to the static files don't get messed up by an old
local cache. Interestingly, instead of relying on popular tools like [Grunt][]
or [Webpack][], Erik opted to implement the hashing using some logic in a
Makefile plus a little bit of Python. You can [check out the pull request][] to
see the details of the change.

[ErikRose]: https://mozillians.org/en-US/u/ErikRose/
[DXR]: https://dxr.mozilla.org/
[Grunt]: http://gruntjs.com/
[Webpack]: https://webpack.github.io/
[check out the pull request]: https://github.com/mozilla/dxr/pull/470

### Replacing localForage with localStorage
Next we went back to Peterbe, who recently replaced [localForage][], a library
that abstracts several different methods of storing data locally in the browser,
with [localStorage][], the blocking, built-in storage solution that ships with
browsers. He also shared a [blog post][] that showed that not only is
localStorage simpler to use, it was actually faster in his specific use case.

[localForage]: https://github.com/mozilla/localForage
[localStorage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[blog post]: http://www.peterbe.com/plog/localstorage-is-fast

### Mozilla.org Hosted on Deis
Next was [jgmize][] sharing the news that [mozilla.org][] is now hosted on a
[Deis][] cluster. Currently a small amount of production data is being hosted by
the cluster, but a larger rollout is planned for the near future. [Giorgos][] is
responsible for the entire [Jenkins][] setup, including a neat
[deployment pipeline][] display, an [Ansible playbook][], and the
[deployment pipeline scripts][]. [Pmac][] ported over hundreds of [Apache][]
redirects to Python and wrote a comprehensive set of [tests][] for them as well.

[jgmize]: https://mozillians.org/en-US/u/jmize/
[mozilla.org]: https://www.mozilla.org/
[Deis]: http://deis.io/
[Giorgos]: https://mozillians.org/en-US/u/giorgos/
[pmac]: https://mozillians.org/en-US/u/pmac/
[Jenkins]: https://jenkins-ci.org/
[deployment pipeline]: https://wiki.jenkins-ci.org/display/JENKINS/Delivery+Pipeline+Plugin
[Ansible playbook]: https://github.com/mozilla/ee-infra-jenkins
[deployment pipeline scripts]: https://github.com/mozilla/bedrock/tree/e33267437606c3d849e1306000921f353ba0a50a/docker/jenkins
[Apache]: https://httpd.apache.org/
[tests]: https://github.com/mozilla/bedrock/tree/e33267437606c3d849e1306000921f353ba0a50a/test_redirects

## Roundtable
The Roundtable is the home for discussions that don't fit anywhere else.

### Farewell to Wenzel
Lastly, I wanted to specifically call out [wenzel][], whose last day as a paid
contributor for Mozilla was last Friday. Wenzel has been a Mozillian for 9
years, starting as an intern. He's contributed to almost every major Mozilla web
property, and will be missed.

[wenzel]: https://github.com/fwenzel

---

This month's winner was willkg, with an impressive 200% rating, generating more
pollution than the fuel he put in. Local science expert Dr. Potch of Mr. Potch's
Questionable Ethics and Payday Loan Barn was quoted as saying that willkg's
score was "possible".

If you're interested in web development at Mozilla, or want to attend next
month's Extravaganza, subscribe to the
[dev-webdev@lists.mozilla.org mailing list][mailing-list] to be notified of the
next meeting, and maybe send a message introducing yourself. We'd love to meet
you!

See you next month!

[wiki]: https://wiki.mozilla.org/Webdev/Meetings/2015/October_6
[recording]: https://air.mozilla.org/webdev-extravaganza-october-2015/
[mailing-list]: https://lists.mozilla.org/listinfo/dev-webdev
