class Run:

    def __init__(self):
        self._id = 0
        self._date = ''
        self._iduser = 0

    def get_id(self):
        return self._id

    def set_id(self, id):
        self._id = id

    def get_date(self):
        return self._date

    def set_date(self, date):
        self._date = date

    def get_iduser(self):
        return self._iduser

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Run()
        obj._id = dictionary['id']
        obj._date = dictionary['date']
        obj._iduser = dictionary['user_iduser']
        return obj
