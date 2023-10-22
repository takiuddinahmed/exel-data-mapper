from cgi import FieldStorage
import os
from werkzeug.utils import secure_filename
from random import random

def upload_file(uploadedFile: FieldStorage)-> str:
    """
    Save the file and return the filename
    """
    filename = str(int(random() * 1000000)) + "-" + secure_filename(uploadedFile.name)  + ".xlsx";
    dir_path = os.path.join(os.path.dirname(os.path.realpath(__file__)),"uploads")
    if not (os.path.exists(dir_path)):
        os.mkdir(dir_path)
    uploadedFile.save(os.path.join(dir_path, filename))
    return filename