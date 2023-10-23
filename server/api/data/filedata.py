from mongoengine import *

class FileData(Document):
    filename = StringField()
    uploaded = BooleanField()