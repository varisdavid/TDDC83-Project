from flask import Blueprint, request, jsonify, Response
from backend import db

# You can import the database from a blueprint
from backend.database.models import CustomizedView, Employee

from backend.auth import _build_cors_preflight_response, _corsify_actual_response

# Creates Blueprint
customizedView_bp = Blueprint("customizedView", __name__, url_prefix="/customizedview")

# Route for fetching all available/selectable customized views for a certain user
@customizedView_bp.route("/myviews", methods=["POST", "OPTIONS"])
def customizedViews():
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "POST":
        
        #We need some way to find out who the user is. Implemented with email.
        email = request.get_json().get('email')
        if email is None:
            return _corsify_actual_response(jsonify("Error", "Missing email")), 400
        
        employee = Employee.query.filter_by(email = email).first()
        if employee is None:
            return _corsify_actual_response(jsonify("Error", "Bad email")), 400
        
        viewList = CustomizedView.query.filter_by(teamNumber = employee.team).all()
        serializedViewList = []
        for i in range(len(viewList)):
            serializedViewList.append(viewList[i].serialize())
        return _corsify_actual_response(jsonify(serializedViewList))

# Route for fetching specific customized view
@customizedView_bp.route("/<string:customizedViewID>", methods=["GET", "OPTIONS"])
def customizedView(customizedViewID):
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        customizedView = CustomizedView.query.filter_by(id=customizedViewID).first_or_404()
        return _corsify_actual_response(jsonify(customizedView.serialize(customizedView)))
    

# Route for creating a new view
# Needs all non-nullable parameters:
# Name and teamNumber
@customizedView_bp.route("/addview", methods=["POST", "OPTIONS"])
def add_view():
    if request.method == "OPTIONS": 
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        payload = request.get_json()
        
        view = CustomizedView()
        for key, value in payload.items():
            if not hasattr(view, key):
                retval = 'Attribute "' + key + '" is invalid'
                return _corsify_actual_response(jsonify("Error", retval)), 400
            
            setattr(view, key, value)
            
        
        try:
            db.session.add(view)
            db.session.commit()
        except:
            return _corsify_actual_response(jsonify("Error", "Missing parameter: NOT NULL constraint failed")), 400
        
        return _corsify_actual_response(jsonify(dict(success = True)))