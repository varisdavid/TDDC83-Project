from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Change to include real path
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Imports personnel database data
from server.database.personnel_db import personnel_db, Employee, Hospital, Team, Department
from server.database.access_log_db import access_log_db, AccessLog

# Imports personnel blueprints
# from server.blueprints.employee_bp import ...
from server.blueprints.patient_list_bp import patient_list_bp
from server.blueprints.access_log_bp import access_log_bp


# Register defined routes of blueprints
app.register_blueprint(patient_list_bp)
app.register_blueprint(access_log_bp)

from .cli_commands import cli

app.cli.add_command(cli)

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)
