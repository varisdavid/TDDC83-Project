from flask import Flask, current_app
from flask.cli import AppGroup

from datetime import datetime
from backend import db


cli = AppGroup("cli")


@cli.command("seedDB")
def seedDB():

    db.session.commit()

    print("done")


@cli.command("resetDB")
def resetDB():
    db.drop_all()
    db.create_all()
    print("done")
