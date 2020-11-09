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
