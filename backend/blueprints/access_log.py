from flask import Flask, Blueprint, request, jsonify
from backend.database.models import add_log_to_database, AccessLog

access_log_bp = Blueprint("access_log", __name__, url_prefix='/access_log')

# In order to add log to the database, use this api endpoint.
# Send request to this endpoint using method POST and having content type JSON(application/json)
# Example of request:
# {
# 	"accessed_patients_pnumber": "12345",
# 	"care_giver_pnumber": "6789067890",
# 	"department_name": "kidney"
# }
@access_log_bp.route("/add", methods=["POST"])
def add_log():
    if request.method == "POST" and request.json is not None:
        care_giver_pnumber = request.json.get("care_giver_pnumber", None)
        accessed_patients_pnumber = request.json.get("accessed_patients_pnumber", None)
        department_name = request.json.get("department_name", None)
        if accessed_patients_pnumber is not None and care_giver_pnumber is not None:
            add_log_to_database(
                accessed_patients_pnumber, care_giver_pnumber, department_name
            )
            resp = jsonify(success=True)
            resp.status_code = 200
            return resp
    resp = jsonify(success=False)
    resp.status_code = 400
    return resp

    # In order to access the logs, use this api endpoint. It will return all the logs queried for in json format.


# To access the logs, you have to send some parameters using method POST and the request content type is JSON(application/json)
# Following are examples how to hit this api endpoint:
# Example 1
# {
# 	"care_giver_pnumber": "6789067890"
# }
# In above example, all the logs for that particular care giver will be returned.
#
# Example 2
# {
# 	"care_giver_pnumber": "6789067890",
# 	"start_datetime": "11/11/2020 0:0:0.0"
# }
# In above example, all logs for particular care giver starting from that timestamp will be returned
# Example 3
# {
# 	"care_giver_pnumber": "6789067890",
# 	"start_datetime": "11/11/2020 0:0:0.0",
# 	"end_datetime": "12/11/2020 0:0:0.0"
# }
# In above example, all logs for particular caregiver between start timelog and end timelog will be returned
# Also note that while querying the timestamp should be exactly in '%m/%d/%Y %H:%M:%S.%f' 'Month/Day/Year Hours:Minutes:Seconds' format.
# e.g. 11/11/2020 18:17:35.281832


@access_log_bp.route("/all", methods=["POST"])
def access_logs():
    if request.method == "POST" and request.json is not None:
        care_giver_pnumber = request.json.get("care_giver_pnumber", None)
        accessed_patients_pnumber = request.json.get("accessed_patients_pnumber", None)
        start_datetime = request.json.get("start_datetime", None)
        end_datetime = request.json.get("end_datetime", None)

        results = AccessLog.query

        if care_giver_pnumber is not None:
            results = results.filter(AccessLog.care_giver_pnumber == care_giver_pnumber)

        if accessed_patients_pnumber is not None:
            results = results.filter(
                AccessLog.accessed_patients_pnumber == accessed_patients_pnumber
            )

        if start_datetime is not None:
            results = results.filter(
                AccessLog.accessed_time
                >= datetime.strptime(start_datetime, "%m/%d/%Y %H:%M:%S.%f")
            )

        if end_datetime is not None:
            results = results.filter(
                AccessLog.accessed_time
                <= datetime.strptime(end_datetime, "%m/%d/%Y %H:%M:%S.%f")
            )

        results = results.all()

        resp = jsonify(success=True, json_list=[i.serialize for i in results])
        resp.status_code = 200
        return resp
    resp = jsonify(success=False)
    resp.status_code = 400
    return resp
