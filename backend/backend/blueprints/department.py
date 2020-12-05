from flask import Blueprint, request, jsonify, Response

# You can import the database from a blueprint
from backend.database.models import Department

from backend.auth import _build_cors_preflight_response, _corsify_actual_response

# Creates Blueprint
department_bp = Blueprint("department", __name__, url_prefix="/api/department")

# Route for fetching all departments
@department_bp.route("/all", methods=["GET", "OPTIONS"])
def departments():
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        departmentList = Department.query.all()
        serializeddepartmentList = []
        for i in range(len(departmentList)):
            departmentList[i] = Department.serialize(departmentList[i])
            serializeddepartmentList.append(departmentList[i])
        return _corsify_actual_response(jsonify(serializeddepartmentList))


# Route for fetching specific department
@department_bp.route("/<string:departmentID>", methods=["GET", "OPTIONS"])
def department(departmentID):
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        department = Department.query.filter_by(id=departmentID).first_or_404()
        return _corsify_actual_response(jsonify(Department.serialize(department)))
