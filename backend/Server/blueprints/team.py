from flask import Blueprint, request, jsonify, Response

# You can import the database from a blueprint
from backend.server.personnel_db import db, Team
from backend.main import app

# Creates Blueprint
bp = Blueprint('team', __name__, url_prefix='/team')

# Route for fetching all teams
@bp.route("/all", methods=['GET'])
def teams():
    teamList = Team.query_all()
    serializedteamList = []
    for i in range(len(teamList)):
            teamList[i] = Team.serialize(teamList[i])
            serializedteamList.append(teamList[i])
    return jsonify(serializedteamList)

# Route for fetching specific team
@bp.route("/<string:teamID>", methods=['GET'])
def team(teamID):
        team = Team.query.filter_by(id = teamID).first_or_404()
        return jsonify(team.serialize(team))
