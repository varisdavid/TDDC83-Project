from flask import Flask, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
# This is just the uri for dummy database I created. We can put actual database in this place.
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

def dump_datetime(value):
	if value is None:
		return None
	return [value.strftime("%m/%d/%Y"), value.strftime("%H:%M:%S.%f")]

class AccessLog(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	patient_pnumber = db.Column(db.String(10))
	care_giver_pnumber = db.Column(db.String(10))
	department_name = db.Column(db.String(100))
	accessed_time = db.Column(db.DateTime)
	
	@property
	def serialize(self):
		return {
			'id' : self.id,
    		'accessed_time': dump_datetime(self.accessed_time),
    		'patient_pnumber': self.patient_pnumber,
    		'care_giver_pnumber': self.care_giver_pnumber,
    		'department_name': self.department_name
    	}
	
	
@app.route('/add_log', methods=["POST"])
def add_log():
	patient_pnumber = request.json['patient_pnumber']
	care_giver_pnumber = request.json['care_giver_pnumber']
	department_name = request.json['department_name']
	add_log_to_database(patient_pnumber, care_giver_pnumber, department_name)
	return "200"
	

def add_log_to_database(patient_pnumber, care_giver_pnumber, department_name):
	current_time = datetime.now()
	log = AccessLog(patient_pnumber=patient_pnumber, care_giver_pnumber = care_giver_pnumber,
					accessed_time = current_time, department_name = department_name)
	db.session.add(log)
	db.session.commit()
	
@app.route('/access_logs', methods=["POST"])
def access_logs():
	start_datetime = datetime.strptime(request.json['start_datetime'], '%m/%d/%Y %H:%M:%S.%f')
	end_datetime = datetime.strptime(request.json['end_datetime'], '%m/%d/%Y %H:%M:%S.%f')
	results = AccessLog.query.filter(AccessLog.accessed_time >= start_datetime).filter(AccessLog.accessed_time <= end_datetime).all()
	return jsonify(json_list=[i.serialize for i in results])


if __name__ == "__main__":
	db.create_all()
	app.run(debug=True)