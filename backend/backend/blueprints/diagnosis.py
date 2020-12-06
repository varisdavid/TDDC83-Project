from flask import Flask, Blueprint, request, redirect, url_for, jsonify
from backend.ehr_related.fetch_patient_list import get_diagnosis

from backend.auth import _build_cors_preflight_response, _corsify_actual_response

diagnosis_bp = Blueprint("diagnosis", __name__, url_prefix="/diagnosis")


@diagnosis_bp.route("/<string:ehrid>", methods=["GET", "OPTIONS"])
def diagnosis(ehrid):
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        try:
            diagnosis = get_diagnosis(ehrid)
            return _corsify_actual_response(jsonify(diagnosis))
        except:

            return _corsify_actual_response(jsonify("Error", "Bad EHRID")), 400
