import requests
import os
from dotenv import load_dotenv

load_dotenv()

wu = os.environ.get("EHRSCAPE_USERNAME")
wp = os.environ.get("EHRSCAPE_PASSWORD")

baseurl = 'https://rest.ehrscape.com/rest/v1'

no_of_patients = 10

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
        random.shuffle(medications_copy)
        meds = medications_copy.pop()
        payload["medications/medication_instruction:0/order:0/medicine"] = meds
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
    }
    print("hej")
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
    a= 12
    b = 1*12
    c = a/12
    if (c==1):
        print("då")
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

    phys_act = random.choice(range(1,5))
    payload =  {"ctx/language" :"en",
        "ctx/territory": "US",
        "ctx/composer_name" :"Lokalt Optimum",
        "ctx/id_namespace" : "jaha",
        "ctx/participation_function" : "ingen aning",
        "measurements-c3/blood_pressure/any_event:0/systolic|magnitude" : systolic, #changed in loop below
        "measurements-c3/blood_pressure/any_event:0/diastolic|magnitude" : diastolic, #also changed
        "measurements-c3/body_weight/any_event:0/weight|magnitude" : weight, # also changed
        "measurements-c3/body_weight/any_event:0/weight|unit" : "kg",
        "measurements-c3/blood_glucose/any_event:0/blood_glucose|magnitude" : bloodsugar, #also changed
        #"measurements-c3/blood_glucose/any_event:0/blood_oxygen" : oxygen, #also changed
        "measurements-c3/physicalactivityrecord/any_event/type_of_exercise|code" : physical_activity, #also changed
        "measurements-c3/physicalactivityrecord/any_event/duration|magnitude" : phys_act,
        "measurements-c3/pulse_heart_beat/any_event:0/pulse_rate|magnitude" : pulse #also changed

        }
    for i in range(5, random.randint(5, 10)):
        payload["measurements-c3/blood_pressure/any_event:0/systolic|magnitude"] += random.choice(max_delta_bp)
        payload["measurements-c3/blood_pressure/any_event:0/diastolic|magnitude"] -= random.choice(max_delta_bp)
        payload["measurements-c3/body_weight/any_event:0/weight|magnitude"] += random.choice(max_delta_weight)
        payload["measurements-c3/pulse_heart_beat/any_event:0/pulse_rate|magnitude"] += random.choice(max_delta_pulse)
        payload["measurements-c3/blood_glucose/any_event:0/blood_glucose|magnitude"] += random.choice(max_delta_bloodsugar)
        #payload["measurements-c3/blood_glucose/any_event:0/blood_oxygen"] += random.choice(max_delta_oxygen)
        payload["measurements-c3/physicalactivityrecord/any_event/type_of_exercise|code"] = random.choice(physical_activities)
        payload["measurements-c3/physicalactivityrecord/any_event/duration|magnitude"] = random.choice(range(1,5))
        payload["measurements-c3/physicalactivityrecord/any_event/duration|unit"] = "min"

        response = requests.post(baseurl+'/composition?templateId='+templateid+"&ehrId="+ehrid,
                                    verify=True,
                                    auth=(wu,wp),
                                    headers={"Content-Type":"application/json"},
                                    json=payload)
