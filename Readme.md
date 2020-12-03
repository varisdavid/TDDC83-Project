# Jest + Selenium

## Getting started

```bash
#Download npm 
mkdir testFolder; cd testFolder
git clone -b "testingBranch" https://gitlab.liu.se/tddc88-company-3-2020/deploy.git
mkdir appFolder; cd appFolder
git clone -b "DEVELOPMENT_MAINLINE" https://gitlab.liu.se/tddc88-company-3-2020/deploy.git
cd deploy
npm install; npm audit fix
npm start
#This should start the web app.
#Open another terminal window
cd testFolder; cd deploy; cd test
npm install;
#download and install geckodriver for firefox
npm install selenium-webdriver
npm run test
```
