from flask import Blueprint, Response, jsonify, request
from .handlefile.file import upload_file
import os


api_bp = Blueprint("api", __name__, url_prefix="/api")

@api_bp.get("/")
def index()-> Response:
    return jsonify("Hello world!!")

@api_bp.post("/upload")
def handleUpload()->Response:
    uploadedFile = request.files['file']
    if uploadedFile:
        filename = upload_file(uploadedFile=uploadedFile)
        return jsonify({"success": True, "filename": filename})
    return jsonify({"success": False})