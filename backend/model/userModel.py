class User:

    def __init__(self):
        self._id = 0
        self._name = ''
        self._age = ''

    def get_id(self):
        return self._id

    def set_id(self, id):
        self._id = id

    def get_name(self):
        return self._name

    def get_age(self):
        return self._age

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = User()
        obj._id = dictionary['id']
        obj._name = dictionary['name']
        obj._age = dictionary['age']
        return obj
