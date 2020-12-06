from flask import Blueprint, request, jsonify, Response

# You can import the database from a blueprint
from backend.database.models import PriorityRule

from backend.auth import _build_cors_preflight_response, _corsify_actual_response

# Creates Blueprint
priorityRule_bp = Blueprint("priorityRule", __name__, url_prefix="/api/priorityRule")

# Route for fetching priority rules for specific operation
@priorityRule_bp.route("/<string:ruleID>", methods=["GET", "OPTIONS"])
def priorityRules(ruleID):
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        priorityRules = priorityRule.query.filter_by(id=ruleID).first_or_404()
        return _corsify_actual_response(jsonify(PriorityRule.serialize(priorityRules)))
