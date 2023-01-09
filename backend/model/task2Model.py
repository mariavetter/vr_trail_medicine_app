class Task2:

    def __init__(self):
        self._id = 0
        self._duration = ''
        self._wrongtiles = ''
        self._durationTiletoTile = ''
        self._run_id = ''  

    def get_id(self):
        return self._id

    def set_id(self, id):
        self._id = id

    def get_duration(self):
        return self._duration

    def set_duration(self, duration):
        self._duration = duration

    def get_wrongtiles(self):
        return self._wrongtiles

    def set_wrongtiles(self, wrongtiles):
        self._wrongtiles = wrongtiles

    def get_durationTiletoTile(self):
        return self._durationTiletoTile

    def set_durationTiletoTile(self, durationTiletoTile):
        self._durationTiletoTile = durationTiletoTile

    def get_run_id(self):
        return self._run_id  

    def set_run_id(self, run_id):
        self._run_id = run_id  

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Task2()
        obj._id = dictionary['id']
        obj._duration = dictionary['duration']
        obj._wrongtiles = dictionary['wrongtiles']
        obj._durationTiletoTile = dictionary['durationTiletoTile']
        obj._run_id = dictionary['run_idrun']
        return obj
