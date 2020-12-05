from flask import Blueprint, request, jsonify, Response

# You can import the database from a blueprint
from backend.database.models import Employee

from backend.auth import _build_cors_preflight_response, _corsify_actual_response

# Creates Blueprint
employee_bp = Blueprint("employee", __name__, url_prefix="/api/employee")

# Route for fetching all employees
@employee_bp.route("/all", methods=["GET", "OPTIONS"])
def employees():
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        employeeList = Employee.query.all()
        serializedEmployeeList = []
        for i in range(len(employeeList)):
            employeeList[i] = Employee.serialize(employeeList[i])
            serializedEmployeeList.append(employeeList[i])
        return _corsify_actual_response(jsonify(serializedEmployeeList))


# Route for fetching specific employee
@employee_bp.route("/<string:employeeID>", methods=["GET", "OPTIONS"])
def employee(employeeID):
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        employee = Employee.query.filter_by(id=employeeID).first_or_404()
        return _corsify_actual_response(jsonify(Employee.serialize(employee)))

