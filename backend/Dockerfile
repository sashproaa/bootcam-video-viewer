FROM python:3.7.4-alpine3.10

LABEL maintainer="naorye"

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

COPY ./requirements requirements

RUN apk add --no-cache \
    ca-certificates gcc postgresql-dev linux-headers musl-dev \
    libffi-dev jpeg-dev zlib-dev git postgresql-client
#RUN apt-get install build-essential libssl-dev libffi-dev python-dev

RUN pip install -U pip
#RUN pip install cryptography
RUN pip install -r /app/backend/requirements/dev.txt

#COPY src src

#COPY .env .env

COPY ./entrypoint.sh entrypoint.sh

EXPOSE 8000


# run entrypoint.sh
#CMD /app/backend/entrypoint.sh


