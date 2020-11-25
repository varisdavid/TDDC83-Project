from flask import Flask, Blueprint, request, redirect, url_for, jsonify
from backend.ehr_related.fetch_patient_list import get_measurements

from backend.auth import _build_cors_preflight_response, _corsify_actual_response

measurements_bp = Blueprint("measurements", __name__, url_prefix="/measurements")


@measurements_bp.route("/<string:ehrid>", methods=["GET", "OPTIONS"])
def measurements(ehrid):
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        try:
            measurements = get_measurements(ehrid)
            return _corsify_actual_response(jsonify(measurements))
        except:

            return _corsify_actual_response(jsonify("Error", "Bad EHRID")), 400
