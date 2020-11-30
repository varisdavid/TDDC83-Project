from flask import Blueprint, request, jsonify, Response

# You can import the database from a blueprint
from backend.database.models import CustomizedView

from backend.auth import _build_cors_preflight_response, _corsify_actual_response

# Creates Blueprint
customizedView_bp = Blueprint("customizedView", __name__, url_prefix="/CustomizedView")

# Route for fetching all available/selectable customized views
@customizedView_bp.route("/all", methods=["GET", "OPTIONS"])
def customizedView(viewID):
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        viewList = CustomizedView.query.all()
        serializedViewList = []
        for i in range(len(viewList)):
            viewList[i] = CustomizedView.serialize(viewList[i]) #returns all variables, change to just id/name?
            serializedViewList.append(viewList[i])
        return _corsify_actual_response(jsonify(serializedViewList)))

# Route for fetching specific customized view
@customizedView_bp.route("/<string:customizedViewID>", methods=["GET", "OPTIONS"])
def customizedView(customizedViewID):
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        customizedView = CustomizedView.query.filter_by(id=customizedViewID).first_or_404()
        return _corsify_actual_response(jsonify(customizedView.serialize(customizedView)))
