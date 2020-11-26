from flask import Flask, request, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# This is the model for the employee details
class User(db.Model):
	__tablename__ = 'user'

	id = db.Column(db.Integer, primary_key=True)
	pnumber = db.Column(db.String(10))
	email = db.Column(db.String(10))

	#This method is used to convert the object to json representation
	@property
	def serialize(self):
		return {
			'id' : self.id,
    		'email': self.email,
    		'pnumber': self.pnumber
    	}

# This route is used by the auth0 rule to get details about the employee logging in.
@app.route('/get_user', methods=["POST"])
def access_logs():
	if request.method == 'POST' and request.json is not None:
		email = request.json.get('email', None)

		results = User.query

		if email is not None:
			results = results.filter(User.email == email)

		results = results.all()

		if len(results) > 0:
			resp = jsonify(success = True, user=results[0].serialize)
			resp.status_code = 200
			return resp
	resp = jsonify(success=False)
	resp.status_code = 400
	return resp


if __name__ == "__main__":
	db.create_all()
	app.run(debug=True)
