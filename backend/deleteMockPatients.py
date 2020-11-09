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


aql_get_mock_patient_ehrids = """SELECT e/ehr_id/value as id
FROM EHR e
CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.encounter.v1]
WHERE c/name/value='EHR-PUM-C3'
OFFSET 0"""  
def query(aql):
    response = requests.get(baseurl+/'query/?aql=' + aql,
                            verify= True,
                            auth = (wu,wp)
                            )
    return response.json() if response.ok else response

aql_get_personinfo_uid = aql = """SELECT c/uid/value as uid,
e/ehr_id/value as id
FROM EHR e
CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.personinfo.v0]
WHERE c/name/value='personinfo' AND id='%s'
OFFSET 0
"""

aql_get_medications_uid = """SELECT c/uid/value as uid, e/ehr_id/value as id
FROM EHR e
CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.encounter.v1]
WHERE c/name/value='Medications' AND id='%s'
OFFSET 0"""


#Selects all composition ids from compositions we have done, with a patient (ehrId, so our patient), with the template personinfo
aql_get_personinfo_uid = aql = """SELECT c/uid/value as uid,
e/ehr_id/value as id
FROM EHR e
CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.personinfo.v0]
WHERE c/name/value='personinfo' AND id='%s'
OFFSET 0
"""

aql_get_medications_uid = """SELECT c/uid/value as uid, e/ehr_id/value as id
FROM EHR e
CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.encounter.v1]
WHERE c/name/value='Medications' AND id='%s'
OFFSET 0"""
aql_get_medicaldiagnosis_uid= """SELECT c/uid/value as uid, e/ehr_id/value as id
FROM EHR e
CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.encounter.v1]
WHERE c/name/value='Medical diagnosis' AND id ='%s'
OFFSET 0"""
aql_get_measurements_uid = """SELECT c/uid/value as uid, e/ehr_id/value as id
FROM EHR e
CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.encounter.v1]
WHERE c/name/value='Measurements-C3' and id = '%s'
OFFSET 0"""
