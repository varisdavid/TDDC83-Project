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
initial_systolic_range = range(100,200)
initial_diastolic_range = range(70, 150)
max_delta_bp = range(-15,15)
initial_pulse_range = range(50,100)
max_delta_pulse = range(-10,10)
initial_weight_range = range(40,200)
max_delta_weight = range(-5,5)
initial_bloodsugar_range = range(3,9)
max_delta_bloodsugar = range(-1,1)
initial_oxygen_range = range(70, 100)
max_delta_oxygen = range(-5,5)
physical_activities = ["at0005","at0006","at0007","at0008","at0009"]

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
           templateid = "Medical Diagnosis"
    payload = {
    "ctx/language" : "en",
    "ctx/territory" : "SV",
    "ctx/composer_name": "Lokalt Optimum",
    "ctx/id_namespace" : "Ryds VC",
    "ctx/participation_name" : "Dr L. Äkare",
    "ctx/participation_function" : "Onkolog",
    "medical_diagnosis/context/context_detail:0/tags:0" : "hejgatan 123",

    "medical_diagnosis/problem_diagnosis:0/clinical_description" : "Medical Diagnosis", #this value is to be changed in loop below

    "medical_diagnosis/problem_diagnosis:0/date_of_onset" : "2010-10-10T20:20",
    "medical_diagnosis/problem_diagnosis:0/date_of_resolution_remission" : "2020-10-01T19:30",
    "medical_diagnosis/problem_diagnosis:0/comment" : "I'm not a doctor",
    "medical_diagnosis/problem_diagnosis:0/link_to_supporting_medical_documentation" : "google.com",
    "medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/active_status_comment" :"s" ,
    "medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/priority/text_value" :"Priority 89",
    "medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/summarisation/boolean_value" : "True"
    }
    #Each patient can have a random number (between 1 and 3) of diagnosises
    diagnosis_copy = diagnosis[:]
    for i in range(0, random.randint(1,3)):
        #randomly select a diagnosis from predefined list
        random.shuffle(diagnosis_copy)
        diag = diagnosis_copy.pop() 
        #change value in dict
        payload["medical_diagnosis/problem_diagnosis:0/clinical_description"] = diag
        #POST call to create new composition based on template Medical Diagnosis
        response = requests.post(baseurl + '/composition?' + "templateId="+templateid + "&" + "ehrId="+ehrid,
                                verify=True,
                                auth = (wu,wp),
                                headers={"Content-Type" : "application/json"},
                                json = payload
                                )
        print("POST MEDICAL DIAGNOSIS: "+ str(response))
#Create auxiliary composition for easier retrieval of ehrId when fetching data later
    #our own template containing nothing (apart from the ehr-id)
    templateid = "EHR-PUM-C3"
    #this dict is not important
    payload ={
    "ctx/language" : "en",
    "ctx/territory" : "US",
    "ctx/composer_name": "Lokalt Optimum",
    "ctx/id_namespace" : "Ryds VC",
    "ctx/participation_name" : "Dr L. Äkare",
    "ctx/participation_function" : "Onkolog",
    }
    #POST call to create composition using our template EHR-PUM-C3 effectively only storing the ehrid
    #enables simpler querying of ehr ids
    response = requests.post(baseurl + '/composition?' + "templateId="+templateid + "&" + "ehrId="+ehrid,
                            verify=True,
                            auth = (wu,wp),
                            headers={"Content-Type" : "application/json"},
                            json = payload
                            )
    print("POST EHR-C3: " + str(response))
   

   
    diastolic = random.choice(initial_diastolic_range)
    systolic = random.choice(initial_systolic_range)
    pulse = random.choice(initial_pulse_range)
    weight = random.choice(initial_weight_range)
    bloodsugar = random.choice(initial_bloodsugar_range)
    oxygen = random.choice(initial_oxygen_range)
    physical_activity = random.choice(physical_activities)