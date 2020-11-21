from flask import Flask, Blueprint, request, redirect, url_for, jsonify
from backend.ehr_related.fetch_patient_list import get_medications
from backend.auth import AuthError, requires_auth

medication_list_bp = Blueprint("medication_list", __name__)


@medication_list_bp.route("/api/medicationlist", methods=["GET"])
def medication_list():
    medication_list = get_medications()
    return jsonify(medication_list)


@medication_list_bp.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response
