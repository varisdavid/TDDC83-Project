from flask import Blueprint, request, jsonify, Response
# from flask import Flask, request, url_for, jsonify
from backend.database.models import Employee, Team, Department, Hospital
from datetime import datetime
from backend import db

auth0_access_employee_bp = Blueprint("auth0_access_employee", __name__, url_prefix="/auth0_access_employee")

# This route is used by the auth0 rule to get details about the employee logging in.
@auth0_access_employee_bp.route("", methods=["POST"])
def access_logs():
    if request.method == 'POST' and request.json is not None:
        email = request.json.get('email', None)
        results = db.session.query(Employee, Team, Department, Hospital).join(Team, Employee.team == Team.id, isouter=True).join(Department, Team.departmentNumber == Department.id, isouter=True).join(Hospital, Department.hospital == Hospital.id, isouter=True)
        if email is not None:
            results = results.filter(Employee.email == email)
        results = results.all()
        if len(results) > 0:
            print("query successful")
            print(results)
            user_details = dict(
                id=results[0].Employee.id,
                name=results[0].Employee.name,
                personal_number=results[0].Employee.personalNumber,
                email=results[0].Employee.email,
                role=results[0].Employee.role,
                phone_number=results[0].Employee.phoneNumber,
                team_name=results[0].Team.name,
                department_name=results[0].Department.name,
                hospital_name=results[0].Hospital.name
            )
            resp = jsonify(success = True, user=user_details)
            resp.status_code = 200
            return resp
    print("query not successful")
    resp = jsonify(success=False)
    resp.status_code = 400
    return resp
