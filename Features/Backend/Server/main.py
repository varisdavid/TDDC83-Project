from flask import Flask
from flask_sqlalchemy import SQLAlchemy

#Change to include real path
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#WIP
#Imports database data
from server.database import db, Employee, Team, Department

#Imports blueprints
#from server.blueprints import pers_data ...

#Register defined routes of blueprints
#app.register_blueprint(pers_data.bp)