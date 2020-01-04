FROM python:3.8.0-buster
MAINTAINER yurabraiko@gmail.com

RUN mkdir /app

WORKDIR /app

RUN /bin/bash -c "apt-get update && apt-get install -y postgresql-client"

COPY ./requarements.txt /tmp/requarements.txt

RUN pip install -r /tmp/requarements.txt