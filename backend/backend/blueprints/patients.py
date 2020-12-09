from flask import Flask, Blueprint, request, redirect, url_for, jsonify
from backend.ehr_related.fetch_patient_list import get_all_patients_personal_details
from backend.auth import AuthError, requires_auth

from backend.auth import _build_cors_preflight_response, _corsify_actual_response


# Creates Blueprint
patients_bp = Blueprint("patients", __name__, url_prefix="/api/patients")


@patients_bp.route("/all", methods=["GET", "OPTIONS"])
# @requires_auth
def patient_list():
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        patient_list = get_all_patients_personal_details()
        return _corsify_actual_response(jsonify(patient_list))


@patients_bp.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response
