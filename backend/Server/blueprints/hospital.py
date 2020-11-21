from flask import Blueprint, request, jsonify, Response

# You can import the database from a blueprint
from backend.server.personnel_db import db, Hospital
from backend.main import app

# Creates Blueprint
bp = Blueprint('hospital', __name__, url_prefix='/hospital')

# Route for fetching all hospitals
@bp.route("/all", methods=['GET'])
def hospitals():
    hospitalList = Hospital.query_all()
    serializedHospitalList = []
    for i in range(len(hospitalList)):
            hospitalList[i] = Hospital.serialize(hospitalList[i])
            serializedHospitalList.append(hospitalList[i])
    return jsonify(serializedHospitalList)

# Route for fetching specific hospital
@bp.route("/<string:hospitalID>", methods=['GET'])
def hospital(hospitalID):
        hospital = Hospital.query.filter_by(id = hospitalID).first_or_404()
        return jsonify(Hospital.serialize(hospital))
