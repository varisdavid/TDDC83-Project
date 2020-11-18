
from flask import Blueprint, request, jsonify, Response

# You can import the database from a blueprint
from backend.server.personnel_db import db, Department
from backend.main import app

# Creates Blueprint
bp = Blueprint('department', __name__, url_prefix='/department')

# Route for fetching all departments
@bp.route("/all", methods=['GET'])
def departments():
    departmentList = Department.query_all()
    serializeddepartmentList = []
    for i in range(len(departmentList)):
            departmentList[i] = Department.serialize(departmentList[i])
            serializeddepartmentList.append(departmentList[i])
    return jsonify(serializeddepartmentList)

# Route for fetching specific department
@bp.route("/<string:departmentID>", methods=['GET'])
def department(departmentID):
        department = Department.query.filter_by(id = departmentID).first_or_404()
        return jsonify(Department.serialize(department))
