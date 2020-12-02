from flask import Flask, Blueprint, request, redirect, url_for, jsonify
from backend.ehr_related.fetch_patient_list import get_overview
from backend.auth import AuthError, requires_auth, _build_cors_preflight_response, _corsify_actual_response

overview_bp = Blueprint("overview", __name__, url_prefix="/overview")


@overview_bp.route("/", methods=["GET","OPTIONS"])
def overview():
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        overview = get_overview()
        return _corsify_actual_response(jsonify(overview))


@overview_bp.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response
