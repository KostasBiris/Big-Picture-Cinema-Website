import sqlite3 as sql
from werkzeug.security import generate_password_hash, check_password_hash
import numpy as np
import pickle
import string


"""
    TODO:
        comments and documentation.
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
        self.cur.execute("CREATE TABLE IF NOT EXISTS movies (id INTEGER PRIMARY KEY,  \
                                                            name TEXT NOT NULL, \
                                                            blurb TEXT NOT NULL, \
                                                            certificate TEXT NOT NULL,\
                                                            director TEXT NOT NULL, \
                                                            writers TEXT NOT NULL, \
                                                            leadactors TEXT NOT NULL, \
                                                            release_date DATE NOT NULL)")

        #Screens table is created (if it does not exist) with the following fields: id (PK), capacity, seatmap, rows, columns
        self.cur.execute("CREATE TABLE IF NOT EXISTS screens (id INTEGER PRIMARY KEY, \
                                                             capacity INTEGER NOT NULL,\
                                                             seatmap BLOB NOT NULL)")

        #Screenings table is created (if it does not exist) with the following fields: id (PK), date, time, screenid (FK), movieid (FK), seatmap
        self.cur.execute("CREATE TABLE IF NOT EXISTS screenings (id INTEGER PRIMARY KEY, \
                                                                date DATE NOT NULL,\
                                                                time TIME NOT NULL, \
                                                                screenid INTEGER REFERENCES screens(id) NOT NULL,\
                                                                movieid INTEGER REFERENCES movies(id) NOT NULL,\
                                                                seatmap BLOB NOT NULL, \
                                                                supervisor INTEGER REFERENCES employees(id),\
                                                                upper_section INTEGER REFERENCES employees(id), \
                                                                middle_section INTEGER REFERENCES employees(id), \
                                                                lower_section INTEGER REFERENCES employees(id))")

        self.cur.execute("CREATE TABLE IF NOT EXISTS bookings (id INTEGER PRIMARY KEY, \
                                                              screeningid INTEGER REFERENCES screenings(id) NOT NULL, \
                                                              customerid INTEGER REFERENCES customers(id), \
                                                              seats TEXT NOT NULL)")

        self.cur.execute("CREATE TABLE IF NOT EXISTS tickets (id INTEGER PRIMARY KEY, \
                                                              booking_id INTEGER REFERENCES bookings(id) NOT NULL, \
                                                              forename TEXT NOT NULL, \
                                                              surname TEXT NOT NULL, \
                                                              qr INTEGER NOT NULL, \
                                                              email TEXT NOT NULL)")

        self.cur.execute("CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY, \
                                                               forename TEXT NOT NULL, \
                                                               surname TEXT NOT NULL, \
                                                               email TEXT NOT NULL, \
                                                               phonenumber TEXT NOT NULL, \
                                                               hash TEXT NOT NULL, \
                                                               dob DATE NOT NULL)")

        self.cur.execute("CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY, \
                                                               forename TEXT NOT NULL, \
                                                               surname TEXT NOT NULL, \
                                                               email TEXT NOT NULL, \
                                                               phonenumber TEXT NOT NULL, \
                                                               hash TEXT NOT NULL, \
                                                               isManager BIT NOT NULL)")
          
        self.cur.execute("CREATE TABLE IF NOT EXISTS sessions  (id INTEGER PRIMARY KEY, \
                                                               time_connected DATETIME NOT NULL, \
                                                               time_disconnected DATETIME NOT NULL, \
                                                               account_type INTEGER NOT NULL, \
                                                               customer_id INTEGER REFERENCES customers(id), \
                                                               employee_id INTEGER REFERENCES employees(id), \
                                                               manager_id INTEGER REFERENCES employees(id)")

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
        #make sure seatmap is not bytes
        for i in range(len(screens)):
            screens[i] = list(screens[i])
            screens[i][2] = self.get_seatmap_from_blob(screens[i][2])
            screens[i] = tuple(screens[i])

        self.cur.execute("SELECT * FROM screenings")
        screenings = self.cur.fetchall()

        for i in range(len(screenings)):
            screenings[i] = list(screenings[i])
            screenings[i][5] = self.get_seatmap_from_blob(screenings[i][5])
            screenings[i] = tuple(screenings[i])

        self.cur.execute("SELECT * FROM customers")
        customers = self.cur.fetchall()

        self.cur.execute("SELECT * FROM bookings")
        bookings = self.cur.fetchall()

        self.cur.execute("SELECT * FROM employees")
        employees = self.cur.fetchall()

        return movies, screens, screenings, customers, bookings, employees


#=-=-=-=-=-=-=-=-=-=-=-=MOVIES-=-=--=-=-=-=-=-=-=-=-=-=-=
    """
        Inserts a new entry into the movies table
    """
    def add_movie(self, name,blurb,certificate,director, writers,leadactors, release_date):
        #Execute an SQL query to insert a new record into the movies database.
        #We use '?' to prevent against SQL injection attacks.
        self.cur.execute("INSERT INTO movies VALUES (NULL, ?,?,?,?,?,?,?)", (name, blurb, certificate, director, writers, leadactors, release_date))

        #Commit the changes we have made to the database.
        self.conn.commit()

    def update_movie(self, id, data):
        self.cur.execute("UPDATE movies SET name=?, blurb=?, certificate=?, director=?, leadactors=?, release_date=? WHERE id=?",(*data, id))

        self.conn.commit()

    """
        Removes a movie from the movies table
    """
    def remove_movie(self, id = -1, name = "No name", blurb = "No blurb", certificate = -1, director = "No director", writers = "No writers",\
                                                                                        leadactors = "No leadactors",release_date = "00-00-00"):
        
        if(id == -1):
            #Remove a specific movie given its name
            if(name != "No name"):
                self.cur.execute("DELETE FROM movies WHERE name=?",(name,))
            
            #Remove a specific movie given its blurb/description
            elif(blurb != "No blurb"):
                self.cur.execute("DELETE FROM movies WHERE blurb=?",(blurb,))

            #Remove all movies of a certain age restriction
            elif(certificate != -1):
                self.cur.execute("DELETE FROM movies WHERE certificate=?",(certificate,))
            
            #Remove all movies made by a certain director
            elif(director != "No director"):
                self.cur.execute("DELETE FROM movies WHERE director=?",(director,))
            
            #Remove all movies starring a certain actor or actors
            elif(leadactors != "No leadactors"):
                self.cur.execute("DELETE FROM movies WHERE leadactors=?",(leadactors,))
            
            #Remove all movies released on a certain date
            elif(release_date != "00-00-00"):
                self.cur.execute("DELETE FROM movies WHERE release_date=?",(release_date,))
        
        else:
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

    def find_movie(self, query):

        self.cur.execute("SELECT id,name FROM movies")
        data = self.cur.fetchall()
        for tup in data:
            if tup[1].lower() == query.lower():
                self.cur.execute("SELECT * FROM movies WHERE id=?",(tup[0],))
                return self.cur.fetchone()
        #return [row for row in self.fetch()[0] if query.lower() == str(row)[1].lower()]
        
        #self.cur.execute("SELECT * FROM movies WHERE name=?",(name,))
        #return self.cur.fetchone()[0]

#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

#=-=-=-=-=-=-=-=-=SCREENS-=-=-=-=-=-=-=-=-=-=
    def add_screen(self,capacity, n,m):

        #Executre an SQL query to insert a new record into the movies database.
        #WE use '?' to prevent against SQL injection attacks.
        self.cur.execute("INSERT INTO screens VALUES (NULL, ?,?)", (capacity,self.init_seatmap(n,m).dumps()))

        #Commit the changes to the database.
        self.conn.commit()

    def remove_screen(self, id=-1, capacity=-1):

        if(id==-1):
            #Remove all screens of a certain capacity
            if(capacity!=1):
                self.cur.execute("DELETE FROM screens WHERE capacity=?",(capacity,))

        else:
            self.cur.execute("DELETE FROM screens WHERE id=?",(id,))

        self.conn.commit()

    def update_screen(self, id, data):

        capacity, n,m = data

        self.cur.execute("UPDATE screens SET capacity=?, seatmap=? WHERE id=?",(capacity, self.init_seatmap(n,m).dumps(), id))

        self.conn.commit()
#=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

#=-=-=-=-=-=-=-=-=SCREENINGS-=-=-=-=-=-=-=-=-=
    def add_screening(self, date, time, screenid, movieid,supervisor,upper_section,middle_section,lower_section):
        self.cur.execute("SELECT seatmap FROM screens WHERE id=?",(screenid,))
        seatmap = self.cur.fetchone()[0]
        self.cur.execute("INSERT INTO screenings VALUES (NULL, ?,?,?,?,?,?,?,?,?)",(date,time,screenid,movieid,seatmap,supervisor,upper_section,middle_section,lower_section))

        self.conn.commit()

    def remove_screening(self, id=-1, date="00-00-00", time="00:01", screenid=-1, movieid=-1, movie_name="No name"):

        if(id==-1):
            
            #Remove all screenings on a certain date
            if(date!="00-00-00"):
                self.cur.execute("DELETE FROM screenings WHERE date=?",(date,))
            
            #Remove all screenings on a certain time
            elif(time!="00-00-00"):
                self.cur.execute("DELETE FROM screenings WHERE time=?",(time,))

            #Remove all screenings in a certain screen room
            elif(screenid!=-1):
                self.cur.execute("DELETE FROM screenings WHERE screenid=?",(screenid,))
            
            #Remove all scrennings of a certain movie using its ID
            elif(movieid!=-1):
                self.cur.execute("DELETE FROM screenings WHERE movieid=?",(movieid,))

            #Remove all screenings of a certain movie usings its name
            elif(movie_name!="No name"):
                self.cur.execute("DELETE FROM screenings INNER JOIN movies ON screenings.movieid = movies.id WHERE movies.name=?",(movie_name,))

        else:
            self.cur.execute("DELETE FROM screenings WHERE id=?",(id,))

        self.conn.commit()

    def update_screening(self, id, data):

        self.cur.execute("UPDATE screenings SET date=?, time=?, screenid=?, movieid=?, seatmap=?, supervisor=?, upper_section=?, middle_section=?, lower_section=? WHERE id=?",(*data, id))

        self.conn.commit()

    def get_seatmap(self, id):

        self.cur.execute("SELECT seatmap FROM screenings WHERE id=?",(id,))
        return self.cur.fetchone()[0]


#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=

#=-=-=-=-=-=-=-=-=-=BOOKINGS-=-=-=-=-=-=-=-=-=-=

    #seats should be a list: [A10, A11, A12]
    def add_booking(self, screeningid, customerid, seats):
        seatmap = self.get_seatmap(screeningid)
        seatmap = self.update_seatmap(self.get_seatmap_from_blob(seatmap), seats.split(","), screeningid,'+')
        if not seatmap: return False
        self.cur.execute("INSERT INTO bookings VALUES (NULL, ?,?,?)", (screeningid, customerid, seats))
        self.conn.commit()

    def remove_booking(self, id=-1, screenid=-1, customerid=-1, customer_forename="No forename", customer_surname="No surname",\
                        customer_email="No email", customer_phone=-1):
  
        if(id==-1):
            
            #Remove all bookings for a certain screen
            if(screenid!=-1):
                #self.cur.execute("SELECT id FROM bookings WHERE screenid=?",(screenid,))
                #id = self.cur.fetchall()
                i = 0
            #Remove all bookings made by a certain customer using their ID
            elif(customerid!=1):
                self.cur.execute("SELECT id FROM bookings WHERE customerid=?",(customerid,))
                id = self.cur.fetchall()

            #Remove all bookings made by a certain customer using their Full Name and their Email or Phone number
            if(forename!="No forename" and surname!="No surname" and (email!="No email" or phonenumber!=-1)):
    
                if(email!="No email"):
                    
                    self.cur.execute("SELECT customerid FROM customers WHERE forename=? AND surname=? AND email=?",(forename,surname,email,))
                    customerid = self.cur.fetchall()

                    self.cur.execute("SELECT id FROM bookings WHERE customerid=?",(customerid,))
                    id = self.cur.fetchall()

                else:
                    self.cur.execute("SELECT customerid FROM customers WHERE forename=? AND surname=? AND phonenumber=?",(forename,surname,phonenumber,))
                    customerid = self.cur.fetchall()

                    self.cur.execute("SELECT id FROM bookings WHERE customerid=?",(customerid,))
                    id = self.cur.fetchall()

                

        self.cur.execute("SELECT screeningid FROM bookings WHERE id=?",(id,))
        screeningid = self.cur.fetchone()[0]
        seatmap = self.get_seatmap(screeningid)
        self.cur.execute("SELECT seats FROM bookings WHERE id=?",(id,))
        seats = self.cur.fetchone()[0]
        seatmap = self.update_seatmap(self.get_seatmap_from_blob(seatmap), seats.split(","), screeningid,'-')
        self.cur.execute("DELETE FROM bookings WHERE id=?",(id,))
        remove_ticket(self, id)

        self.conn.commit()

    def update_booking(self, id, data):

        self.cur.execute("SELECT screeningid FROM bookings WHERE id=?",(id,))
        screeningid = self.cur.fetchone()[0]
        seatmap = self.get_seatmap(screeningid)
        self.cur.execute("SELECT seats FROM bookings WHERE id=?",(id,))
        seats = self.cur.fetchone()[0]

        if seats !=data[-1]:
            self.update_seatmap(self.get_seatmap_from_blob(seatmap), seats.split(","), screeningid, '-')
            self.update_seatmap(self.get_seatmap_from_blob(seatmap), data[-1].split(","), screeningid, '+')

        self.cur.execute("UPDATE bookings SET screeningid=?, customerid=?, seats=? WHERE id=?",(*data, id))

        self.conn.commit()

    def update_seatmap(self,seatmap, seats, id, op):
        d = {chr(y):y-64 for y in range(65,91)}
        
        for seat in seats:
            row = d[seat[0]]-1
            key = int(seat[1:])-1
            

            #If the seat is booked
            if op == '+':

                #VIP seat
                if seatmap[row][key] == 2:
                    seatmap[row][key] = 3
                
                #Standard seat
                else:    
                    seatmap[row][key] = 1

            #If the seat is left vacant
            elif op=='-' :

                #VIP seat
                if seatmap[row][key] == 3:
                    seatmap[row][key] = 2
                
                #Standard seat
                else:
                    seatmap[row][key] = 0

        self.cur.execute("UPDATE screenings SET seatmap=? WHERE id=?",(seatmap.dumps(),id))
        self.conn.commit()
        return True

#=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=

#=-=-=-=-=-=-=-=-=-=TICKETS-=-=-=-=-=-=-=-=-=-=

    def add_ticket(self, booking_id, forename, surname, qr, email):

        self.cur.execute("INSERT INTO customers VALUES (NULL, ?,?,?,?,?)",(booking_id, forename, surname, qr, email))
        self.conn.commit()

    #Removes a ticket when the booking is removed
    def remove_ticket(self, booking_id):
        self.cur.execute("DELETE FROM tickets WHERE booking_id=?",(booking_id,))
        self.conn.commit()

#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=

#=-=-=-=-=-=-=-=-=-=CUSTOMERS-=-=-=-=-=-=-=-=-=-=
    
    def add_customer(self, forename, surname, email, phonenumber, password, dob):
        _hash = generate_password_hash(password)
        self.cur.execute("INSERT INTO customers VALUES (NULL, ?,?,?,?,?,?)",(forename, surname, email, phonenumber, _hash, dob))
        self.conn.commit()


    def remove_customer(self, id=-1, forename="No forename", surname="No surname", email="No email", phonenumber=-1,dob=-1):

        if(id==-1):

            #Remove a specific customer using their Full Name and either their email or phone number
            if(forename!="No forename" and surname!="No surname" and (email!="No email" or phonenumber!=-1)):
                
                if(email!="No email"):
                    self.cur.execute("DELETE FROM customers WHERE forename=? AND surname=? AND email=?",(forename,surname,email,))
                
                else:
                    self.cur.execute("DELETE FROM customers WHERE forename=? AND surname=? AND phonenumber=?",(forename,surname,phonenumber,))

            #Remove all customers of a certain age
            elif(dob!=-1):
                self.cur.execute("DELETE FROM customers WHERE dob=?",(dob,))

        
        else:
            self.cur.execute("DELETE FROM customers WHERE id=?",(id,))

        self.conn.commit()

    def update_customer(self, id, data):
        data = list(data)
        data[4] = generate_password_hash(data[4])
        data = tuple(data)
        self.cur.execute("UPDATE customers SET forename=?, surname=?, email=?, phonenumber=?, hash=?, dob=? WHERE id=?",(*data, id))
        self.conn.commit()
#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

#=-=-=-=-=-=-=-=-=-=EMPLOYEES-=-=-=-=-=-=-=-=-=-=-=-=
    def add_employee(self, forename, surname, email, phonenumber, password, isManager):
        _hash = generate_password_hash(password)
        self.cur.execute("INSERT INTO employees VALUES (NULL, ?,?,?,?,?,?)",(forename, surname, email, phonenumber, _hash, isManager))

        self.conn.commit()

    def remove_employee(self, id=-1, forename="No forename", surname="No surname", email="No email", phonenumber=-1):

        #Remove a specific employee using their Full Name and either their email or phone number
        if(forename!="No forename" and surname!="No surname" and (email!="No email" or phonenumber!=-1)):
                
            if(email!="No email"):
                self.cur.execute("DELETE FROM employees WHERE forename=? AND surname=? AND email=?",(forename,surname,email,))
            
            else:
                self.cur.execute("DELETE FROM employees WHERE forename=? AND surname=? AND phonenumber=?",(forename,surname,phonenumber,))
        
        else:
            self.cur.execute("DELETE FROM employees WHERE id=?",(id,))

        self.conn.commit()

    def update_employee(self, id, data):
        data = list(data)
        data[4] = generate_password_hash(data[4])
        data = tuple(data)
        self.cur.execute("UPDATE employees SET forename=?, surname=?, email=?, phonenumber=?, hash=?, isManager=? WHERE id=?",(*data, id))

        self.conn.commit()
#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    def fetch_customer(self, id):

        self.cur.execute("SELECT * from customers WHERE id =?", (id,))
        return self.cur.fetchone()

    def validate_customer(self, email, password):
        self.cur.execute("SELECT * from customers WHERE email =?", (email,))
        u = self.cur.fetchone()
        if not u : return False
        return check_password_hash(u[5], password)


    def search(self, query, table):
        dictionary = {'movies':0,'screens':1, 'screenings': 2,  'customers': 3, 'bookings': 4, 'employees': 5}
        return [row for row in self.fetch()[dictionary[table.lower()]] if query.lower() in str(row).lower()]

    def init_seatmap(self,n, m):
        #Initialise a matrix full of 0s
        new_seatmap = np.zeros((n,m), dtype=int)

        #Go to the middle row of the matrix, where the VIP seats are
        n = int(len(new_seatmap)/2)
        
        #Identify VIP seats and empty space(indexes not representing any seats)
        for i in range(len(new_seatmap[n])):

            #Empty space
            if(i==0 or i==1 or i==(len(new_seatmap[n])-2) or i==(len(new_seatmap[n])-1)):
                new_seatmap[n][i]=-1
            
            #VIP seats
            else:
                new_seatmap[n][i]=2
        
        return new_seatmap

    def get_seatmap_from_blob(self, seatmap):
        return pickle.loads(seatmap)


    def __del__(self):
        self.conn.close()

#=-=-=-=-=-=-=-=-=-=SESSIONS-=-=-=-=-=-=-=-=-=-=-=-=
    def add_session(self, ip, time_connected, time_disconnected, account_type, customer_id, employee_id, manager_id):
        self.cur.execute("INSERT INTO sessions VALUES (NULL, ?,?,?,?,?,?,?)",(ip, time_connected, time_disconnected, account_type, customer_id, employee_id, manager_id))
        self.conn.commit()
#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

"""
db = Database('cinema.db')
db.add_movie('Captain America: The First Avenger', 'Steve Rogers, a rejected military soldier, transforms into Captain America after taking a dose of a "Super-Soldier serum". But being Captain America comes at a price as he attempts to take down a war monger and a terrorist organization. '
            ,'12', 'Joe Johnston', 'Chris Evans, Tommy Lee Jones , Samuel L. Jackson', '29-07-2011')

db.add_movie('Captain America: The Winter Soldier', 'As Steve Rogers struggles to embrace his role in the modern world, he teams up with a fellow Avenger and S.H.I.E.L.D agent, Black Widow, to battle a new threat from history: an assassin known as the Winter Soldier. ',
            '12', 'Anthony Russo, Joe Russo', 'Chris Evans, Samuel L. Jackson, Scarlett Johansson, Robert Redford', '26-03-2014')

db.add_movie('Captain America: Civil War',  'Political involvement in the Avengers\' affairs causes a rift between Captain America and Iron Man. ',
            '12', 'Anthony Russo, Joe Russo', 'Chris Evans, Robert Downey Jr., Scarlett Johansson, Paul Rudd, Anthony Mackie, Sebastian Stan', '29-04-2016')
"""




#=-=-=-=-=-=-SEAT MAP APPEARENCE TEST CODE-=-=-=-=-=-=-=
"""
db = Database('cinema.db')
db.add_screen(25,5,10)
db.add_movie('seatmap Movie Name', 'seatmapMovieblurb', '16', 'seatmapMovieDirector','seatmapMovieActor', '12-12-2021')
db.add_customer('seatmapCustomerFName','seatmapCustomerSName', 'seatmapCustomerEmail', 'seatmapCustomerPhone','seatmapCustomerPassword','01-01-01')

db.add_employee("staff1_fn", "staff1_sn", "staff1@email.com", 1, "staff1_password", True)
db.add_employee("staff2_fn", "staff2_sn", "staff2@email.com", 1, "staff2_password", True)
db.add_employee("staff3_fn", "staff3_sn", "staff3@email.com", 1, "staff3_password", True)
db.add_employee("staff4_fn", "staff4_sn", "staff4@email.com", 1, "staff4_password", True)


db.add_screening('12-12-2021','18:00', 1,1, 1, 2,3,4)

dat = db.fetch()[2]
seatmap = dat[0][5]

print(seatmap)

db.add_booking(1,1,['A1','B1','C4'])
dat = db.fetch()[2]
seatmap = dat[0][5]
print(seatmap)
"""
#-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-