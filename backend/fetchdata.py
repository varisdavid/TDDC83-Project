import requests
import json

wu = "lio.se1"
wp = "lio.se123"

baseurl = 'https://rest.ehrscape.com/rest/v1'

def query(aql):
    response = requests.get(baseurl+'/query/?aql=' + aql,
                            verify= True,
                            auth = (wu,wp)
                            )
    return response.json() if response.ok else response

def getParty(ehrid):
    response = requests.get(baseurl +"/demographics/party/query?ehrId=" + ehrid,
                            verify=True,
                            auth=(wu,wp))
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
    list_of_dicts_with_ehrids = response['resultSet']
    for ehrid_dict in list_of_dicts_with_ehrids:
        ehrid = ehrid_dict['id']
        party = getParty(ehrid)
        names = party['parties'][0]
        more_info = names['additionalInfo']
        personal_details = {"Förnamn": names['firstNames'], "Efternamn" : names['lastNames'],
                            "ehrid" : more_info['ehrId'], "personnummer" : more_info['pnummer'],
                            "Kön" : more_info['gender'], "Stad" :more_info['city'],
                            "Address" : more_info['adress'], "Ålder" : more_info['age'],
                            "Telefon" : more_info['phone'], "Email" : more_info['email'] }
        to_return.append(personal_details)
    print(to_return)
    return to_return
get_all_patients_personal_details()




def endpoint2():
    """
    namn
    pnr
    diagnos(er)
    kön
    ålder
    team
    department
    PER PATIENT
    """
    pass
def endpoint3():
    """
    filtrera baserat på
    minAge
    maxAge
    gender
    team
    department
    priority
    diagnos
    """
    pass
def endpoint4(diagnosis):
    """
    sökning som returnerar de patienter (namn osv?) baserat på diagnos
    """
    pass

def endpoint5():
    pass
    #går ej

def endpoint6():
    """
    till rule-engine
    measurements historisk data för en patient
    """
    pass