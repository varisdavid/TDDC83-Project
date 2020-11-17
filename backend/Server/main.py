from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

from personnel_database import db, Employee, Hospital, Department, Team
from blueprints import employee

app.register_blueprint(employee.bp)


if __name__ == "__main__":
    app.run(debug=True)

