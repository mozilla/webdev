# Mozilla Webdev Tools and Pages

This repo serves several purposes:

1. Contains code for building and deploying the gh-pages branch behind
   http://mozilla.github.io/webdev/.
2. Contains small tools that are useful for the [Mozilla Webdev][] group.

[Mozilla Webdev]: http://mozweb.readthedocs.org/en/latest/guide/webdev.html

## Developer Setup

These steps assume you have [Node.js][] installed.

1. Clone this repo:

   ```sh
   $ git clone https://github.com/mozilla/webdev.git
   ```

2. Install dependencies:

   ```sh
   $ npm install -g gulp
   $ npm install
   ```

3. <a name="user-content-dotenv"></a>(Optional) Add your Github credentials to a `.env` file
   in the repo's root. These are used by the `build` command when downloading
   metadata from Github. For security, you should probably use a
   [Personal Access Token][] for the password and limit it to `public_repo`
   permissions only. For example:

   ```
   GITHUB_USERNAME=Osmose
   GITHUB_PASSWORD=some_personal_access_token
   ```

[Node.js]: http://nodejs.org/
[Personal Access Token]: https://github.com/settings/applications

## projects.json

`projects.json` contains a categorized list of projects the Webdev group is
responsible for. It's intended to be manually kept up-to-date and is useful for
running scripts across all Webdev projects.

## Available Gulp Commands

### `gulp serve`

Run a development server for the Github pages site on port 8000. Auto-builds the
site when anything is changed in the `src` directory.

### `gulp build`

Builds the site in the `build` directory. Runs all the HTML files through
[Nunjucks][] with the following context:

- `projects`: Object containing the parsed contents of `build/projects.json`.

The metadata added to the projects list is downloaded from the Github API and
is cached for 24 hours. The `--force` flag will force a re-download of this
data.

Note that it's very easy to hit API limits if you haven't
[added your credentials to a .env file](#user-content-dotenv).

[Nunjucks]: http://mozilla.github.io/nunjucks/

### `gulp deploy`

Build the site and commit the changes to the `gh-pages` branch, pushing them to
`origin`.

### `gulp validate_contribute_json`

Fetch [contribute.json][] files for all of the projects in `projects.json` and
validate them. Currently only supports repos hosted on Github.

[contribute.json]: https://contribute.paas.allizom.org/

## License

Licensed under the Apache 2.0 License. For details, see the `LICENSE` file.
