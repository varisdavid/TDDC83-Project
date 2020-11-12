import requests
import json

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
            "Team" : more_info["team"],
            "Department" : more_info["department"]
        }
        to_return.append(personal_details)
    return to_return

