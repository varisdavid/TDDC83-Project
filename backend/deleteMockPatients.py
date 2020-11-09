"""
Script that is only intended for one-time use. It deletes all the patient data created by us in the ehrScape DB
The (fake) patient data is in turn created in the script createMockPatients.py
"""

#for REST-api calls
import requests
#for getting values of environment variables, effectively the login information
import os
#for setting the values of environment variables as defined in .env file
from dotenv import load_dotenv

#set the environment variables containing the login with write-access, located in .env (excluded from git-pushes)
load_dotenv()
#get the values of the environment variables
wu = os.environ.get("EHRSCAPE_USERNAME")
wp = os.environ.get("EHRSCAPE_PASSWORD")

#baseurl for all calls to the ehrscape REST-api
baseurl = 'https://rest.ehrscape.com/rest/v1'

#AQL query-strings
#Selects all ehrids (unique identifier for a patient) that we have created, i.e our patients
aql_get_mock_patient_ehrids = """SELECT e/ehr_id/value as id
FROM EHR e
CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.encounter.v1]
WHERE c/name/value='EHR-PUM-C3'
OFFSET 0"""

#Selects all composition ids from compositions we have done, with a patient (ehrId, so our patient), with the template personinfo
aql_get_personinfo_uid = aql = """SELECT c/uid/value as uid,
e/ehr_id/value as id
FROM EHR e
CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.personinfo.v0]
WHERE c/name/value='personinfo' AND id='%s'
OFFSET 0
"""
#FUNKAR OVAN?

#Selects all composition ids from compositions we have done based on template Medications and a specific patient
aql_get_medications_uid = """SELECT c/uid/value as uid, e/ehr_id/value as id
FROM EHR e
CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.encounter.v1]
WHERE c/name/value='Medications' AND id='%s'
OFFSET 0"""
#Selects all composition ids from compositions we have done based on template Medical Diagnosis and a specific patient
aql_get_medicaldiagnosis_uid= """SELECT c/uid/value as uid, e/ehr_id/value as id
FROM EHR e
CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.encounter.v1]
WHERE c/name/value='Medical diagnosis' AND id ='%s'
OFFSET 0"""
#Selects all composition ids from compositions we have done based on template Measurements-C3 (our own template) and a specific patient
aql_get_measurements_uid = """SELECT c/uid/value as uid, e/ehr_id/value as id
FROM EHR e
CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.encounter.v1]
WHERE c/name/value='Measurements-C3' and id = '%s'
OFFSET 0"""

aql_get_ehrpumc3_uid ="""SELECT e/ehr_id/value as id, c/uid/value as uid
FROM EHR e
CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.encounter.v1]
WHERE c/name/value='EHR-PUM-C3' AND id = '%s'
OFFSET 0"""

#function that runs an AQL-query via the REST-api, returns the results in json-format
def query(aql):
    response = requests.get(baseurl+'/query/?aql=' + aql,
                            verify= True,
                            auth = (wu,wp)
                            )
    return response.json() if response.ok else response


#function that deletes a specific composition based on the composition id (uid) earlier retrieved with AQL
def deleteComposition(uid):
    response = requests.delete(baseurl + '/composition/'+uid,
                                verify=True,
                                auth=(wu,wp))
    return response.json() if response.ok else response

#function that gets the party-id for a specific patient, i.e the id of the party containing the personal details of the patient
def getPartyId(ehrid):
    response = requests.get(baseurl +"/demographics/party/query?ehrId=" + ehrid,
                            verify=True,
                            auth=(wu,wp))
    return response.json() if response.ok else response
#function that deletes the demographic party data for a patient, using the id of the so called party
def deleteDemographicData(partyId):
    response = requests.delete(baseurl + "/demographics/party/" + partyId,
                               verify=True,
                               auth=(wu,wp))
    return response.json() if response.ok else response



# SHOWS DEMOGRAPHICS FOR EACH EHRID
"""
for d in query(aql_get_mock_patient_ehrids)['resultSet']:
    id = d['id']
    parties = getPartyId(id)
    #print(id)
    for party in parties['parties']:
        partyid = party['id']
        #print(partyid)
"""


#Script below
ehrids = query(aql_get_mock_patient_ehrids)
for ehrid_dict in ehrids['resultSet']:
    #for each ehr id
    ehrid = ehrid_dict['id']
        
    #get personinfo composition ids
    try:
        personinfo_uids = query(aql_get_personinfo_uid % ehrid)
        #delete these compositions
        for uid_dict in personinfo_uids['resultSet']:
            uid = uid_dict['uid']
            deleteComposition(uid)
    except Exception:
        pass
    #get PUM-C3 composition ids

    try:
        pum_c3_uids = query(aql_get_ehrpumc3_uid % ehrid)
        #delete these compositions
        for uid_dict in pum_c3_uids['resultSet']:
            uid = uid_dict['uid']
            deleteComposition(uid)
    except Exception:
        pass

    #get medications composition ids
    try:
        medications_uids = query(aql_get_medications_uid % ehrid)
        #delete these compositions
        for uid_dict in medications_uids['resultSet']:
            uid = uid_dict['uid']
            deleteComposition(uid)
    except Exception:
        pass
    
    #get medical diagnosis composition ids   
    try:
        medicaldiagnosis_uids = query(aql_get_medicaldiagnosis_uid % ehrid)
        #delete these compositions
        for uid_dict in medicaldiagnosis_uids['resultSet']:
            uid = uid_dict['uid']
            deleteComposition(uid)
    except Exception:
        pass
        
    #get demographics party id    
    try:
        parties = getPartyId(ehrid)
        for party in parties['parties']:
            partyid = party['id']
            #delete the party
            deleteDemographicData(partyid)
    except Exception:
        pass
    
    #get measurements composotion ids (will be multiple per patient)   
    try:
        measurements_uids = query(aql_get_measurements_uid % ehrid)
        #delete these compositions
        for uid_dict in measurements_uids['resultSet']:
            uid = uid_dict['uid']
            deleteComposition(uid)
    except Exception:
        pass

