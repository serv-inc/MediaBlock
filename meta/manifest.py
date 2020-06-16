#! /usr/bin/env python3
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


def version():
    return "{}.{}.{}".format(current.hour, current.minute, current.second)


while True:
    with open(FILE) as f:
        manifest = json.load(f)
    current = datetime.datetime.now()
    manifest["version"] = version()
    print(manifest["version"])
    with open(FILE, "w") as f:
        json.dump(manifest, f, indent=2)
    time.sleep(SLEEP_SEC)
