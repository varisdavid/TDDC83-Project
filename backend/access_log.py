from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
# This is just the uri for dummy database I created. We can put actual database in this place.
# Following is the example if we want to use MySql database instead of sqlite. I also tested it with MySql Database.
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:adibaba1995@localhost/patients'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

def dump_datetime(value):
	if value is None:
		return None
	return value.strftime("%m/%d/%Y") + " " +value.strftime("%H:%M:%S.%f")

class AccessLog(db.Model):
	__tablename__ = 'access_logs'

	id = db.Column(db.Integer, primary_key=True)
	care_giver_pnumber = db.Column(db.String(10))
	accessed_patients_pnumber = db.Column(db.String(10))
	department_name = db.Column(db.String(100))
	accessed_time = db.Column(db.DateTime)

	#This method is used to convert the object to json representation
	@property
	def serialize(self):
		return {
			'id' : self.id,
    		'accessed_time': dump_datetime(self.accessed_time),
    		'accessed_patients_pnumber': self.accessed_patients_pnumber,
    		'care_giver_pnumber': self.care_giver_pnumber,
    		'department_name': self.department_name
    	}

# In order to add log to the database, use this api endpoint.
# Send request to this endpoint using method POST and having content type JSON(application/json)
# Example of request:
# {
#	"accessed_patients_pnumber": "12345",
#	"care_giver_pnumber": "6789067890",
#	"department_name": "kidney"
# }
@app.route('/add_log', methods=["POST"])
def add_log():
	if request.method == 'POST' and request.json is not None:
		care_giver_pnumber = request.json.get('care_giver_pnumber', None)
		accessed_patients_pnumber = request.json.get('accessed_patients_pnumber', None)
		department_name = request.json.get('department_name', None)
		if accessed_patients_pnumber is not None and care_giver_pnumber is not None:
			add_log_to_database(accessed_patients_pnumber, care_giver_pnumber, department_name)
			resp = jsonify(success=True)
			resp.status_code = 200
			return resp
	resp = jsonify(success=False)
	resp.status_code = 400
	return resp

# This function does the work of adding log to database
def add_log_to_database(accessed_patients_pnumber, care_giver_pnumber, department_name):
	current_time = datetime.now()
	log = AccessLog(accessed_patients_pnumber=accessed_patients_pnumber, care_giver_pnumber = care_giver_pnumber,
					accessed_time = current_time, department_name = department_name)
	db.session.add(log)
	db.session.commit()

# In order to access the logs, use this api endpoint. It will return all the logs queried for in json format.
# To access the logs, you have to send some parameters using method POST and the request content type is JSON(application/json)
# Following are examples how to hit this api endpoint:
# Example 1
# {
#	"care_giver_pnumber": "6789067890"
# }
# In above example, all the logs for that particular care giver will be returned.
#
# Example 2
# {
#	"care_giver_pnumber": "6789067890",
#	"start_datetime": "11/11/2020 0:0:0.0"
# }
# In above example, all logs for particular care giver starting from that timestamp will be returned
# Example 3
# {
#	"care_giver_pnumber": "6789067890",
#	"start_datetime": "11/11/2020 0:0:0.0",
#	"end_datetime": "12/11/2020 0:0:0.0"
# }
# In above example, all logs for particular caregiver between start timelog and end timelog will be returned
# Also note that while querying the timestamp should be exactly in '%m/%d/%Y %H:%M:%S.%f' 'Month/Day/Year Hours:Minutes:Seconds' format.
# e.g. 11/11/2020 18:17:35.281832
@app.route('/access_logs', methods=["POST"])
def access_logs():
	if request.method == 'POST' and request.json is not None:
		care_giver_pnumber = request.json.get('care_giver_pnumber', None)
		accessed_patients_pnumber = request.json.get('accessed_patients_pnumber', None)
		start_datetime = request.json.get('start_datetime', None)
		end_datetime = request.json.get('end_datetime', None)

		results = AccessLog.query

		if care_giver_pnumber is not None:
			results = results.filter(AccessLog.care_giver_pnumber == care_giver_pnumber)

		if accessed_patients_pnumber is not None:
			results = results.filter(AccessLog.accessed_patients_pnumber == accessed_patients_pnumber)

		if start_datetime is not None:
			results = results.filter(AccessLog.accessed_time >= datetime.strptime(start_datetime, '%m/%d/%Y %H:%M:%S.%f'))

		if end_datetime is not None:
			results = results.filter(AccessLog.accessed_time <= datetime.strptime(end_datetime, '%m/%d/%Y %H:%M:%S.%f'))

		results = results.all()

		resp = jsonify(success = True, json_list=[i.serialize for i in results])
		resp.status_code = 200
		return resp
	resp = jsonify(success=False)
	resp.status_code = 400
	return resp


if __name__ == "__main__":
	db.create_all()
	app.run(debug=True)
