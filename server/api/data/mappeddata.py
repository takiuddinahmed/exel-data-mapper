from mongoengine import *

class MappedData(Document):
    product_name = StringField()
    description = StringField()
    product_type = StringField()
    tax_type = StringField()
