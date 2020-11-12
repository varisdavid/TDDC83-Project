from flask_sqlalchemy import SQLAlchemy
from flask import current_app as app
from server import app

db = SQLAlchemy(app)

class Employee(db.Model):
    __tablename__ = 'employees'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=false)
    personalNumber = db.Column(db.String, nullable=false)
    email = db.Column(db.String, nullable=True)
    phoneNumber = db.Column(db.String, nullable=True)
    team = db.Column(db.String, db.ForeignKey('teams.id'), nullable=false)

    def __repr__(self):
        return '<Employee {}: {} {} {} {} {}>'.format(self.id, self.name, self.personalNumber, self.email, self.phoneNumber, self.team)
    
    def serialize(self):
        return dict(id=self.id, name=self.name, personalNumber=self.personalNumber, email=self.email, phoneNumber=self.phoneNumber, team=self.team)

class Team(db.Model):
    __tablename__ = 'teams'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=false)
    departmentNumber = db.Column(db.Integer, db.ForeignKey('departments.id'), nullable=False)

    def __repr__(self):
        return '<Team {}: {} {}>'.format(self.id, self.name, self.departmentNumber)

    def serialize(self):
        return dict(id=self.id, name=self.name, departmentNumber=self.departmentNumber)

class Department(db.Model):
    __tablename__ = 'departments'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    def __repr__(self):
        return '<Department {}: {}>'.format(self.id, self.name)

    def serialize(self):
        return dict(id=self.id, name=self.name)
