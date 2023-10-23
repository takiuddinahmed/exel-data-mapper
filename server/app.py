from flask import Flask
from .api.route import api_bp
from mongoengine import connect
import os

MONGODB_URI = os.environ.get('MONGODB_URI')

print(f"Mongdb uri - {MONGODB_URI}")

if not MONGODB_URI:
    print("NO Mongodb uri")
    

def create_app():
    app = Flask(__name__)
    app.secret_key = 'aldkfjalkf'
    app.register_blueprint(api_bp)
    c = connect(host=MONGODB_URI)
    print(c)
    return app

app = create_app()



