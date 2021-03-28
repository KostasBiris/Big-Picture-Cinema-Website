import sqlite3 as sql
from werkzeug.security import generate_password_hash, check_password_hash
import numpy as np
import pickle
import string
import qrcode
import smtplib, ssl
import os
from email.message import EmailMessage
import imghdr
from reportlab.pdfgen import canvas
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.lib import colors
import time
import PIL
from datetime import datetime, timedelta
import matplotlib.pyplot as plt

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
                                                            release_date DATE NOT NULL, \
                                                            omdbid INTEGER NOT NULL, \
                                                            poster_path TEXT NOT NULL, \
                                                            runtime TEXT NOT NULL, \
                                                            youtube_key TEXT NOT NULL, \
                                                            genres TEXT NOT NULL)")

        #Screens table is created (if it does not exist) with the following fields: id (PK), capacity, seatmap, rows, columns
        self.cur.execute("CREATE TABLE IF NOT EXISTS screens (id INTEGER PRIMARY KEY, \
                                                             capacity INTEGER NOT NULL,\
                                                             seatmap BLOB NOT NULL)")

        #Screenings table is created (if it does not exist) with the following fields: id (PK), date, time, screen_id (FK), movie_id (FK), seatmap
        self.cur.execute("CREATE TABLE IF NOT EXISTS screenings (id INTEGER PRIMARY KEY, \
                                                                date DATE NOT NULL,\
                                                                time TIME NOT NULL, \
                                                                screen_id INTEGER REFERENCES screens(id) NOT NULL,\
                                                                movie_id INTEGER REFERENCES movies(id) NOT NULL,\
                                                                seatmap BLOB NOT NULL)")

        self.cur.execute("CREATE TABLE IF NOT EXISTS bookings (id INTEGER PRIMARY KEY, \
                                                              screening_id INTEGER REFERENCES screenings(id) NOT NULL, \
                                                              customer_id INTEGER REFERENCES customers(id), \
                                                              seats TEXT NOT NULL)")

        self.cur.execute("CREATE TABLE IF NOT EXISTS tickets (id INTEGER PRIMARY KEY, \
                                                              booking_id INTEGER REFERENCES bookings(id) NOT NULL,\
                                                              movie_id INTEGER REFERENCES movies(id) NOT NULL,\
                                                              price FLOAT NOT NULL,\
                                                              forename TEXT NOT NULL, \
                                                              surname TEXT NOT NULL, \
                                                              email TEXT NOT NULL,\
                                                              qr BLOB NOT NULL, \
                                                              num_VIPs INTEGER NOT NULL,\
                                                              num_children INTEGER NOT NULL,\
                                                              num_elders INTEGER NOT NULL, \
                                                              num_normal INTEGER NOT NULL, \
                                                              date DATE NOT NULL)")

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
                                                               ip TEXT NOT NULL, \
                                                               time_connected INTEGER NOT NULL, \
                                                               account_type INTEGER NOT NULL, \
                                                               customer_id INTEGER REFERENCES customers(id), \
                                                               employee_id INTEGER REFERENCES employees(id), \
                                                               manager_id INTEGER REFERENCES employees(id))")
        
        self.cur.execute("CREATE TABLE IF NOT EXISTS daily_analytics (id INTEGER PRIMARY KEY, \
                                                                      movie_id INTEGER REFERENCES movies(id) NOT NULL,\
                                                                      movie_name TEXT REFERENCES movies(name) NOT NULL,\
                                                                      date DATE REFERENCES screenings(date) NOT NULL, \
                                                                      income FLOAT NOT NULL,\
                                                                      num_tickets INTEGER NOT NULL)")

        self.cur.execute("CREATE TABLE IF NOT EXISTS overall_analytics (id INTEGER PRIMARY KEY, \
                                                                        movie_id INTEGER REFERENCES movies(id) NOT NULL,\
                                                                        movie_name TEXT REFERENCES movies(name) NOT NULL,\
                                                                        income FLOAT NOT NULL,\
                                                                        num_tickets INTEGER NOT NULL)")

        self.cur.execute("CREATE TABLE IF NOT EXISTS payments (id INTEGER PRIMARY KEY, \
                                                               customer_id INTEGER REFERENCES customers(id),\
                                                               holder_name TEXT NOT NULL, \
                                                               postcode TEXT NOT NULL,\
                                                               card_number INT NOT NULL, \
                                                               expiration_date DATE NOT NULL)")

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

        self.cur.execute("SELECT * FROM tickets")
        tickets = self.cur.fetchall()
        # for i in range(len(tickets)):
        #     tickets[i] = list(tickets[i])
        #     tickets[i][7] = self.im_from_bytes((tickets[i][7])
        #     tickets[i] = tuple(tickets[i])

        self.cur.execute("SELECT * FROM employees")
        employees = self.cur.fetchall()

        self.cur.execute("SELECT * FROM sessions")
        sessions = self.cur.fetchall()

        self.cur.execute("SELECT * FROM daily_analytics")
        daily_analytics = self.cur.fetchall()

        self.cur.execute("SELECT * FROM overall_analytics")
        overall_analytics = self.cur.fetchall()

        return movies, screens, screenings, customers, bookings, tickets, employees, sessions, daily_analytics, overall_analytics


#=-=-=-=-=-=-=-=-=-=-=-=MOVIES-=-=--=-=-=-=-=-=-=-=-=-=-=
    """
        Inserts a new entry into the movies table
    """
    def add_movie(self, name,blurb,certificate,director, writers,leadactors, release_date, omdbid, poster_path, runtime, youtube_key, genres):
        #Execute an SQL query to insert a new record into the movies database.
        #We use '?' to prevent against SQL injection attacks.
        self.cur.execute("INSERT INTO movies VALUES (NULL, ?,?,?,?,?,?,?,?,?,?,?,?)", (name, blurb, certificate, director, writers, leadactors, release_date, omdbid, poster_path, runtime, youtube_key, genres))

        #Commit the changes we have made to the database.
        self.conn.commit()

    def omdbid(self, id):
        self.cur.execute("SELECT * FROM movies WHERE omdbid=?",(id,))
        return self.cur.fetchone()


    def update_movie(self, id, data):
        self.cur.execute("UPDATE movies SET name=?, blurb=?, certificate=?, director=?, leadactors=?, release_date=?, omdbid=?, runtime=?, youtube_key=?, genres=?, WHERE id=?",(*data, id))

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


    def search_movies(self, query):
        return [row for row in self.fetch()[0] if query.lower() in str(row).lower()]

    def find_movie(self, query):

        self.cur.execute("SELECT id,name FROM movies")
        data = self.cur.fetchall()
        for tup in data:
            if tup[1].lower() == query.lower():
                self.cur.execute("SELECT * FROM movies WHERE id=?",(tup[0],))
                return self.cur.fetchone()

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
    def add_screening(self, date, time, screen_id, movie_id):
        self.cur.execute("SELECT seatmap FROM screens WHERE id=?",(screen_id,))
        seatmap = self.cur.fetchone()[0]
        self.cur.execute("INSERT INTO screenings VALUES (NULL, ?,?,?,?,?)",(date,time,screen_id,movie_id,seatmap))

        self.conn.commit()

    def remove_screening(self, id=-1, date="00-00-00", time="00:01", screen_id=-1, movie_id=-1, movie_name="No name"):

        if(id==-1):
            
            #Remove all screenings on a certain date
            if(date!="00-00-00"):
                self.cur.execute("DELETE FROM screenings WHERE date=?",(date,))
            
            #Remove all screenings on a certain time
            elif(time!="00-00-00"):
                self.cur.execute("DELETE FROM screenings WHERE time=?",(time,))

            #Remove all screenings in a certain screen room
            elif(screen_id!=-1):
                self.cur.execute("DELETE FROM screenings WHERE screen_id=?",(screen_id,))
            
            #Remove all scrennings of a certain movie using its ID
            elif(movie_id!=-1):
                self.cur.execute("DELETE FROM screenings WHERE movie_id=?",(movie_id,))

            #Remove all screenings of a certain movie usings its name
            elif(movie_name!="No name"):
                self.cur.execute("DELETE FROM screenings INNER JOIN movies ON screenings.movie_id = movies.id WHERE movies.name=?",(movie_name,))

        else:
            self.cur.execute("DELETE FROM screenings WHERE id=?",(id,))

        self.conn.commit()

    def update_screening(self, id, data):

        self.cur.execute("UPDATE screenings SET date=?, time=?, screen_id=?, movie_id=?, seatmap=? WHERE id=?",(*data, id))

        self.conn.commit()

    def get_seatmap(self, id):

        self.cur.execute("SELECT seatmap FROM screenings WHERE id=?",(id,))
        return self.cur.fetchone()[0]


    def get_upcoming(self):
        #we want to find all of the screenings within the past 2 weeks, and send their information, along with all of the movies that are showing.
        screenings = set()
        movies = set()
        for row in self.fetch()[2]:
            date = row[1]
            a = datetime.strptime(date, "%d-%m-%Y")
            today = datetime.today()
            inc = timedelta(days=14)
            twoweeks = today + inc
            if a >= today and a<=twoweeks:
                screenings.add(row[0])
                movies.add(row[4])
        moviedata = []
        for movie in movies:        
            moviedata.append(self.quick_get_movie(movie))
        
        screeningdata = []
        for screening in screenings:
            screeningdata.append(self.quick_get_screening(screening))

        return moviedata, screeningdata


    def quick_get_screening(self, id):
        data = self.fetch()[2]
        for d in data:
            if d[0] == id:
                return d
    
    def quick_get_movie(self, id):
        data = self.fetch()[0]
        for d in data:
            if d[0] == id:
                return d


#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=

#=-=-=-=-=-=-=-=-=-=BOOKINGS-=-=-=-=-=-=-=-=-=-=

    def add_booking(self, screening_id, customer_id, seats):
        seatmap = self.get_seatmap(screening_id)
        seatmap = self.update_seatmap(self.get_seatmap_from_blob(seatmap), seats.split(","), screening_id,'+')
        if not seatmap: return False
        self.cur.execute("INSERT INTO bookings VALUES (NULL, ?,?,?)", (screening_id, customer_id, seats))
        self.conn.commit()
        self.cur.execute("SELECT id FROM bookings WHERE screening_id=? AND customer_id=? AND seats=?",(screening_id, customer_id, seats))
        bookingid = self.cur.fetchone()[0]
        self.cur.execute("SELECT forename, surname, email FROM customers WHERE id=?",(customer_id,))
        forename, surname, email = self.cur.fetchone()
        self.cur.execute("SELECT movie_id FROM screenings WHERE id=?",(screening_id,))
        movie_id = self.cur.fetchone()[0]
        qr = self.qr_code_generator(bookingid, screening_id)
        #db.add_ticket(bookingid, forename, surname, self.qr_to_blob(qr),email)
        db.add_ticket(bookingid, movie_id, 10, forename, surname, email, self.qr_to_blob( qr))


    def remove_booking(self, id=-1, screen_id=-1, customer_id=-1, customer_forename="No forename", customer_surname="No surname",\
                        customer_email="No email", customer_phone=-1):
  
        if(id==-1):
            
            #Remove all bookings for a certain screen
            if(screen_id!=-1):
                #self.cur.execute("SELECT id FROM bookings WHERE screen_id=?",(screen_id,))
                #id = self.cur.fetchall()
                i = 0
            #Remove all bookings made by a certain customer using their ID
            elif(customer_id!=1):
                self.cur.execute("SELECT id FROM bookings WHERE customer_id=?",(customer_id,))
                id = self.cur.fetchall()

            #Remove all bookings made by a certain customer using their Full Name and their Email or Phone number
            if(forename!="No forename" and surname!="No surname" and (email!="No email" or phonenumber!=-1)):
    
                if(email!="No email"):
                    
                    self.cur.execute("SELECT customer_id FROM customers WHERE forename=? AND surname=? AND email=?",(forename,surname,email,))
                    customer_id = self.cur.fetchall()

                    self.cur.execute("SELECT id FROM bookings WHERE customer_id=?",(customer_id,))
                    id = self.cur.fetchall()

                else:
                    self.cur.execute("SELECT customer_id FROM customers WHERE forename=? AND surname=? AND phonenumber=?",(forename,surname,phonenumber,))
                    customer_id = self.cur.fetchall()

                    self.cur.execute("SELECT id FROM bookings WHERE customer_id=?",(customer_id,))
                    id = self.cur.fetchall()

                

        self.cur.execute("SELECT screening_id FROM bookings WHERE id=?",(id,))
        screening_id = self.cur.fetchone()[0]
        seatmap = self.get_seatmap(screening_id)
        self.cur.execute("SELECT seats FROM bookings WHERE id=?",(id,))
        seats = self.cur.fetchone()[0]
        seatmap = self.update_seatmap(self.get_seatmap_from_blob(seatmap), seats.split(","), screening_id,'-')
        self.cur.execute("DELETE FROM bookings WHERE id=?",(id,))
        remove_ticket(self, id)

        self.conn.commit()

    def update_booking(self, id, data):

        self.cur.execute("SELECT screening_id FROM bookings WHERE id=?",(id,))
        screening_id = self.cur.fetchone()[0]
        seatmap = self.get_seatmap(screening_id)
        self.cur.execute("SELECT seats FROM bookings WHERE id=?",(id,))
        seats = self.cur.fetchone()[0]

        if seats !=data[-1]:
            self.update_seatmap(self.get_seatmap_from_blob(seatmap), seats.split(","), screening_id, '-')
            self.update_seatmap(self.get_seatmap_from_blob(seatmap), data[-1].split(","), screening_id, '+')

        self.cur.execute("UPDATE bookings SET screening_id=?, customer_id=?, seats=? WHERE id=?",(*data, id))

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

    def add_ticket(self, booking_id, movie_id, price, forename, surname, email, qr,num_VIPs = 0, num_children = 0, num_elders = 0, num_normal=0):

        self.cur.execute("INSERT INTO tickets VALUES (NULL, ?,?,?,?,?,?,?,?,?,?,?,?)",(booking_id, movie_id, price, forename,\
                                                                                     surname, email, qr, num_VIPs, num_children, num_elders, num_normal, str(datetime.today().strftime("%d-%m-%Y"))))
        
        self.conn.commit()


    #Removes a ticket when the booking is removed
    def remove_ticket(self, booking_id):
        self.cur.execute("DELETE FROM tickets WHERE booking_id=?",(booking_id,))
        self.conn.commit()

    #Generates the QR code of the ticket which will be sent over email
    def qr_code_generator(self, booking_id, screening_id):
        
        qr = qrcode.QRCode(
            version = 1,
            box_size = 5,
            border = 5
        )

        #self.cur.execute("SELECT * FROM tickets WHERE id=?",(ticket_id,))
        #data = self.cur.fetchone()
        data = (1,2,3,4,7,'Kostas','Biris','kostas_biris@outlook.com',0,2,0)
        qr.add_data(data)
        qr_code  = qr.make(fit=True)
        
        img = qr.make_image(fill = 'black', back_color = 'white')
        img.save("QR_Code.png")
        return img


    def qr_to_blob(self, qr):
        return np.asarray(qr).dumps()

    def im_from_bytes(self, bytes):
        return PIL.Image.frombytes(mode='1', size = bytes.shape[::-1], data=np.packbits(bytes, axis=1))

    def ticket_to_pdf(self, ticket_id):

        #self.cur.execute("SELECT id FROM tickets WHERE id=?",(ticket_id,))
        #database_info = self.cur.fetchone()
        
        #                     0           1         2          3        4       5         6       7    8      9           10           11
        #database_info = (ticket_id, booking_id, movie_id, screen_id, price, forename, surname, email, qr, num_VIPs, num_children, num_elders)
        database_info = (1,2,3,4,7.50,'Kostas','Biris','kostas_biris@outlook.com',0,2,0)

        #self.cur.execute("SELECT seats FROM bookings Where id=?",(database_info[1]))
        #seats = self.cur.fetchone()
        seats = ['A1','A2','A3']

        #self.cur.execute("SELECT seats FROM bookings Where id=?",(database_info[1]))
        #seats = self.cur.fetchone()

        #self.cur.execute("SELECT name FROM movies WHERE id=?",(database_info[2]))     
        #movie_name = self.cur.fetchone()
        movie_name = 'Captain America: The Winter Soldier'


        #self.cur.execute("SELECT screening_id FROM bookings WHERE id=?",(booking_id,))
        #screening_id = self.cur.fetchone()

        #self.cur.execute("SELECT date FROM screenings WHERE id=?",(screening_id,))
        #date = self.cur.fetchone()
        date = '19-05-2021'

        #self.cur.execute("SELECT time FROM screenings WHERE id=?",(screening_id,))
        #time = self.cur.fetchone()
        time = '21:00'


        #                    0         1           2         3
        #ticket_info = (ticket_id, booking_id, movie_id, screen_id, 
        #                 4        5       6       7   
        #               price, forename, surname, email,
        #                  8           9          10
        #               num_VIPs, num_children, num_elders,
        #                 11       12       13    14
        #               seats, movie_name, date, time)
        ticket_info = database_info + (seats, movie_name, date, time)

        #---------Contents-------------------------
        fileName = 'yourCinemaTickets.pdf'
        documentTitle = 'Cinema Tickets'
        title = 'The Big Picture Cinema'
        subTitle = 'Your Cinema Tickets'

        textLines = [
        f'Booking ID: {ticket_info[1]}',
        f'Movie Name: {ticket_info[12]}',
        f'Screen No: {ticket_info[3]}',
        f'Date & time: {ticket_info[13]},{ticket_info[14]}',
        '',
        f'Seats: {ticket_info[11]}',
        f'Num VIP\'s: {ticket_info[8]}',
        f'Num Children: {ticket_info[9]}',
        f'Num Elders: {ticket_info[10]}',
        '',
        f'Forename: {ticket_info[5]}',
        f'Surname: {ticket_info[6]}',
        '',
        f'Price: £{ticket_info[4]}',
        ]

        image = 'QR_Code.png'
        #--------------------------------------------

        #----------PDF Creator-----------------------
        
        pdf = canvas.Canvas(fileName)
        pdf.setTitle(documentTitle)

        #----------Fonts and Text--------------------

        #Title    
        pdf.drawCentredString(300, 770, title)

        #Subtitle
        pdf.setFillColorRGB(0, 0, 255)
        pdf.setFont("Courier-Bold", 24)
        pdf.drawCentredString(290,720, subTitle)

        #Line underneath the Subtitle
        pdf.line(30, 710, 550, 710)

        #Actual text containing booking info
        text = pdf.beginText(40, 680)
        text.setFont("Courier", 18)
        text.setFillColor(colors.red)
        for line in textLines:
            text.textLine(line)

        pdf.drawText(text)

        #QR Code image
        pdf.drawInlineImage(image, 130, 100)
        #--------------------------------------------
        
        pdf.save()


    def email_ticket(self, cust_forename, cust_surname, cust_email, qr_code):
        cinema_email = 'theBigPictureCinema2021@gmail.com'
        cinema_password = 'thebigpicture2021'

        message = EmailMessage()
        message['from'] = cinema_email
        message['to'] = cust_email
        message['subject'] = "Your tickets from the Big Picture Cinema"
        
        msg = f"""

            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Your Tickets from the Big Picture Cinema</title>
                </head>
                <body>
                    <h3>Dear {cust_forename} {cust_surname}, thank you for your purchase. Please find your tickets attached to this email</h3>
                </body>
            </html>
        """
         
        message.add_alternative(msg,'html')

        files = ['yourCinemaTickets.pdf']

        for file in files:
            with open(file, 'rb') as f:
                file_data = f.read()
                file_name = f.name
            message.add_attachment(file_data, maintype='application', subtype='octet-stream', filename=file_name)

        print('Sending Email...')
        smtp = smtplib.SMTP(host='smtp.gmail.com',port=587)
        smtp.starttls()
        smtp.login(cinema_email,cinema_password)
        smtp.send_message(message)
        print('Email Sent')


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
        print(u)
        if not u : return False,-1
        return check_password_hash(u[5], password), u[0]


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
    def add_session(self, ip, time_connected, account_type, customer_id, employee_id, manager_id):
        #_hash = generate_password_hash(password)
        print('add session, ',ip)
        if customer_id!='NULL':
            self.cur.execute("INSERT INTO sessions VALUES (NULL, ?,?,?,?,NULL,NULL)",(ip, time_connected,  account_type, customer_id))
            self.conn.commit()
        elif employee_id!='NULL':
            self.cur.execute("INSERT INTO sessions VALUES (NULL, ?,?,?,NULL,?,NULL)",(ip, time_connected, account_type, employee_id))
            self.conn.commit()
        elif manager_id!='NULL':
            self.cur.execute("INSERT INTO sessions VALUES (NULL, ?,?,?,NULL,NULL,?)",(ip, time_connected,  account_type, manager_id))
            self.conn.commit()
        


    def ip_in_session(self, ip):

        self.cur.execute("SELECT * FROM sessions WHERE ip=?",(ip,))
        return self.cur.fetchone()


    def logout(self, ip):
        self.cur.execute("SELECT * FROM sessions WHERE ip=?",(ip,))
        data = self.cur.fetchone()
        if not data: return False
        id_ = data[0]
        self.cur.execute("DELETE FROM sessions WHERE id=?",(id_,))
        self.conn.commit()
        return True

    def clear_sessions(self):
        self.cur.execute("SELECT * FROM sessions")
        data = self.cur.fetchall()

        for d in data:
            if (time.time()-float(d[2])) > 1800:
                self.cur.execute("SELECT * FROM sessions WHERE id=?",(d[0],))
                self.remove_session(d[0])
                self.conn.commit()
        
    def remove_session(self,id):
        self.cur.execute("DELETE FROM sessions WHERE id=?",(id,))
        self.conn.commit()

    
        #self.cur.execute("INSERT INTO sessions VALUES (NULL, ?,?,?,?,?,?,?)",(ip, time_connected, time_disconnected, account_type, customer_id, employee_id, manager_id))
        #self.conn.commit()
#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=


#=-=-=-=-=-=-=-=-=-=ANALYTICS-=-=-=-=-=-=-=-=-=-=-=-=


    def add_daily_analytics(self, movie_id, movie_name, date, income = 0.0, num_tickets = 0):
        self.cur.execute("INSERT INTO daily_analytics VALUES (NULL, ?,?,?,?,?)",(movie_id, movie_name, date, income, num_tickets))
        self.conn.commit()

    def add_overall_analytics(self, movie_id, movie_name, income = 0.0, num_tickets = 0):
        self.cur.execute("INSERT INTO overall_analytics VALUES (NULL, ?,?,?,?)",(movie_id, movie_name, income, num_tickets))
        self.conn.commit()


    def update_movie_daily_income(self, movie_name, date, price):
        self.cur.execute("SELECT id FROM movies name=?",(movie_name,))
        movie_id = self.cur.fetchone()

        self.cur.execute("SELECT income FROM daily_analytics WHERE movie_name=? AND date=?",(movie_name,date,))
        income = self.cur.fetchone()

        income += price

        self.cur.execute("UPDATE daily_analytics SET income=? WHERE movie_name=? AND date=?",(income, movie_name, date,))
        
        self.conn.commit()

    def update_movie_overall_income(self, movie_name, price):
        self.cur.execute("SELECT id FROM movies name=?",(movie_name,))
        movie_id = self.cur.fetchone()

        self.cur.execute("SELECT income FROM overall_analytics WHERE movie_name=?",(movie_name,))
        income = self.cur.fetchone()

        income += price

        self.cur.execute("UPDATE daily_analytics SET income=? WHERE movie_name=? AND date=?",(income, movie_name, date,))
        
        self.conn.commit()

    # def cinema_weekly_income(self, week_start, week_end):
    #     #self.cur.execute("SELECT income FROM daily_analytics WHERE date >=? AND date <=?",(week_start,week_end,))
    #     #rev_tuple = self.cur.fetchall()
    #     rev_tuple = (10,20,50,20)
    #     weekly_income = sum(list(rev_tuple))    

    #     #print(weekly_income)
    #     return weekly_income

    # def cinema_overall_income(self):
    #     #self.cur.execute("SELECT income FROM overall_analytics")
    #     #rev_tuple = self.cur.fetchall()
    #     rev_tuple = (10,20,50,20,60,10,20,10,50)
    #     overall_income = sum(list(rev_tuple))

    #     print(overall_income)
    #     #return overall_income


    # def movie_weekly_income(self, movie_id, week_start, week_end):
    #     #self.cur.execute("SELECT income FROM daily_analytics WHERE movie_id=? AND date >=? AND date <=?",(movie_id,week_start,week_end,))
    #     #rev_tuple = self.cur.fetchall()
    #     rev_tuple = (10,20,50,20)
    #     weekly_income = sum(list(rev_tuple))    

    #     #print(weekly_income)
    #     return weekly_income

    # def movie_overall_income(self, movie_id):
    #     self.cur.execute("SELECT date,income FROM overall_analytics WHERE movie_id=?",(movie_id,))
    #     rev_tuple = self.cur.fetchone()
    #     #rev_tuple = (10,20,50,20,60,10,20,10,50)
    #     print(rev_tuple)
    #     #overall_income = sum(list(rev_tuple))

    #    # print(overall_income)
    #     #return overall_income
    
    def quick_get_overall_incomes(self, id):
        data = self.fetch()[9]
        for d in data:
            if d[0] == id:
                return d

#-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=

#=-=-=-=-=-=-=-=-=-=PAYMENTS-=-=-=-=-=-=-=-=-=-=
    
    def add_payment(self, payment_date, customer_id, holder_name, postcode, card_number, expiration_date):
        _card_number = generate_password_hash(card_number)
        self.cur.execute("INSERT INTO customers VALUES (NULL, ?,?,?,?,?)",(customer_id, holder_name, postcode, _card_number, expiration_date))
        self.conn.commit()


    def remove_payment(self, payment_date, id=-1, customer_id=-1, holder_name="No name",):

        if(id == -1):

            #Remove a specific using the customer's id and the payment date
            if(customer_id != -1):
                self.cur.execute("DELETE FROM payments WHERE customer_id=? AND payment_date=?",(customer_id, payment_date,))
            
            #Remove a specific using the card holders name and the payment date
            elif(customer_id == -1 and holder_name!="No name"):
                self.cur.execute("DELETE FROM payments WHERE forename=? holder_name=? AND payment_date=?",(holder_name,payment_date,))
        
        else:
            self.cur.execute("DELETE FROM payments WHERE id=?",(id,))

        self.conn.commit()
#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=




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
db.add_movie('seatmap Movie Name', 'seatmapMovieblurb', '16' ,'writer', 'seatmapMovieDirector','seatmapMovieActor', '12-12-2021')
db.add_customer('seatmapCustomerFName','seatmapCustomerSName', 'seatmapCustomerEmail', 'seatmapCustomerPhone','seatmapCustomerPassword','01-01-01')

db.add_employee("staff1_fn", "staff1_sn", "staff1@email.com", 1, "staff1_password", True)
db.add_employee("staff2_fn", "staff2_sn", "staff2@email.com", 1, "staff2_password", True)
db.add_employee("staff3_fn", "staff3_sn", "staff3@email.com", 1, "staff3_password", True)
db.add_employee("staff4_fn", "staff4_sn", "staff4@email.com", 1, "staff4_password", True)


db.add_screening('12-12-2021','18:00', 1,1, 1, 2,3,4)

dat = db.fetch()[2]
seatmap = dat[0][5]

#print(seatmap)

db.add_booking(1,1,'A1,B1,C4')
dat = db.fetch()[2]
seatmap = dat[0][5]
#print(seatmap)
"""
#-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
#db = Database('cinema.db')
#db.qr_code_generator(1)
#db.ticket_to_pdf(1)
#db.email_ticket('yourForename', 'yourSurname', 'yourEmail', 5)


#Database('cinema.db').add_screen(25,5,5)
#print(Database('cinema.db').get_upcoming())
#db.graph_analytics()


db = Database('cinema.db')
db.add_customer('seatmapCustomerFName','seatmapCustomerSName', 'seatmapCustomerEmail', 'seatmapCustomerPhone','seatmapCustomerPassword','01-01-01')
db.add_booking(1, 1, 'A1,A2,A3')
#db.add_overall_analytics(1, 'spider-man', 10, 1)
