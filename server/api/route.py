from flask import Blueprint, Response, jsonify

api_bp = Blueprint("api", __name__, url_prefix="/api")

@api_bp.get("/")
def index()-> Response:
    return jsonify("Hello world!!")