from flask import Flask
from .api.route import api_bp

def create_app():
    app = Flask(__name__)
    app.secret_key = 'aldkfjalkf'
    app.register_blueprint(api_bp)

    return app

