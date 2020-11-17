from flask import Flask, Blueprint, request, redirect, url_for, jsonify
from backend.ehr_related.fetch_patient_list import get_all_patients_personal_details
from backend.auth import AuthError, requires_auth

patient_list_bp = Blueprint("patient_list", __name__)


@patient_list_bp.route("/api/patientlist", methods=["GET"])
@requires_auth
def patient_list():
    patient_list = get_all_patients_personal_details()
    return jsonify(patient_list)


@patient_list_bp.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response
