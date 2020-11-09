import requests

import os
from dotenv import load_dotenv

load_dotenv()

wu = os.environ.get("EHRSCAPE_USERNAME")
wp = os.environ.get("EHRSCAPE_PASSWORD")

baseurl = 'https://rest.ehrscape.com/rest/v1'

no_of_patients = 5

medications = ["Ipren", "Alvedon", "Treo-comp", "Voltaren", "Humira", "Abilify", "Enbrel", "Crestor", "Lantus Solostar", "Sovaldi","Advair Diskus", "Nexium", "Januvia", "Lyrica", "Galvus", "Xanax", "Tramadol", "Genotropin", "Cytostatika", "Emtriva"]
diagnosis = ["Covid", "Diabetes", "Cancer", "HIV", "IBS", "Crohns", "Alzheimers", "Borrelia", "Brutet nyckelben", "Korsbandsskada",
			"Cystisk fibros", "ALS", "Multipel skleros", "Diskbråck", "Gula febern", "Ebola", "Hypertoni"]

department = ["Ryds Vårdcentral", "Capio Vårdcentral Berga", "Jourcentralen LInköping", "Jourcentralen Motala","Vårdcentralen Linghem",
                "Valla Vårdcentral", "Capio Vårdcentral Vasastaden LInköping"]
team = ["Dermotologi", "Geriatrik", "Onkologi", "Kardiologi", "Öra, näsa & hals", "Kirurgi", "Anestesiologi", "Neurologi",
             "Gynekologi", "Urologi", "Ortopedi"]

response = requests.post("https://fejka.nu/?json=1&num="+str(no_of_patients))
all_personalinfo = response.json()

for person in all_personalinfo:
    response = requests.post(baseurl + '/ehr'
                                    , verify=True,
                                    auth = (wu,wp))
    print("SKAPA EHRID: " + str(response))
    ehrid = response.json()['ehrId']
    print(ehrid)
    #Create personal details party in demographics
    response = requests.post(baseurl + '/demographics/party',
                            verify = True,
                            auth =(wu,wp),
                            headers = {"Content-Type" : "application/json"},
                            json = {
                                    "firstNames" : person['fname'],
                                    "lastNames" : person['lname'],
                                    "additionalInfo" : 
                                    {"ehrId" : ehrid, 
                                    "pnummer" : person['pnr_full'],
                                    "gender" : person['gender'],
                                    "email" : person['email'],
                                    "city" : person['city'],
                                    "adress": person['address'],
                                    "phone": person['phone'],
                                    "age" : 2020-int(person['pnr_full'][:4])} }
                            )#kontaktperson från fejka.nu
                            templateid="Medications"
    payload = {
    "ctx/language" : "en",
    "ctx/territory" : "SV",
    "ctx/composer_name": "Lokalt Optimum",
    "ctx/id_namespace" : "Ryds VC",
    "ctx/participation_name" : "Dr L. Äkare",
    "ctx/participation_function" : "Onkolog",
    "medications/context/context_detail:0/tags:0" : "hejgatan 123",
    "medications/medication_instruction:0/_uid" : "vem fan vet",

    "medications/medication_instruction:0/order:0/medicine" : "Medicine", #Value to be changed in loop below

    "medications/medication_instruction:0/order:0/directions" : "Varje halvtimme",
    "medications/medication_instruction:0/order:0/dose/description" : "I'm not a doctor"
    }
    #each patient will take a random number (between 1 and 3) of different medications
    medications_copy = medications[:]
    for i in range(0, random.randint(1,3)):
        #make random choice from list of predefined
        random.shuffle(medications_copy)
        meds = medications_copy.pop()
        #change the medicine value in the dict
        payload["medications/medication_instruction:0/order:0/medicine"] = meds
        #POST call to create composition based on template Medications
        response = requests.post(baseurl + '/composition?' + "templateId="+templateid + "&" + "ehrId="+ehrid,
                                verify=True,
                                auth = (wu,wp),
                                headers={"Content-Type" : "application/json"},
                                json = payload
                                )
        print("POST MEDICACATION: " + str(response))