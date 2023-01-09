from flask import Flask
from flask_cors import CORS
from flask_restx import Api, Resource
from flask import request
import json

app = Flask(__name__)

CORS(app, support_credentials=True, resources={r'/backend/*': {"origins": "*"}})


api = Api(app, version='1.0', title='API',
          description='')

testApp = api.namespace('backend', description='')


@testApp.route('/test')
@testApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TestOps(Resource):
    def post(self):
        print(request.data)
        print(request.form)

if __name__ == '__main__':
    app.run(debug=True)