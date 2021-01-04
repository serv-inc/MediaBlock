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


def validate():
    """versions need to be the same"""
    changelog_version = _from_changelog()
    manifest_version = json.load(open("addon/manifest.json"))["version"]
    package_version = json.load(open("package.json"))["version"]
    package_lock_version = json.load(open("package-lock.json"))["version"]

    assert (
        changelog_version == manifest_version
    ), "changelog version ({}) and manifest version ({}) differ".format(
        changelog_version, manifest_version
    )
    assert (
        package_version == manifest_version
    ), "package version ({}) and manifest version ({}) differ".format(
        package_version, manifest_version
    )
    assert (
        package_lock_version == manifest_version
    ), "package-lock version ({}) differs from manifest and package version ({}) differ".format(
        package_lock_version, manifest_version
    )


if __name__ == "__main__":
    validate()
