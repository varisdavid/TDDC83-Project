from flask import Flask, Blueprint, request, redirect, url_for, jsonify, request
from backend.ehr_related.fetch_patient_list import get_medications

from backend.auth import _build_cors_preflight_response, _corsify_actual_response

from backend.auth import AuthError, requires_auth
from backend.database.models import log_accessed_medication

medication_list_bp = Blueprint(
    "medication_list", __name__, url_prefix="/medication_list"
)


@medication_list_bp.route("/<string:ehrid>", methods=["GET", "OPTIONS"])
# @requires_auth
def medication_list(ehrid):
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        try:
            medication_list = get_medications(ehrid)
            request_dict = dict(request.headers)
            user_email = request_dict.get("Email", None)
            if user_email is not None:
                log_accessed_medication(ehrid, user_email)
            return _corsify_actual_response(jsonify(medication_list))
        except:
            return _corsify_actual_response(jsonify("Error", "Bad EHRID")), 400
