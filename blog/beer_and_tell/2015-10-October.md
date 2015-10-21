Once a month, web developers from across the Mozilla Project get together to
forge Bitcoins. While we magnetize needles for carving out our counterfeit bits
directly on hard drive platters, we find time to talk about our side projects
and drink, an occurrence we like to call "Beer and Tell".

There's a [wiki page available][wiki] with a list of the presenters, as well as
links to their presentation materials. There's also a [recording
available][recording] courtesy of Air Mozilla.

## ErikRose: Rubik's Magic Cube
First up was [ErikRose][], who talked about the process of learning how to solve
a [Rubik's Cube][] and how it affected his thinking. The learning process
mirrored that of learning a language: first, you only see the cube as a block
of individual colors, but as you progress you start to recognize specific cubes
and arrangements of cubes as "words", and eventually you become able to
recognize abstract patterns of cubes relative to each other.

Check out the recording for a detailed walk through part of the cube-solving
process!

[ErikRose]: https://mozillians.org/en-US/u/ErikRose/
[Rubik's Cube]: https://en.wikipedia.org/wiki/Rubik's_Cube

## Mythmon: N-Bodies Simulation in Rust
Next was [Mythmon][], who shared a [physics simulation][] of bodies floating in
space being affected by gravity. The simulation was written in [Rust][] and
relies on [Piston][] for drawing graphics to the screen.

[Mythmon]: https://mozillians.org/en-US/u/mythmon/
[physics simulation]: http://github.com/mythmon/rust-nbodies
[Rust]: https://www.rust-lang.org/
[Piston]: https://github.com/PistonDevelopers/piston

## Potch: Canvas Blur
[Potch][] was next with a [demo][] of performing a [Gaussian blur][] on a canvas
in JavaScript. Branching off some experiments around auto-cropping algorithms,
Potch's demo processes the blur in chunks and produces results that are
comparable to blurs produced in Photoshop, albeit much slower and with less
sampling for the blur. While not intended to actually be used for anything,
future improvements include using [Web Workers][] to process the blur
asynchronously and in parallel, as well as performing other convolutions besides
blurring.

[Potch]: https://mozillians.org/en-US/u/potch/
[demo]: http://output.jsbin.com/qomixa/1
[Gaussian blur]: https://en.wikipedia.org/wiki/Gaussian_blur
[Web Workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers

## BWalker: ASCII Art Dashboard
Last up was [bwalker][], who demoed an [ASCII art dashboard] powered by
[blessed-contrib][]. The library provides the ability to make console-based
dashboards with widgets for line graphs, bar charts, tables, and even a world
map. This particular demo pulled some statistics from Github as well as graphing
randomly generated numbers.

[bwalker]: https://mozillians.org/en-US/u/bwalker/
[ASCII art dashboard]: https://github.com/wfwalker/wadi-blessed-dashboard
[blessed-contrib]: https://github.com/yaronn/blessed-contrib

---

The highlight of this week's meetup was lonnen's impressive feat of
creating 5 bitcoins on a flash drive using only a lighter and a
chiropractic activator.

If you're interested in attending the next Beer and Tell, sign up for the
[dev-webdev@lists.mozilla.org mailing list][mailing-list]. An email is sent out
a week beforehand with connection details. You could even add yourself to the
wiki and show off your side-project!

See you next month!

[wiki]: https://wiki.mozilla.org/Webdev/Beer_And_Tell/October_2015
[recording]: https://air.mozilla.org/webdev-beer-and-tell-october-2015/
[mailing-list]: https://lists.mozilla.org/listinfo/dev-webdev
