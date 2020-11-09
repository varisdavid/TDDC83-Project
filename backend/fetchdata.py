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