#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod


class Mapper(AbstractContextManager, ABC):

    def __init__(self):
        self._connection = None

    def __enter__(self):

        if os.getenv('GAE_ENV', '').startswith('standard'):
            """Landen wir in diesem Zweig, so haben wir festgestellt, dass der Code in der Cloud abläuft.
            Die App befindet sich somit im **Production Mode** und zwar im *Standard Environment*.
            Hierbei handelt es sich also um die Verbindung zwischen Google App Engine und Cloud SQL."""

            self._connection = connector.connect(user='root', password='root',
                                                 unix_socket='/cloudsql/wahlfachapp:europe-west3:wahlfachdb',
                                                 database='vr_trail_db')
        else:
            """Wenn wir hier ankommen, dann handelt sich offenbar um die Ausführung des Codes in einer lokalen Umgebung,
            also auf einem Local Development Server. Hierbei stellen wir eine einfache Verbindung zu einer lokal
            installierten mySQL-Datenbank her."""

            self._connection = connector.connect(user='root', password='sw-praktikum21',
                                                 host='127.0.0.1',
                                                 database='vr_trail_db')

        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
         self._connection.close()
