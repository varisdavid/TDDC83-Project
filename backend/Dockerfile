FROM python:3.6.9-slim-buster

WORKDIR /app
# We copy just the requirements.txt first to leverage Docker cache
COPY ./req.txt .

RUN \
    apt-get update && apt-get install -y build-essential && apt-get install -y python3-pip

RUN pip3 install -r req.txt --no-cache-dir

#ENV FLASK_DEBUG=1
COPY . .
RUN pip3 list
RUN flask
EXPOSE 3000

CMD ["gunicorn", "create_app", "-b", "0.0.0.0:3000"]