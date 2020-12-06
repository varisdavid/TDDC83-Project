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

# Customized view is a pre-defined filter created by a user
class CustomizedView(db.Model):
    __tablename__ = "customizedView"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    minAge = db.Column(db.Integer, nullable=True)
    maxAge = db.Column(db.Integer, nullable=True)
    gender = db.Column(db.String, nullable=True)
    departmentNumber = db.Column(db.Integer, db.ForeignKey("departments.id"), nullable=True)
    teamNumber = db.Column(db.Integer, db.ForeignKey("teams.id"), nullable=True)
    highPriority = db.Column(db.Boolean, nullable=False)
    medPriority = db.Column(db.Boolean, nullable=False)
    lowPriority = db.Column(db.Boolean, nullable=False)
    accessFor = db.Column(db.String, db.ForeignKey("emlpoyees.id"), nullable=False)


    def __repr__(self):
        return "<View {}: {} {} {} {} {} {} {} {} {}>".format(
            self.id,
            self.name,
            self.minAge,
            self.maxAge,
            self.gender,
            self.departmentNumber,
            self.teamNumber,
            self.highPriority,
            self.medPriority,
            self.lowPriority,
            self.accessFor,
        )

    def serialize(self):
        return dict(
            id = self.id,
            name = self.name,
            minAge = self.minAge,
            maxAge = self.maxAge,
            gender = self.gender,
            departmentNumber = self.departmentNumber,
            teamNumber = self.teamNumber,
            highPriority = self.highPriority,
            medPriority = self.medPriority,
            lowPriority = self.lowPriority,
            accesFor = self.accessFor,
        )

# CustimzedViewDiagnosis is the join table that stores what diagnoses are saved in the custmized view
class CustomizedViewDiagnosis(db.Model):
    __tablename__ = "customizedViewDiagnosis"
    customizedViewID = db.Column(db.Integer, db.ForeignKey("customizedView.id"), primary_key=True)
    diagnosis = db.Column(db.String, primary_key=True)

    def __repr__(self):
        return "<CustomizedViewDiagnosis {}: {}>".format(self.customizedViewID, self.diagnosis)

    def serialize(self):
        return dict(customizedViewID=self.customizedViewID, diagnosis=self.diagnosis)

# Priority rule keeps track of the different intervalls that determine the level of priority for a certain hospital
class PriorityRule (db.Model):
    __tablename__ = "priorityRules"
    id = db.Column(db.Integer, primary_key=True)
    appliesFor = db.Column(db.Integer, db.ForeignKey("hospital.id"), nullable=False)
    lowBadBloodsugar = db.Column(db.Integer, nullable=False)
    lowGoodBloodsugar = db.Column(db.Integer, nullable=False)
    highGoodBloodsugar = db.Column(db.Integer, nullable=False)
    highBadBloodsugar = db.Column(db.Integer, nullable=False)
    lowBadSystolic = db.Column(db.Integer, nullable=False)
    lowGoodSystolic = db.Column(db.Integer, nullable=False)
    highGoodSystolic = db.Column(db.Integer, nullable=False)
    highBadSystolic = db.Column(db.Integer, nullable=False)
    lowBadDiastolic = db.Column(db.Integer, nullable=False)
    lowGoodDiastolic = db.Column(db.Integer, nullable=False)
    highGoodDiastolic = db.Column(db.Integer, nullable=False)
    highBadDiastolic = db.Column(db.Integer, nullable=False)
    lowBadPulse = db.Column(db.Integer, nullable=False)
    lowGoodPulse = db.Column(db.Integer, nullable=False)
    highGoodPulse = db.Column(db.Integer, nullable=False)
    highBadPulse = db.Column(db.Integer, nullable=False)
    lowBadWeight = db.Column(db.Integer, nullable=False)
    lowGoodWeight = db.Column(db.Integer, nullable=False)
    highGoodWeight = db.Column(db.Integer, nullable=False)
    highBadWeight = db.Column(db.Integer, nullable=False)
    lowBadExercise = db.Column(db.Integer, nullable=False)
    lowgoodExercise = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return "<priorityRules {}: {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {}>".format(
            self.id,
            self.appliesFor,
            self.lowBadBloodsugar,
            self.lowGoodBloodsugar,
            self.highGoodBloodsugar,
            self.highBadBloodsugar,
            self.lowBadSystolic,
            self.lowGoodSystolic,
            self.highGoodSystolic,
            self.highBadSystolic,
            self.lowBadDiastolic,
            self.lowGoodDiastolic,
            self.highGoodDiastolic,
            self.highBadDiastolic,
            self.lowBadPulse,
            self.lowGoodPulse,
            self.highGoodPulse,
            self.highBadPulse,
            self.lowBadWeight,
            self.lowGoodWeight,
            self.highGoodWeight,
            self.highBadWeight,
            self.lowBadExercise,
            self.lowGoodExercise,
        )
    def serialize(self):
        return dict(
            id = self.id,
            appliesFor = self.appliesFor,
            lowBadBloodsugar = self.lowBadBloodsugar,
            lowGoodBloodsugar = self.lowGoodBloodsugar,
            highGoodBloodsugar = self.highGoodBloodsugar,
            highBadBloodsugar = self.highBadBloodsugar,
            lowBadSystolic = self.lowBadSystolic,
            lowGoodSystolic = self.lowGoodSystolic,
            highGoodSystolic = self.highGoodSystolic,
            highBadSystolic = self.highBadSystolic,
            lowBadDiastolic = self.lowBadDiastolic,
            lowGoodDiastolic = self.lowGoodDiastolic,
            highGoodDiastolic = self.highGoodDiastolic,
            highBadDiastolic = self.highBadDiastolic,
            lowBadPulse = self.lowBadPulse,
            lowGoodPulse = self.lowGoodPulse,
            highGoodPulse = self.highGoodPulse,
            highBadPulse = self.highBadPulse,
            lowBadWeight = self.lowBadWeight,
            lowGoodWeight = self.lowGoodWeight,
            highGoodWeight = self.highGoodWeight,
            highBadWeight = self.highBadWeight,
            lowBadExercise = self.lowBadExercise,
            lowGoodExercise = self.lowGoodExercise,
        )
