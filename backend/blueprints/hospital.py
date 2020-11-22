from flask import Blueprint, request, jsonify, Response

# You can import the database from a blueprint
from backend.database.models import db, Hospital

from backend.auth import _build_cors_preflight_response, _corsify_actual_response


# Creates Blueprint
hospital_bp = Blueprint("hospital", __name__, url_prefix="/hospital")

# Route for fetching all hospitals
@hospital_bp.route("/all", methods=["GET", "OPTIONS"])
def hospitals():
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        hospitalList = Hospital.query_all()
        serializedHospitalList = []
        for i in range(len(hospitalList)):
            hospitalList[i] = Hospital.serialize(hospitalList[i])
            serializedHospitalList.append(hospitalList[i])
        return _corsify_actual_response(jsonify(serializedHospitalList))


# Route for fetching specific hospital
@hospital_bp.route("/<string:hospitalID>", methods=["GET", "OPTIONS"])
def hospital(hospitalID):
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        hospital = Hospital.query.filter_by(id=hospitalID).first_or_404()
        return _corsify_actual_response(jsonify(Hospital.serialize(hospital)))
