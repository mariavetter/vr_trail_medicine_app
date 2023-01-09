from service.mapper import Mapper
from model.task2Model import Task2


class Task2Service(Mapper):
    def __init__(self):
        super().__init__()

    def find_by_runid(self, id):
        result = None

        cursor = self._connection.cursor()
        command = "SELECT * FROM task2 WHERE run_idrun='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        print(tuples)
        try:
            (id, duration, wrongtiles, durationTiletoTile, run_id) = tuples[0]
            task2 = Task2()
            task2._id = id
            task2._duration = duration
            task2._wrongtiles = wrongtiles
            task2._durationTiletoTile = durationTiletoTile
            task2._run_id = run_id
            result = task2

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_all(self):
        result = []

        cursor = self._connection.cursor()

        cursor.execute("SELECT * from task2")
        tuples = cursor.fetchall()

        for (id, duration, wrongtiles, durationTiletoTile, run_id) in tuples:
            task2 = Task2()
            task2._id = id
            task2._duration = duration
            task2._wrongtiles = wrongtiles
            task2._durationTiletoTile = durationTiletoTile
            task2._run_id = run_id
            result.append(task2)

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, task):
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(idtask2) AS maxid FROM task2 ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Task2-Objekt zu."""
                task.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                task.set_id(1)

        command = "INSERT INTO task2 (idtask2, duration, wrongtiles, durationTiletoTile, run_idrun) VALUES (%s,%s,%s,%s,%s)"
        data = (task.get_id(), task.get_duration(), task.get_wrongtiles(), task.get_durationTiletoTile(), task.get_run_id())
        cursor.execute(command, data)
        
        self._connection.commit()
        cursor.close()

        return task

    def update(self):
        """Update an already given object in the DB"""
        pass

    def delete(self):
        """Delete an object from the DB"""
        pass
