from service.userService import UserService
from service.runService import RunService
from service.task1Service import Task1Service
from service.task2Service import Task2Service
from service.task3Service import Task3Service


class Controller(object):
   def __init__(self):
      pass

   def get_all_user(self):
      with UserService() as mapper:
         return mapper.find_all()

   def get_user_by_id(self, name):
      with UserService() as mapper:
         return mapper.find_by_id(name)

   def post_user(self, user):
      with UserService() as mapper:
         return mapper.insert(user)

   def get_all_runs(self):
      with RunService() as mapper:
         return mapper.find_all()

   def post_run(self, run):
      with RunService() as mapper:
         return mapper.insert(run)

   def get_run_by_userid(self, id):
      with RunService() as mapper:
         return mapper.find_by_userid(id)

   def get_task1_by_id(self, id):
      with Task1Service() as mapper:
         return mapper.find_by_runid(id)

   def post_task1(self, task1):
      with Task1Service() as mapper:
         return mapper.insert(task1)

   def get_task2_by_id(self, id):
      with Task2Service() as mapper:
         return mapper.find_by_runid(id)

   def post_task2(self, task2):
      with Task2Service() as mapper:
         return mapper.insert(task2)

   def get_task3_by_id(self, id):
      with Task3Service() as mapper:
         return mapper.find_by_runid(id)

   def post_task3(self, task3):
      with Task3Service() as mapper:
         return mapper.insert(task3)