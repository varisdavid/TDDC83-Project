from flask import Flask, request, redirect, url_for, jsonify

from fetchdata import get_all_patients_personal_details
from auth import AuthError, requires_auth


app = Flask(__name__)


@app.route("/api/patientlist", methods=["GET"])
@requires_auth
def patient_list():
    patient_list = get_all_patients_personal_details()
    return jsonify(patient_list)


@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response


if __name__ == "__main__":
    app.run(debug=True)
