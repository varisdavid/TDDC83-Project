from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask import current_app as app
from backend import db


def dump_datetime(value):
    if value is None:
        return None
    return value.strftime("%m/%d/%Y") + " " + value.strftime("%H:%M:%S.%f")


class AccessLog(db.Model):
    __tablename__ = "access_logs"

    id = db.Column(db.Integer, primary_key=True)
    care_giver_pnumber = db.Column(db.String(10))
    accessed_patients_pnumber = db.Column(db.String(10))
    department_name = db.Column(db.String(100))
    accessed_time = db.Column(db.DateTime)

    # This method is used to convert the object to json representation
    @property
    def serialize(self):
        return {
            "id": self.id,
            "accessed_time": dump_datetime(self.accessed_time),
            "accessed_patients_pnumber": self.accessed_patients_pnumber,
            "care_giver_pnumber": self.care_giver_pnumber,
            "department_name": self.department_name,
        }


# This function does the work of adding log to database
def add_log_to_database(accessed_patients_pnumber, care_giver_pnumber, department_name):
    current_time = datetime.now()
    log = AccessLog(
        accessed_patients_pnumber=accessed_patients_pnumber,
        care_giver_pnumber=care_giver_pnumber,
        accessed_time=current_time,
        department_name=department_name,
    )
    db.session.add(log)
    db.session.commit()


# Employee refers to a doctor or a nurse
class Employee(db.Model):
    __tablename__ = "employees"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False)
    personalNumber = db.Column(db.String, nullable=False)
    isAdmin = db.Column(db.Boolean, nullable=False)
    email = db.Column(db.String, nullable=True)
    phoneNumber = db.Column(db.String, nullable=True)
    team = db.Column(db.String, db.ForeignKey("teams.id"), nullable=True)

    def __repr__(self):
        return "<Employee {}: {} {} {} {} {}>".format(
            self.id,
            self.name,
            self.personalNumber,
            self.email,
            self.phoneNumber,
            self.team,
        )

    def serialize(self):
        return dict(
            id=self.id,
            name=self.name,
            personalNumber=self.personalNumber,
            email=self.email,
            phoneNumber=self.phoneNumber,
            team=self.team,
        )


# Hospital refers to a specific hospital
class Hospital(db.Model):
    __tablename__ = "hospital"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)


# Department is a unit within the hospital, such as for example: dermatologist, orthopedic etc.
class Department(db.Model):
    __tablename__ = "departments"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    hospital = db.Column(db.String, db.ForeignKey("hospital.id"), nullable=False)

    def __repr__(self):
        return "<Department {}: {}>".format(self.id, self.name)

    def serialize(self):
        return dict(id=self.id, name=self.name)


# Team is a team of personnel within a department, such as a team of doctors and nurses
class Team(db.Model):
    __tablename__ = "teams"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    departmentNumber = db.Column(
        db.Integer, db.ForeignKey("departments.id"), nullable=False
    )

    def __repr__(self):
        return "<Team {}: {} {}>".format(self.id, self.name, self.departmentNumber)

    def serialize(self):
        return dict(id=self.id, name=self.name, departmentNumber=self.departmentNumber)
