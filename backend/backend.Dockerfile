FROM python:3.8.0-buster
MAINTAINER yurabraiko@gmail.com

RUN mkdir /app

WORKDIR /app

COPY ./requarements.txt /app/requarements.txt

RUN pip install -r /app/requarements.txt