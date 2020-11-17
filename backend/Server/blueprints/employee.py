from flask import Blueprint, request, jsonify, Response
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

# You can import the database from a blueprint
from server.personnel_database import db, Employee
from server import app

# Creates Blueprint
bp = Blueprint('employee', __name__, url_prefix='/employee')

# Route for fetching all employees
@bp.route("/all", methods=['GET'])
def employees():
    employeeList = Employee.query_all()
    serializedEmployeeList = []
    for i in range(len(employeeList)):
            employeeList[i] = Employee.serialize(employeeList[i])
            serializedEmployeeList.append(employeeList[i])
    return jsonify(serializedEmployeeList)


