Once a month, web developers from across the Mozilla Project get together to
design user-friendly advertisements. When we're not deciding which police alarm
we want to auto-play, we find time to talk about our side projects and drink, an
occurrence we like to call "Beer and Tell".

There's a [wiki page available][wiki] with a list of the presenters, as well as
links to their presentation materials. There's also a [recording
available][recording] courtesy of Air Mozilla.

## Erik Rose: Whitespace-significant Meta-grammar for Homoiconic Languages
The only presenter this week was [ErikRose][], who shared a prototype grammar
for a class of whitespace-significant programming languages. The goal was to
represent the nested-list structure of [homoiconic][] languages like Lisp while
keeping redundant bracing out of the way like Python.

```
if is_yak then
    shave yak
    bathe yak
  else
    do productive_work

--> (if is_yak then
        ((shave yak)
         (bathe yak))
     else
        ((do productive_work))
    )
```

Normally, when the `else` statement in code similar to the sample above isn't
indented and is at the same level as the `if` statement, the parser must know
that `else` statements may follow after `if` statements and are related to them.
To get around this, ErikRose suggests using a _partial outdent_. This way, the
parser can recognize that the `else` statement is separate from the `shave` and
`bathe` lines but should still be grouped with the `if` statement, even if the
parser doesn't know what an `if` statement is.

[Erik's gist][] contains a few more samples and a possible grammar for parsing
a language like this using [Parsimonious][], his parsing library.

[ErikRose]: https://mozillians.org/en-US/u/ErikRose/
[homoiconic]: https://en.wikipedia.org/wiki/Homoiconicity
[Erik's gist]: https://gist.github.com/erikrose/7853084a562b3bce90cf
[Parsimonious]: https://github.com/erikrose/parsimonious/

---

Our focus group of QVC customers has given us great insight in to just what the
average internet user is looking for in their sponsored content. Early
retirement, here we come!

If you're interested in attending the next Beer and Tell, sign up for the
[dev-webdev@lists.mozilla.org mailing list][mailing-list]. An email is sent out
a week beforehand with connection details. You could even add yourself to the
wiki and show off your side-project!

See you next month!

[wiki]: https://wiki.mozilla.org/Webdev/Beer_And_Tell/September_2015
[recording]: https://air.mozilla.org/webdev-beer-and-tell-september-2015/
[mailing-list]: https://lists.mozilla.org/listinfo/dev-webdev
