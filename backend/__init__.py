from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .config import Config

db = SQLAlchemy()


def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_object("backend.config.Config")

    db.init_app(app)

    from .blueprints.access_log_bp import access_log_bp
    from .blueprints.patient_list_bp import patient_list_bp
    from .blueprints.medication_list_bp import medication_list_bp
    from .blueprints.overview_bp import overview_bp
    # from .blueprints.employee_bp import employee_bp

    app.register_blueprint(patient_list_bp)
    app.register_blueprint(access_log_bp)

    app.register_blueprint(overview_bp)
    app.register_blueprint(medication_list_bp)
    # app.register_blueprint(employee_bp)

    from .cli_commands import cli

    app.cli.add_command(cli)

    return app

