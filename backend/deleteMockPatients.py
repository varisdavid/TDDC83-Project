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

