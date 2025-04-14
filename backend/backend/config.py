import os

class DbConfig(object):
    #SQLALCHEMY_DATABASE_URI = "postgresql://webstore_user:12345@127.0.0.1:5432/webstore_database"
    # Use the name of the service defined in docker-compose.yml (db), not 127.0.0.1
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:postgres@db:5432/mydb')
    #SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL') 
    SQLALCHEMY_TRACK_MODIFICATIONS = False
