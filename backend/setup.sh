apt-get update
apt-get install -y --no-install-recommends default-libmysqlclient-dev
pip install mod-wsgi==4.7.1
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
mod_wsgi-express start-server --working-directory . --reload-on-changes backend/wsgi.py --user www-data --group www-data
