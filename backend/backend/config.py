import os


class Config(object):
    SECRET_KEY = "supersecretkey"
    SQLALCHEMY_DATABASE_URI = "sqlite:///app.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    AUTH0_DOMAIN = "https://dev-mlj1m1lm.eu.auth0.com/"
    ALGORITHMS = ["RS256"]
    APPLICATION_ROOT = "/api" # Possible solve for prefix /api of all endpoints
    API_AUDIENCE = "https://tddc88-company-3-2020.kubernetes-public.it.liu.se/api"
    DEBUG = False

