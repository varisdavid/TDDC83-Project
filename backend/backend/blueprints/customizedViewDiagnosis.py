from flask import Blueprint, request, jsonify, Response

# You can import the database from a blueprint
from backend.database.models import CustomizedViewDiagnosis

from backend.auth import _build_cors_preflight_response, _corsify_actual_response

# Creates Blueprint
customizedViewDiagnosis_bp = Blueprint("customizedViewDiagnosis", __name__, url_prefix="/CustomizedViewDiagnosis")

# Route for fetching all diagnoses in a specific customized view
@customizedViewDiagnosis_bp.route("/<string:customizedViewID>", methods=["GET", "OPTIONS"])
def customizedViewDiagnosis(customizedViewID):
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        diagnosisList = CustomizedViewDiagnosis.query.filter_by(customizedViewID = customizedViewID)
        serializedDiagnosisList = []
        for i in range(len(diagnosisList)):
            DiagnosisList[i] = CustomizedViewDiagnosis.serialize(diagnosisList[i])
            serializedDiagnosisList.append(diagnosisList[i])
        return _corsify_actual_response(jsonify(serializedDiagnosisList)))
