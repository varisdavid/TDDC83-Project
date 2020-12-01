from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .config import Config

db = SQLAlchemy()


def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_object("backend.config.Config")

    db.init_app(app)

    from .blueprints.access_log import access_log_bp
    from .blueprints.department import department_bp
    from .blueprints.diagnosis import diagnosis_bp
    from .blueprints.employee import employee_bp
    from .blueprints.hospital import hospital_bp
    from .blueprints.measurements import measurements_bp
    from .blueprints.medication_list import medication_list_bp
    from .blueprints.overview import overview_bp
    from .blueprints.patients import patients_bp
    from .blueprints.team import team_bp
    from .blueprints.customizedView import customizedView_bp
    from .blueprints.customizedViewDiagnosis import customizedViewDiagnosis_bp
    from .blueprints.priorityRule import priorityRule_bp


    app.register_blueprint(access_log_bp)
    app.register_blueprint(department_bp)
    app.register_blueprint(employee_bp)
    app.register_blueprint(hospital_bp)
    app.register_blueprint(measurements_bp)
    app.register_blueprint(medication_list_bp)
    app.register_blueprint(overview_bp)
    app.register_blueprint(patients_bp)
    app.register_blueprint(team_bp)
    app.register_blueprint(customizedView)
    app.register_blueprint(customizedViewDiagnosis)
    app.register_blueprint(priorityRule_bp)

    from .cli_commands import cli

    app.cli.add_command(cli)

    return app
