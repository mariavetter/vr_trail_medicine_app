from service.mapper import Mapper
from model.task3Model import Task3


class Task3Service(Mapper):
    def __init__(self):
        super().__init__()

    def find_by_runid(self, id):
        result = None

        cursor = self._connection.cursor()
        command = "SELECT * FROM task3 WHERE run_idrun='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        print(tuples)
        try:
            (id, duration, wrongAssignment, run_id) = tuples[0]
            task3 = Task3()
            task3._id = id
            task3._duration = duration
            task3._wrongAssignment = wrongAssignment
            task3._run_id = run_id
            result = task3

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

        cursor.execute("SELECT * from task3")
        tuples = cursor.fetchall()

        for (id, duration, wrongAssignment, run_id) in tuples:
            task3 = Task3()
            task3._id = id
            task3._duration = duration
            task3._wrongAssignment = wrongAssignment
            task3._run_id = run_id
            result.append(task3)

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, task):
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(idtask3) AS maxid FROM task3")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Task3-Objekt zu."""
                task.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                task.set_id(1)

        command = "INSERT INTO task3 (idtask3, duration, wrongAssignment, run_idrun) VALUES (%s,%s,%s,%s)"
        data = (task.get_id(), task.get_duration(), task.get_wrongAssignment(), task.get_run_id())
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
