#! /usr/bin/env python3
"""compares versions of package.json and addon manifest"""
import json


def validate():
    """versions need to be the same"""
    package_version = json.load(open("package.json"))["version"]
    manifest_version = json.load(open("addon/manifest.json"))["version"]
    assert (
        package_version == manifest_version
    ), "package version ({}) and manifest version ({}) differ".format(
        package_version, manifest_version
    )


if __name__ == "__main__":
    validate()
