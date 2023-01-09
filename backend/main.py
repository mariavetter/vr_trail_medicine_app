from flask import Flask
from flask_cors import CORS
from flask_restx import Api, Resource, fields
from flask import request
import json

from model.userModel import User
from model.runModel import Run
from model.task1Model import Task1
from model.task2Model import Task2
from model.task3Model import Task3

from service.mapper import Mapper
from controller import Controller

app = Flask(__name__)

CORS(app, support_credentials=True, resources={r'/backend/*': {"origins": "*"}})


api = Api(app, version='1.0', title='API',
          description='')

medicineApp = api.namespace('backend', description='')

user = api.model('User', {
    'id': fields.Integer(attribute='_id', description='Id'),
    'name': fields.String(attribute='_name', description='Name'),
    'age': fields.Integer(attribute='_age', description='Age'),
})

run = api.model('Run', {
    'id': fields.Integer(attribute='_id', description='ID'),
    'date': fields.String(attribute='_date', description='Date'),
    'user_iduser': fields.Integer(attribute='_user_iduser', description='Iduser'),
})

task1 = api.model('Task1', {
    'id': fields.Integer(attribute='_id', description='ID'),
    'duration': fields.Float(attribute='_duration', description='Duration'),
    'run_id': fields.Integer(attribute='_run_id', description='Idrun'),
})

task2 = api.model('Task2', {
    'id': fields.Integer(attribute='_id', description='ID'),
    'duration': fields.Float(attribute='_duration', description='Duration'),
    'wrongtiles': fields.Integer(attribute='_wrongtiles', description='Wrongtiles'),
    'durationTiletoTile': fields.Float(attribute='_durationTiletoTile', description='DurationTiletoTile'),
    'run_id': fields.Integer(attribute='_run_id', description='Idrun'),
})

task3 = api.model('Task3', {
    'id': fields.Integer(attribute='_id', description='ID'),
    'duration': fields.Float(attribute='_duration', description='Duration'),
    'wrongAssignment': fields.Integer(attribute='_wrongAssignment', description='WrongAssignment'),
    'run_id': fields.Integer(attribute='_run_id', description='Idrun'),
})

@medicineApp.route('/user')
@medicineApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class UserOps(Resource):
    @medicineApp.marshal_list_with(user)
    def get(self):
        controller = Controller()
        result = controller.get_all_user()
        return result

    @medicineApp.marshal_list_with(user)
    @medicineApp.expect(user)
    def post(self):
        controller = Controller()
        user = User.from_dict(api.payload)

        if user is not None:
            controller.post_user(user)
            return 200
        else: 
            return '', 500

@medicineApp.route('/user-by-id/<int:id>')
@medicineApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class UserOps(Resource):
    @medicineApp.marshal_list_with(user)
    def get(self, id):
        controller = Controller()
        result = controller.get_user_by_id(id)
        return result

@medicineApp.route('/run-by-iduser/<int:id>')
@medicineApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class RunOps(Resource):
    @medicineApp.marshal_list_with(run)
    def get(self, id):
        controller = Controller()
        result = controller.get_run_by_userid(id)
        return result

@medicineApp.route('/runs')
@medicineApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class RunOps(Resource):
    @medicineApp.marshal_list_with(run)
    def get(self):
        controller = Controller()
        result = controller.get_all_runs()
        return result

    @medicineApp.marshal_list_with(run)
    @medicineApp.expect(run)
    def post(self):
        controller = Controller()
        print(api.payload)
        run = Run.from_dict(api.payload)

        if run is not None:
            controller.post_run(run)
            return 200
        else: 
            return '', 500

@medicineApp.route('/task1')
@medicineApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class RunOps(Resource):
    @medicineApp.marshal_list_with(task1)
    @medicineApp.expect(task1)
    def post(self):
        controller = Controller()
        task1 = Task1.from_dict(api.payload)

        if task1 is not None:
            controller.post_task1(task1)
            return 200
        else: 
            return '', 500

@medicineApp.route('/task1-by-id/<int:id>')
@medicineApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class Task1Ops(Resource):
    @medicineApp.marshal_list_with(task1)
    def get(self, id):
        controller = Controller()
        result = controller.get_task1_by_id(id)
        return result

@medicineApp.route('/task2')
@medicineApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class Task2Ops(Resource):
    @medicineApp.marshal_list_with(task2)
    @medicineApp.expect(task2)
    def post(self):
        controller = Controller()
        task2 = Task2.from_dict(api.payload)

        if task2 is not None:
            controller.post_task2(task2)
            return 200
        else: 
            return '', 500

@medicineApp.route('/task2-by-id/<int:id>')
@medicineApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class Task2Ops(Resource):
    @medicineApp.marshal_list_with(task2)
    def get(self, id):
        controller = Controller()
        result = controller.get_task2_by_id(id)
        return result

@medicineApp.route('/task3')
@medicineApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class Task3Ops(Resource):
    @medicineApp.marshal_list_with(task3)
    @medicineApp.expect(task3)
    def post(self):
        controller = Controller()
        task3 = Task3.from_dict(api.payload)

        if task3 is not None:
            controller.post_task3(task3)
            return 200
        else: 
            return '', 500

@medicineApp.route('/task3-by-id/<int:id>')
@medicineApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class Task3Ops(Resource):
    @medicineApp.marshal_list_with(task3)
    def get(self, id):
        controller = Controller()
        result = controller.get_task3_by_id(id)
        return result

if __name__ == '__main__':
    app.run(debug=True)