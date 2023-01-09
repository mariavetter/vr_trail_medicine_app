from service.mapper import Mapper
from model.runModel import Run


class RunService(Mapper):
    def __init__(self):
        super().__init__()

    def find_by_userid(self, id):
        result = []

        cursor = self._connection.cursor()
        command = "SELECT * FROM run WHERE user_iduser='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, date, user_iduser) in tuples:
            run = Run()
            run._id = id
            run._date = date
            run._user_iduser = user_iduser
            result.append(run)

        self._connection.commit()
        cursor.close()
        return result

    def find_all(self):
        result = []

        cursor = self._connection.cursor()

        cursor.execute("SELECT * from run")
        tuples = cursor.fetchall()

        for (id, date, user_iduser) in tuples:
            run = Run()
            run._id = id
            run._date = date
            run._user_iduser = user_iduser
            result.append(run)

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, run):
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(idrun) AS maxid FROM run")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Run-Objekt zu."""
                run.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                run.set_id(1)

        command = "INSERT INTO run (idrun, `date`, user_iduser) VALUES (%s,%s,%s)"
        data = (run.get_id(), run.get_date(), run.get_iduser())
        cursor.execute(command, data)
        
        self._connection.commit()
        cursor.close()

        return run

    def update(self):
        """Update an already given object in the DB"""
        pass

    def delete(self):
        """Delete an object from the DB"""
        pass
