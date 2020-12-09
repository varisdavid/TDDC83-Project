from flask import Flask, Blueprint, request, redirect, url_for, jsonify
from backend.ehr_related.fetch_patient_list import get_diagnosis

from backend.auth import _build_cors_preflight_response, _corsify_actual_response
from backend.database.models import log_accessed_diagnosis

diagnosis_bp = Blueprint("diagnosis", __name__, url_prefix="/api/diagnosis")


@diagnosis_bp.route("/<string:ehrid>", methods=["GET", "OPTIONS"])
def diagnosis(ehrid):
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        try:
            diagnosis = get_diagnosis(ehrid)
            request_dict = dict(request.headers)
            user_email = request_dict.get("Email", None)
            if user_email is not None:
                log_accessed_diagnosis(ehrid, user_email)
            return _corsify_actual_response(jsonify(diagnosis))
        except:

            return _corsify_actual_response(jsonify("Error", "Bad EHRID")), 400
