

import sqlite3 as sql

"""
    TODO:
        functions to be added before we can start adding bookings etc:
            add_screen
            remove_screen
            search_screens
            add_screening
            remove_screening
            search_screenings
        
        Data structure for seatings
        More efficient/accurate methods of searching (not high priority)
"""

"""
    Database class
        Creates or opens an existing Cinema database based on the db argument
        Initialisation params:
            String db: path to create/open database


        Example initialisation and usage for movies table:
            db = Database('TheBigPicture.db')
            db.add_movie('On the Waterfront', 'A movie about an ex-prizefighter', '16', 'Elia Kazan', 'Marlon Brando')
            db.fetch() 
                >>> [(1,'On the Waterfront', 'A movie about an ex-prizefighter', '16', 'Elia Kazan', 'Marlon Brando')]
            db.search_movies('Marlon')
                >>> [(1,'On the Waterfront', 'A movie about an ex-prizefighter', '16', 'Elia Kazan', 'Marlon Brando')]
            db.search_movies('Kostas')
                >>> []
            db.remove_movie(1)
            db.fetch()
                >>> []
"""
class Database:
    def __init__(self, db):
        #Set up the database connection and cursor
        self.conn = sql.connect(db)
        self.cur = self.conn.cursor()

        #Enable foreign keys so we can create relationships between tables
        self.cur.execute("PRAGMA foreign_keys = 1")

        #Movies table is created (if it does not exist) with the following fields: id (PK), name, blurb, certificate, director, leadactors
        self.cur.execute("CREATE TABLE IF NOT EXISTS movies (id INTEGER PRIMARY KEY,  name text NOT NULL, blurb text NOT NULL, certificate text NOT NULL, director text NOT NULL, leadactors text NOT NULL)")
        
        #Screens table is created (if it does not exist) with the following fields: id (PK), capacity
        self.cur.execute("CREATE TABLE IF NOT EXISTS screens (id INTEGER PRIMARY KEY, capacity INTEGER NOT NULL)")
        
        #Screenings table is created (if it does not exist) with the following fields: id (PK), date, time, screenid (FK), movieid (FK)
        #TODO: Data structure to store a map of the seats to display bookings for a screening.
        """
        Could look something like this, where 0 is booked and 1 is not booked:
            [[1,1,1,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [1,1,0,1,1,0,1,1].
             [0,0,0,0,0,0,0,0]
            ]
        Could store this 'matrix' as a text and create a parser for it, or we could also store it in JSON format I believe
        """
        self.cur.execute("CREATE TABLE IF NOT EXISTS screenings (id INTEGER PRIMARY KEY, date DATE NOT NULL, time TIME NOT NULL, screenid INTEGER REFERENCES screens(id) NOT NULL, movieid INTEGER REFERENCES movies(id) NOT NULL)")
        
        #commit the changes we have made to the database
        self.conn.commit()        




    """
        Returns a tuple of lists of tuples of  all the rows in each of the tables.
        i.e. (Movies, Screens, Screenings)
    """

    def fetch(self):
        #Execute a query to extract all rows from each of the tables, and then use fetchall() to gather a list of tuples of all the rows extracted
        
        self.cur.execute("SELECT * FROM movies")
        movies = self.cur.fetchall()
        
        self.cur.execute("SELECT * FROM screens")
        screens = self.cur.fetchall()
        
        self.cur.execute("SELECT * FROM screenings")
        screenings = self.cur.fetchall()

        return movies, screens, screenings
    
    """
        Inserts a new entry into the movies table
    """

    def add_movie(self, name, blurb, certificate, director, leadactors):
        #Execute an SQL query to insert a new record into the movies database.
        #We use '?' to prevent against SQL injection attacks.
        self.cur.execute("INSERT INTO movies VALUES (NULL, ?,?,?,?,?)", (name, blurb,certificate, director, leadactors))
        
        #Commit the changes we have made to the database.
        self.conn.commit()
    

    """
        Removes a movie from the movies table
    """
    def remove_movie(self, id):
        #Execute an SQL query to remove the row corresponding to the specified ID
        self.cur.execute("DELETE FROM movies WHERE id=?",(id,))
        #Commit the changes we have made to the database.
        self.conn.commit()


    """
        Elementary search function, quite inefficient in its current state.
        Iterates over the rows of the movies table, and returns a list of all of the rows (tuples) containing the search query within any of its fields.
        Safe from SQL injections, as no queries are currently used.

        TODO: More efficient, and stop the search checking the 'certificate' and 'id' fields.
    """
    def search_movies(self, query):
        return [row for row in self.fetch()[0] if query.lower() in str(row).lower()]


    def add_screen(self,capacity):
        return

    def remove_screen(self, id):
        return   
    def __del__(self):
        self.conn.close()