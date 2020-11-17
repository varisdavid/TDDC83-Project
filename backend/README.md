Get going:

Start your virtual environment:
With windows:

0. Navigate to stand inside backend
1. python -m venv venv
2. pip install -r req.txt 3.
3. Navigate out one step (cd ..)
4. python run_server.py

4.1. If you want to use commands connected to the database you can do:
4.2. set FLASK_APP=run_server.py
4.3. set FLASK_ENV=development
4.4 flask cli <command> (atm only "resetDB" does something, you can alter commands in backend/cli_commands.py)
You can also start the server with flask run if you configure FLASK_APP and FLASK_ENV.
