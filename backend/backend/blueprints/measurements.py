from flask import Flask, Blueprint, request, redirect, url_for, jsonify
from backend.ehr_related.fetch_patient_list import get_measurements

from backend.auth import _build_cors_preflight_response, _corsify_actual_response
from backend.auth import AuthError, requires_auth
from backend.database.models import log_accessed_measurement

measurements_bp = Blueprint("measurements", __name__, url_prefix="/api/measurements")


@measurements_bp.route("/<string:ehrid>", methods=["GET", "OPTIONS"])
@requires_auth
def measurements(ehrid):
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        try:
            measurements = get_measurements(ehrid)
            request_dict = dict(request.headers)
            user_email = request_dict.get("Email", None)
            if user_email is not None:
                log_accessed_measurement(ehrid, user_email)
            return _corsify_actual_response(jsonify(measurements))
        except:

            return _corsify_actual_response(jsonify("Error", "Bad EHRID")), 400
