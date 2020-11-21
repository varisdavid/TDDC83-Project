from flask import Blueprint, request, jsonify, Response

# You can import the database from a blueprint
from backend.database.models import db, Employee

# Creates Blueprint
employee_bp = Blueprint('employee', __name__, url_prefix='/employee')

# Route for fetching all employees
@employee_bp.route("/all", methods=['GET'])
def employees():
    employeeList = Employee.query_all()
    serializedEmployeeList = []
    for i in range(len(employeeList)):
            employeeList[i] = Employee.serialize(employeeList[i])
            serializedEmployeeList.append(employeeList[i])
    return jsonify(serializedEmployeeList)

# Route for fetching specific employee
@employee_bp.route("/<string:employeeID>", methods=['GET'])
def employee(employeeID):
        employee = Employee.query.filter_by(id = employeeID).first_or_404()
        return jsonify(Employee.serialize(employee))




