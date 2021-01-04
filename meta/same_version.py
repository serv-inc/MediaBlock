#! /usr/bin/env python3
"""compares versions of
- package.json,
- package lock file,
- addon manifest"""

import json


def _from_changelog():
    for line in open("CHANGELOG.org"):
        if line.startswith("** "):
            break
    return line[3:].replace("\n", "")


def _compare(firstname, first, secondname, second):
    """compare two entries"""
    assert first == second, "{} version ({}) and {} version ({}) differ".format(
        firstname, first, secondname, second
    )


def validate():
    """versions need to be the same"""
    changelog_version = _from_changelog()
    manifest_version = json.load(open("addon/manifest.json"))["version"]
    package_version = json.load(open("package.json"))["version"]
    package_lock_version = json.load(open("package-lock.json"))["version"]

    _compare("changelog", changelog_version, manifest_version, "manifest")
    _compare("changelog", changelog_version, package_version, "package")
    _compare("changelog", changelog_version, package_lock_version, "package lock")


if __name__ == "__main__":
    validate()
