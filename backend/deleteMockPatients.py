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


#OLD QUERY BELOW
"""SELECT e/ehr_id/value as id, c/content[openEHR-EHR-ADMIN_ENTRY.personinfo.v0]/data[at0001]/items[at0003]/value/value as tfn
FROM EHR e
CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.personinfo.v0]
WHERE c/name/value='personinfo' AND tfn = '112123123'
OFFSET 0"""

#Selects all composition ids from compositions we have done, with a patient (ehrId, so our patient), with the template personinfo
aql_get_personinfo_uid = aql = """SELECT c/uid/value as uid,
e/ehr_id/value as id
FROM EHR e
CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.personinfo.v0]
WHERE c/name/value='personinfo' AND id='%s'
OFFSET 0
"""


def deleteComposition(uid):
    response = requests.delete(baseurl + '/composition/'+uid,
                                verify=True,
                                auth=(wu,wp))
    return response.json() if response.ok else response

def getPartyId(ehrid):
    response = requests.get(baseurl +"/demographics/party/query?ehrId=" + ehrid,
                            verify=True,
                            auth=(wu,wp))
    return response.json() if response.ok else response
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


