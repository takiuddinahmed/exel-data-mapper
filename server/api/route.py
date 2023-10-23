from flask import Blueprint, Response, jsonify, request
from .handlefile.file import upload_file, load_data, raw_data_to_dict
from .data.filedata import FileData
from .data.mappeddata import MappedData
import os
from mongoengine import connect, connection
import json


api_bp = Blueprint("api", __name__, url_prefix="/api")

@api_bp.get("/")
def index()-> Response:
    data = MappedData.objects()
    print(data)
    return data.to_json()

@api_bp.post("/upload")
def handleUpload()->Response:
    uploadedFile = request.files['file']
    if uploadedFile:
        filename = upload_file(uploadedFile=uploadedFile)
        filedata = FileData(filename=filename,uploaded=False)
        filedata.save()
        return jsonify({"success": True, "filename": filename})
    return jsonify({"success": False})

@api_bp.get("/upload/<filename>")
def getFileDetails(filename: str)->Response:
    try:
        print(filename)
        filedatas = FileData.objects(filename=filename)
        if filedatas.count:
            filedata = filedatas[0]
            if not filedata.uploaded:
                raw_data = load_data(filename)
                data = raw_data_to_dict(raw_data)
                unique_product_types = list(set([ dict['Type of Product'] for dict in data ]))
                tax_types = ['Standard Rate Type', 'Reverse charge','GAT tax']

                return jsonify({
                    "product_types": unique_product_types,
                    "tax_types": tax_types
                })
            else:
                return jsonify({"error": True, "message":"File data already updated to database"})
        return jsonify({"error": True, "message":"Invalid file"})
    except:
        return jsonify({"error": True, "message":"Invalid file"})
    
@api_bp.post("/upload/<filename>")
def mapData(filename: str):
    try:
        json_data = request.json
        filedatas = FileData.objects(filename=filename)
        if filedatas.count:
            filedata = filedatas[0]
            if not filedata.uploaded:
                raw_data = load_data(filename)
                data = raw_data_to_dict(raw_data)
                
                for single_data in data:
                    single_data['Tax Type'] = json_data[single_data['Type of Product']]
                    mapped_data_to_save = MappedData(product_name= single_data['Product Name'],description=single_data['Description'],product_type=single_data['Type of Product'], tax_type=json_data[single_data['Type of Product']])
                    mapped_data_to_save.save()
                
                filedatas.update_one(uploaded=True)
                return jsonify(data)
            else:
                return jsonify({"error": True, "message":"File data already updated to database"})
        return jsonify({"error": True, "message":"Invalid file"})
    except:
        return jsonify({"error": True, "message":"Invalid file"})
    