import os


class Config(object):
    SECRET_KEY = "supersecretkey"
    SQLALCHEMY_DATABASE_URI = "sqlite:///app.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    AUTH0_DOMAIN = "https://dev-mlj1m1lm.eu.auth0.com/"
    ALGORITHMS = ["RS256"]
    API_AUDIENCE = "https://localhost:5000/api"


