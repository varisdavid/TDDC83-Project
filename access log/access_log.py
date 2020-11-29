from flask import Flask, request, redirect, url_for, jsonify
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

def get_log_type(argument):
    log_type_dict = {
        1: "Measurements",
        2: "Medication",
        3: "Diagnosis",
		4: "Personal Details"
    }
    return log_type_dict.get(argument, "Other")

class AccessLog(db.Model):
	__tablename__ = 'access_logs'

	id = db.Column(db.Integer, primary_key=True)
	care_giver_pnumber = db.Column(db.String(10))
	accessed_patients_pnumber = db.Column(db.String(10))
	patient_operation = db.Column(db.String(40))
	caregiver_operation = db.Column(db.String(40))
	accessed_time = db.Column(db.DateTime)
	patient_belongs_to_operation_of_caregiver = db.Column(db.Boolean)
	log_type = db.Column(db.Integer)


	#This method is used to convert the object to json representation
	@property
	def serialize(self):
		return {
			'id' : self.id,
    		'accessed_time': dump_datetime(self.accessed_time),
    		'accessed_patients_pnumber': self.accessed_patients_pnumber,
    		'care_giver_pnumber': self.care_giver_pnumber,
    		'caregiver_operation': self.caregiver_operation,
			'patient_operation': self.patient_operation,
			'patient_belongs_to_operation_of_caregiver': self.patient_belongs_to_operation_of_caregiver,
			'log_type': get_log_type(self.log_type)
    	}

# This function does the work of adding log to database
def add_log_to_database(accessed_patients_pnumber, care_giver_pnumber, patient_operation, caregiver_operation, log_type):
	patient_belongs_to_operation_of_caregiver = False

	current_time = datetime.now()

	# To check whether patient belongs to operation of caregiver
	if (patient_operation is not None and caregiver_operation is not None) and (patient_operation.lower() == caregiver_operation.lower()):
		patient_belongs_to_operation_of_caregiver = True

	log = AccessLog(accessed_patients_pnumber = accessed_patients_pnumber, care_giver_pnumber = care_giver_pnumber,
					accessed_time = current_time, caregiver_operation = caregiver_operation, patient_operation = patient_operation,
					log_type = log_type, patient_belongs_to_operation_of_caregiver = patient_belongs_to_operation_of_caregiver)
	db.session.add(log)
	db.session.commit()

# function to log if measurements of patient is accessed
def log_accessed_measurement(accessed_patients_pnumber, care_giver_pnumber, patient_operation, caregiver_operation):
	add_log_to_database(accessed_patients_pnumber, care_giver_pnumber, patient_operation, caregiver_operation, 1)

# function to log if medication of patient is accessed
def log_accessed_medication(accessed_patients_pnumber, care_giver_pnumber, patient_operation, caregiver_operation):
	add_log_to_database(accessed_patients_pnumber, care_giver_pnumber, patient_operation, caregiver_operation, 2)

# function to log if diagnosis of patient is accessed
def log_accessed_diagnosis(accessed_patients_pnumber, care_giver_pnumber, patient_operation, caregiver_operation):
	add_log_to_database(accessed_patients_pnumber, care_giver_pnumber, patient_operation, caregiver_operation, 3)

# function to log if personal info of patient is accessed
def log_accessed_personal_info(accessed_patients_pnumber, care_giver_pnumber, patient_operation, caregiver_operation):
	add_log_to_database(accessed_patients_pnumber, care_giver_pnumber, patient_operation, caregiver_operation, 4)

# function to log if other things of patient is accessed
def log_other(accessed_patients_pnumber, care_giver_pnumber, patient_operation, caregiver_operation):
	add_log_to_database(accessed_patients_pnumber, care_giver_pnumber, patient_operation, caregiver_operation, 0)

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
		log_type = request.json.get('log_type', None)
		patient_operation = request.json.get('patient_operation', None)
		caregiver_operation = request.json.get('caregiver_operation', None)

		results = AccessLog.query

		if care_giver_pnumber is not None:
			results = results.filter(AccessLog.care_giver_pnumber == care_giver_pnumber)

		if accessed_patients_pnumber is not None:
			results = results.filter(AccessLog.accessed_patients_pnumber == accessed_patients_pnumber)

		if start_datetime is not None:
			results = results.filter(AccessLog.accessed_time >= datetime.strptime(start_datetime, '%m/%d/%Y %H:%M:%S.%f'))

		if end_datetime is not None:
			results = results.filter(AccessLog.accessed_time <= datetime.strptime(end_datetime, '%m/%d/%Y %H:%M:%S.%f'))

		if patient_operation is not None:
			results = results.filter(AccessLog.patient_operation == patient_operation)

		if caregiver_operation is not None:
			results = results.filter(AccessLog.caregiver_operation == caregiver_operation)

		if log_type is not None:
			results = results.filter(AccessLog.log_type == log_type)

		results = results.all()

		resp = jsonify(success = True, json_list=[i.serialize for i in results])
		resp.status_code = 200
		return resp
	resp = jsonify(success=False)
	resp.status_code = 400
	return resp

@app.route('/access_all_logs', methods=["POST"])
def get_all_logs():
	if request.method == 'POST':
		results = AccessLog.query.all()
		resp = jsonify(success = True, json_list=[i.serialize for i in results])
		resp.status_code = 200
		return resp
	resp = jsonify(success=False)
	resp.status_code = 400
	return resp

# @app.route('/add_log', methods=["POST"])
# def get_all_logs():
# 	log_accessed_medication("9512019595", "9512019598", "linkoping ryd", "linkoping ryd")

if __name__ == "__main__":
	db.create_all()
	app.run(debug=True)
