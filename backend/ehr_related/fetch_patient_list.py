import requests
import json
import time


wu = "lio.se1"
wp = "lio.se123"

baseurl = "https://rest.ehrscape.com/rest/v1"


def query(aql):
    response = requests.get(baseurl + "/query/?aql=" + aql, verify=True, auth=(wu, wp))
    return response.json() if response.ok else response


def getParty(ehrid):
    response = requests.get(
        baseurl + "/demographics/party/query?ehrId=" + ehrid, verify=True, auth=(wu, wp)
    )
    return response.json() if response.ok else response


def get_all_patients_personal_details():
    """
    Function that retrieves the personal details for each of our patients in the ehrScape database
    Parameters: None
    Returns: List with dicts for each patient, containing personal information
    """
    aql_ehrids = """SELECT e/ehr_id/value as id
                    FROM EHR e
                    CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.encounter.v1]
                    WHERE c/name/value='EHR-PUM-C3'
                    OFFSET 0"""
    response = query(aql_ehrids)
    to_return = []
    list_of_dicts_with_ehrids = response["resultSet"]
    for ehrid_dict in list_of_dicts_with_ehrids:
        ehrid = ehrid_dict["id"]
        party = getParty(ehrid)
        names = party["parties"][0]
        more_info = names["additionalInfo"]
        personal_details = {
            "Name": names["firstNames"] + " " + names["lastNames"],
            "EhrID": more_info["ehrId"],
            "PNR": more_info["pnummer"],
            "Gender": more_info["gender"],
            "City": more_info["city"],
            "Address": more_info["adress"],
            "Age": more_info["age"],
            "Phone": more_info["phone"],
            "Email": more_info["email"],
            "Team" : more_info["team"], #is now a list so it can contain more than 1 team
            "Department" : more_info["department"], #for now department is still string, but will be made into list like team soon
            "Contactperson" : more_info["contactperson"],
            "Operation" : more_info["operation"] #Dict containing Name (string on form "Firstname Lastname" and phonenummer)
        }
        to_return.append(personal_details)
    return to_return

#Second endpoint
def get_measurements(ehrid):
    """
    Function that retrieves measurements data for a patient
    Parameters: ehrid, String, identifier for a patient
    Returns: List with dicts where each dict is a measurement at a specific time for this patient. All dicts will always contain information
    """

    aql = """SELECT x/data[at0002]/events[at0003]/data[at0001]/items[at0004,'Pulse Rate']/value as pulse,
       a/data[at0001]/events[at0002]/data[at0003]/items[at0011]/value as exercise,
       o/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value as bodyweight,
       w/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value as bloodsugar,
       i/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value as systolic,
       i/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value as diastolic,
       w/data[at0001]/events[at0002]/time/value as time
       FROM EHR e
       CONTAINS COMPOSITION c
       CONTAINS (OBSERVATION x[openEHR-EHR-OBSERVATION.pulse.v1] and 
       OBSERVATION a[openEHR-EHR-OBSERVATION.physicalactivityrecord.v0] and 
       OBSERVATION o[openEHR-EHR-OBSERVATION.body_weight.v2] and 
       OBSERVATION w[openEHR-EHR-OBSERVATION.blood_glucose.v1] and 
       OBSERVATION i[openEHR-EHR-OBSERVATION.blood_pressure.v2]) 
       WHERE e/ehr_id/value= '%s'
       OFFSET 0""" %ehrid
    
    response = query(aql)
    to_return= []
    for measurement in response['resultSet']:
        
        time = measurement['time'][:10]
        to_return.append(
                        { "Pulse: " : measurement['pulse']['magnitude'],
                          "Exercise: ":measurement['exercise']['magnitude'],
                          "Weight: " : measurement['bodyweight']['magnitude'],
                          "Diastolic: " : measurement['diastolic']['magnitude'],
                          "Systolic: " : measurement['systolic']['magnitude'],
                          "Bloodsugar: " : measurement['bloodsugar']['magnitude'],
                          "Time: " : time
                          } #need to reformat time-strings, currently in format "2020-11-13T12:46:36+01:00" for example
                          )
    return to_return



#medications endpoint
def get_medications(ehrid):
    """
    Function that retrieves measurements data for a patient
    Parameters: ehrid, string, identifier for a patient
    Returns: List with dicts (1-3 dicts) with data for each medicaction the patient is taking
    """
    aql = """SELECT n/activities[at0001]/description[at0002]/items[at0003]/value as med,
       n/activities[at0001]/description[at0002]/items[at0009]/value as directions,
       l/items[at0001,'Quantity']/value as quantity,
       l/items[at0003]/value as intakeform,
       n/activities[at0001]/description[at0002]/items[at0044]/value as frequency,
       n/activities[at0001]/description[at0002]/items[at0035]/value as daily
       FROM EHR e
       CONTAINS COMPOSITION c
       CONTAINS INSTRUCTION n[openEHR-EHR-INSTRUCTION.medication.v1] CONTAINS (CLUSTER l[openEHR-EHR-CLUSTER.medication_amount.v1]) 
       WHERE e/ehr_id/value = '%s'
       OFFSET 0""" %ehrid
    
    response = query(aql)
    to_return = []
    for medication in response['resultSet']:
        to_return.append({ "Medication" : medication["med"]["value"],
                           "Directions" : medication["directions"]["value"],
                           "Quantity" : str(medication["quantity"]["magnitude"]) + " mg",
                           "Intakeform" : medication["intakeform"]["value"],
                           "Frequency" : medication["frequency"]["value"],
                           "Daily" : medication["daily"]["value"]
        })
    return to_return

    


#medical diagnosis endpoint

def get_diagnosis(ehrid):
    """
    Function that retrieves measurements data for a patient
    Parameters: ehrid, string, identifier for a patient
    Returns: List with dicts (1-3 dicts) with currently only a string (the medical diagnosis)
    """

    aql = """SELECT y/data[at0001]/items[at0009]/value as diagnos
        FROM EHR e
        CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.encounter.v1]
        CONTAINS EVALUATION y[openEHR-EHR-EVALUATION.problem_diagnosis.v1] 
        WHERE c/name/value='Medical diagnosis' and e/ehr_id/value = '%s'
        OFFSET 0""" %ehrid

    response = query(aql)
    to_return = []
    for diagnosis in response['resultSet']:
        to_return.append({"Diagnosis" : diagnosis['diagnos']['value']})
    return to_return



def get_all_parties():
    response = requests.get(baseurl + "/demographics/party/query?email=*@fejka.nu", verify=True, auth=(wu, wp)
    )
    return response.json() if response.ok else response

def get_all_measurements():
    aql = """SELECT x/data[at0002]/events[at0003]/data[at0001]/items[at0004,'Pulse Rate']/value as pulse,
       a/data[at0001]/events[at0002]/data[at0003]/items[at0011]/value as exercise,
       o/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value as bodyweight,
       w/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value as bloodsugar,
       i/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value as systolic,
       i/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value as diastolic,
       w/data[at0001]/events[at0002]/time/value as time,
       e/ehr_id/value as eid
       FROM EHR e
       CONTAINS COMPOSITION c
       CONTAINS (OBSERVATION x[openEHR-EHR-OBSERVATION.pulse.v1] and 
       OBSERVATION a[openEHR-EHR-OBSERVATION.physicalactivityrecord.v0] and 
       OBSERVATION o[openEHR-EHR-OBSERVATION.body_weight.v2] and 
       OBSERVATION w[openEHR-EHR-OBSERVATION.blood_glucose.v1] and 
       OBSERVATION i[openEHR-EHR-OBSERVATION.blood_pressure.v2]) 
       ORDER BY time""" 
    response = query(aql)
    to_return= []
    for measurement in response['resultSet']:
        
        time = measurement['time'][:10]
        to_return.append(
                        { "Pulse: " : measurement['pulse']['magnitude'],
                          "Exercise: ":measurement['exercise']['magnitude'],
                          "Weight: " : measurement['bodyweight']['magnitude'],
                          "Diastolic: " : measurement['diastolic']['magnitude'],
                          "Systolic: " : measurement['systolic']['magnitude'],
                          "Bloodsugar: " : measurement['bloodsugar']['magnitude'],
                          "Time: " : time,
                          "ehrid" : measurement['eid']
                          } #need to reformat time-strings, currently in format "2020-11-13T12:46:36+01:00" for example
                          )
    return to_return
def get_overview():
    measurements = get_all_measurements()
    
    start = time.time()
    response = get_all_parties()
    parties = response['parties']

    to_return = []

    measurement = None
    for party in parties:
        ehrid = party['additionalInfo']['ehrId']
        more_info = party["additionalInfo"]

        for m in measurements:
            try:
                if ehrid == m['ehrid']:
                    m.pop("ehrid")
                    measurement = m
            except Exception:
                print(m)
        measurements.remove(m)
        diagnosis = get_diagnosis(ehrid)
       
        personal_details = {
            "Name": party["firstNames"] + " " + party["lastNames"],
            "EhrID": more_info["ehrId"],
            "PNR": more_info["pnummer"],
            "Gender": more_info["gender"],
            "City": more_info["city"],
            "Address": more_info["adress"],
            "Age": more_info["age"],
            "Phone": more_info["phone"],
            "Email": more_info["email"],
            "Team" : more_info["team"], #is now a list so it can contain more than 1 team
            "Department" : more_info["department"], #for now department is still string, but will be made into list like team soon
            "Contactperson" : more_info["contactperson"],  #Dict containing Name (string on form "Firstname Lastname" and phonenummer)
            "Operation" : more_info["operation"],
            "Diagnosis" : diagnosis,
            "Measurement" : measurement
        }


        to_return.append(personal_details)
    stop = time.time()
    print(stop-start)
    return to_return





    