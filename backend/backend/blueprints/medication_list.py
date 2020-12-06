from flask import Flask, Blueprint, request, redirect, url_for, jsonify
from backend.ehr_related.fetch_patient_list import get_medications

from backend.auth import _build_cors_preflight_response, _corsify_actual_response

medication_list_bp = Blueprint(
    "medication_list", __name__, url_prefix="/api/medication_list"
)


@medication_list_bp.route("/<string:ehrid>", methods=["GET", "OPTIONS"])
def medication_list(ehrid):
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        try:
            medication_list = get_medications(ehrid)
            return _corsify_actual_response(jsonify(medication_list))
        except:

            return _corsify_actual_response(jsonify("Error", "Bad EHRID")), 400
