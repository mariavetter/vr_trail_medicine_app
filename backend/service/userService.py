from service.mapper import Mapper
from model.userModel import User


class UserService(Mapper):
    def __init__(self):
        super().__init__()

    def find_by_id(self, id):
        result = None

        cursor = self._connection.cursor()
        command = "SELECT * FROM user WHERE iduser='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, age) = tuples[0]
            user = User()
            user._id = id
            user._name = name
            user._age = age
            result = user

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

        cursor.execute("SELECT * from user")
        tuples = cursor.fetchall()

        for (id, name, age) in tuples:
            user = User()
            user._id = id
            user._name = name
            user._age = age
            result.append(user)

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, user):
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(iduser) AS maxid FROM user")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                user.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                user.set_id(1)

        command = "INSERT INTO user (iduser, `name`, age) VALUES (%s,%s,%s)"
        data = (user.get_id(), user.get_name(), user.get_age())
        cursor.execute(command, data)
        
        self._connection.commit()
        cursor.close()

        return user

    def update(self):
        """Update an already given object in the DB"""
        pass

    def delete(self):
        """Delete an object from the DB"""
        pass
