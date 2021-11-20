#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z 'db' 5432; do
  sleep 1
done

echo "PostgreSQL started"

./src/manage.py collectstatic --noinput
psql postgresql://postgres:postgres@db:5432/postgres -f dbdump.sql
cd src
python3 manage.py migrate
python3 manage.py sqlsequencereset easyviewer | python3 manage.py dbshell
python3 manage.py runserver 0.0.0.0:8000

exec "$@"
