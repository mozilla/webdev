import itertools
import json
from collections import namedtuple
from urlparse import urlparse

import jsonschema
import requests
from blessings import Terminal
from fabric.api import task
from progress.bar import Bar


CONTRIBUTE_JSON_URL = 'https://raw.githubusercontent.com/{user}/{repo}/master/contribute.json'
CONTRIBUTE_JSON_SCHEMA = 'https://raw.githubusercontent.com/mozilla/contribute.json/master/schema.json'


Project = namedtuple('Project', ['name', 'repos', 'see_also'])
default_project = Project(name='', repos=[], see_also=[])


def get_categories():
    with open('projects.json', 'r') as f:
        categories = json.loads(f.read())
        for category, projects in categories.items():
            categories[category] = [default_project._replace(**project) for project in projects]
    return categories


def get_projects():
    return itertools.chain(*get_categories().values())


def get_schema():
    # TODO: Handle failed request.
    return json.loads(requests.get(CONTRIBUTE_JSON_SCHEMA).text)


@task
def validate_contribute_json():
    t = Terminal()
    schema = get_schema()

    get_name = lambda p: p.name
    projects = sorted(get_projects(), key=get_name)
    passed, failed, skipped = [], [], []
    for project in Bar('Validating').iter(projects):
        if not project.repos:
            reason = 'No repos found'
            skipped.append((project, reason))
            continue

        # TODO: Handle non-github projects
        for repo in project.repos:
            if repo.startswith('https://github.com'):
                parsed = urlparse(repo)
                user, repo_name = parsed.path.strip('/').split('/')
                url = CONTRIBUTE_JSON_URL.format(user=user, repo=repo_name)

                response = requests.get(url)
                if response.status_code != requests.codes.ok:
                    reason = 'No contribute.json: {0}'.format(response.status_code)
                    failed.append((project, reason))
                    continue

                contribute_json = json.loads(response.text)
                try:
                    jsonschema.validate(contribute_json, schema)
                    passed.append(project)
                except jsonschema.ValidationError as e:
                    reason = 'Invalid contribute.json: {0}'.format(e.message)
                    failed.append((project, reason))

    print t.bright_green('== Passed ==')
    for project in passed:
        print '  ' + t.underline(project.name)

    print t.bright_red('== Failed ==')
    for project, reason in failed:
        print '  {0}\n    {1}'.format(t.underline(project.name), reason)

    print t.bright_yellow('== Skipped ==')
    for project, reason in skipped:
        print '  {0}\n    {1}'.format(t.underline(project.name), reason)
