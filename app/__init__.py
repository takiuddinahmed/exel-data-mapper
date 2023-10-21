
from flask import Flask, render_template
from flask_mongoengine import MongoEngine
from flask_bootstrap import Bootstrap5


app = Flask(__name__)

# config
# app.config['MONGODB_SETTINGS'] = {
#     "db": "myapp",
# }

# initialize

# db = MongoEngine(app)
bootstrap = Bootstrap5(app)

@app.get('/')
def renderIndex():
    return render_template('index.html')
