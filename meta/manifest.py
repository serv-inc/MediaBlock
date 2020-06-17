#!/usr/bin/env python3
import datetime
import json
import time
import os

import git

FILE = "addon/manifest.json"
SLEEP_SEC = os.environ.get("SLEEP_SEC", 10)


def tag():
    """current tag"""
    tag = git.Repo().tags[-1]
    return str(tag)


def now():
    current = datetime.datetime.now()
    return "{}.{}.{}".format(current.hour, current.minute, current.second)


def set_manifest_version(value):
    with open(FILE) as f:
        manifest = json.load(f)
    manifest["version"] = value
    print(manifest["version"])
    with open(FILE, "w") as f:
        json.dump(manifest, f, indent=2)


while True:
    try:
        set_manifest_version(now())
        time.sleep(SLEEP_SEC)
    except KeyboardInterrupt:
        set_manifest_version(tag())
        break
