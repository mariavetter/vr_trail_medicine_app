class Task3:

    def __init__(self):
        self._id = 0
        self._duration = ''
        self._wrongAssignment = ''
        self._run_id = ''

    def get_id(self):
        return self._id

    def set_id(self, id):
        self._id = id

    def get_duration(self):
        return self._duration

    def set_duration(self, duration):
        self._duration = duration

    def get_wrongAssignment(self):
        return self._wrongAssignment

    def set_wrongAssignmentn(self, wrongAssignment):
        self._wrongAssignment = wrongAssignment

    def get_run_id(self):
        return self._run_id    

    def set_run_id(self, run_id):
        self._run_id = run_id  

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Task3()
        obj._id = dictionary['id']
        obj._duration = dictionary['duration']
        obj._wrongAssignment = dictionary['wrongAssignment']
        obj._run_id = dictionary['run_idrun']
        return obj
