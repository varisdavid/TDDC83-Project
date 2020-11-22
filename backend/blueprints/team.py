from flask import Blueprint, request, jsonify, Response

# You can import the database from a blueprint
from backend.database.models import Team

from backend.auth import _build_cors_preflight_response, _corsify_actual_response


# Creates Blueprint
team_bp = Blueprint("team", __name__, url_prefix="/team")

# Route for fetching all teams
@team_bp.route("/all", methods=["GET", "OPTIONS"])
def teams():
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        teamList = Team.query.all()
        serializedteamList = []
        for i in range(len(teamList)):
            teamList[i] = Team.serialize(teamList[i])
            serializedteamList.append(teamList[i])
        return _corsify_actual_response(jsonify(serializedteamList))


# Route for fetching specific team
@team_bp.route("/<string:teamID>", methods=["GET", "OPTIONS"])
def team(teamID):
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "GET":
        team = Team.query.filter_by(id=teamID).first_or_404()
        return _corsify_actual_response(jsonify(team.serialize(team)))
