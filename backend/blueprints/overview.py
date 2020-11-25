from flask import Flask, Blueprint, request, redirect, url_for, jsonify
from backend.ehr_related.fetch_patient_list import get_overview
from backend.auth import AuthError, requires_auth

overview_bp = Blueprint("overview", __name__, url_prefix="/overview")


@overview_bp.route("/", methods=["GET"])
# @requires_auth
def overview():
    overview = get_overview()
    return jsonify(overview)


@overview_bp.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response
