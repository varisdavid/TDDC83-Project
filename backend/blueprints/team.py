from flask import Blueprint, request, jsonify, Response

# You can import the database from a blueprint
from backend.database.models import db, Team

# Creates Blueprint
team_bp = Blueprint('team', __name__, url_prefix='/team')

# Route for fetching all teams
@team_bp.route("/all", methods=['GET'])
def teams():
    teamList = Team.query_all()
    serializedteamList = []
    for i in range(len(teamList)):
            teamList[i] = Team.serialize(teamList[i])
            serializedteamList.append(teamList[i])
    return jsonify(serializedteamList)

# Route for fetching specific team
@team_bp.route("/<string:teamID>", methods=['GET'])
def team(teamID):
        team = Team.query.filter_by(id = teamID).first_or_404()
        return jsonify(team.serialize(team))
