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
        self.conn = sql.connect(db, check_same_thread = False)
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
                                                              customer_id INTEGER,\
                                                              price FLOAT NOT NULL,\
                                                              forename TEXT NOT NULL, \
                                                              surname TEXT NOT NULL, \
                                                              email TEXT NOT NULL,\
                                                              qr BLOB NOT NULL, \
                                                              num_VIPs INTEGER NOT NULL,\
                                                              num_children INTEGER NOT NULL,\
                                                              num_elders INTEGER NOT NULL, \
                                                              num_normal INTEGER NOT NULL, \
                                                              date DATE NOT NULL, \
                                                              path TEXT NOT NULL)")

        self.cur.execute("CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY, \
                                                               forename TEXT NOT NULL, \
                                                               surname TEXT NOT NULL, \
                                                               email TEXT NOT NULL, \
                                                               phonenumber TEXT NOT NULL, \
                                                               password TEXT NOT NULL, \
                                                               dob DATE NOT NULL, \
                                                               stripe TEXT NOT NULL, \
                                                               pm TEXT NOT NULL)")


        self.cur.execute("CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY, \
                                                               forename TEXT NOT NULL, \
                                                               surname TEXT NOT NULL, \
                                                               email TEXT NOT NULL, \
                                                               phonenumber TEXT NOT NULL, \
                                                               hash TEXT NOT NULL, \
                                                               isManager BIT NOT NULL)")
          

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

        self.cur.execute("SELECT * FROM employees")
        employees = self.cur.fetchall()
        return movies, screens, screenings, customers, bookings, tickets, employees

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
        self.cur.execute("UPDATE movies SET name=?, blurb=?, certificate=?, director=?, writers=?, leadactors=?, release_date=?, omdbid=?, poster_path=?, runtime=?, youtube_key=?, genres=? WHERE id=?",(*data, id))

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

    def get_movie_screenings(self, id):
        self.cur.execute("SELECT * FROM screenings WHERE movie_id=?",(id, ))
        return self.cur.fetchall()
        

    def update_screening(self, id, data):

        self.cur.execute("UPDATE screenings SET date=?, time=?, screen_id=?, movie_id=?, seatmap=? WHERE id=?",(*data, id))

        self.conn.commit()

    def get_seatmap(self, id):

        self.cur.execute("SELECT seatmap FROM screenings WHERE id=?",(id,))
        return self.cur.fetchone()[0]


    def searchdates(self, date):
        screenings = set()
        movies = set()

        for row in self.fetch()[2]:
            date_ = row[1]
            if date == date_:
                screenings.add(row[0])
                movies.add(row[4])

        moviedata = []
        for movie in movies:
            moviedata.append(self.quick_get_movie(movie))
        
        screeningdata = []
        for screening in screenings:
            screeningdata.append(self.quick_get_screening(screening))
        
        return moviedata, screeningdata


    def get_upcoming(self):
        #we want to find all of the screenings within the past 2 weeks, and send their information, along with all of the movies that are showing.
        screenings = set()
        movies = set()
        for row in self.fetch()[2]:
            date = row[1]
            a = datetime.strptime(date, "%d-%m-%Y")
            today = datetime.today()
            today = today - timedelta(days=1) # include "today" in the set of days for which we have to show a movie
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

        # print(screeningdata)
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
        if customer_id == 'NULL':
            self.cur.execute("INSERT INTO bookings VALUES (NULL, ?,NULL,?)", (screening_id, seats))
            self.conn.commit()
            self.cur.execute("SELECT id FROM bookings WHERE screening_id=? AND seats=?",(screening_id, seats))
            return self.cur.fetchone()[0]




        """
        else:
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
        """

    def remove_booking(self, id=-1, screen_id=-1, customer_id=-1,customer_forename="No forename", customer_surname="No surname",\
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
        self.remove_ticket(id)

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

        if data[1] == 'NULL':
            self.cur.execute("UPDATE bookings SET screening_id=?,  seats=?  WHERE id=?",(data[0],data[2], id))


        else:
            self.cur.execute("UPDATE bookings SET screening_id=?, customer_id=?, seats=?,  WHERE id=?",(*data, id))

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

    def add_ticket(self, booking_id, movie_id, price, forename, surname, email,path,qr,num_VIPs = 0, num_children = 0, num_elders = 0, num_normal=0, customer_id=-1):

        self.cur.execute("INSERT INTO tickets VALUES (NULL, ?,?,?,?,?,?,?,?,?,?,?,?,?,?)",(booking_id, movie_id ,customer_id, price, forename,\
                                                                                     surname, email, qr, num_VIPs, num_children, num_elders, \
                                                                                         num_normal, str(datetime.today().strftime("%d-%m-%Y")),path))
        
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
        #data = (1,2,3,4,7,'Kostas','Biris','kostas_biris@outlook.com',0,2,0)
        data = (booking_id, screening_id)
        qr.add_data(data)
        qr_code  = qr.make(fit=True)
        
        img = qr.make_image(fill = 'black', back_color = 'white')
        #img.save("QR_Code.png")
        return self.qr_to_blob(img)


    def qr_to_blob(self, qr):
        return np.asarray(qr).dumps()

    def im_from_bytes(self, bytes):
        return PIL.Image.frombytes(mode='1', size = bytes.shape[::-1], data=np.packbits(bytes, axis=1))

    def ticket_to_pdf(self, path, booking_id, forename, surname, movie, seats, parts, screen, screening, total,qr, date, time):

        fileName = path
        documentTitle = 'Cinema Tickets'
        title = 'The Big Picture Cinema'
        subTitle = 'Your Cinema Tickets'
        vip = parts.count('4')
        ch = parts.count('2')
        el = parts.count('3')
        ad = parts.count('1')

        textLines = []
        if forename == '' and surname == '':
            textLines = [
            f'Booking ID: {booking_id}',
            f'Movie Name: {movie}',
            f'Screen No: {screen}',
            f'Date & time: {date},{time}',
            '',
            f'Seats: {seats}',
            f'Num VIP\'s: {vip}',
            f'Num Children: {ch}',
            f'Num Elders: {el}',
            f'Num Adults: {ad}',
            '',
            f'Price: £{total}',
            ]
        else:
            textLines = [
            f'Booking ID: {booking_id}',
            f'Movie Name: {movie}',
            f'Screen No: {screen}',
            f'Date & time: {date},{time}',
            '',
            f'Seats: {seats}',
            f'Num VIP\'s: {vip}',
            f'Num Children: {ch}',
            f'Num Elders: {el}',
            f'Num Adults: {ad}',
            '',
            f'Forename: {forename}',
            f'Surname: {surname}',
            '',
            f'Price: £{total}',
            ]

        #image = 'QR_Code.png'
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
        pdf.drawInlineImage(self.im_from_bytes(pickle.loads(qr)), 130, 100)
        #--------------------------------------------
        pdf.save()

       

    def email_ticket(self, cust_forename, cust_surname, cust_email, path):
        cinema_email = 'bigpicture2021@outlook.com'
        cinema_password = 'naEs3DYYfPU9uWF'

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

        files = [path]

        for file in files:
            with open(file, 'rb') as f:
                file_data = f.read()
                file_name = f.name
            message.add_attachment(file_data, maintype='application', subtype='octet-stream', filename=file_name)

        print('Sending Email...')
        smtp = smtplib.SMTP(host='smtp-mail.outlook.com',port=587)
        smtp.starttls()
        smtp.login(cinema_email,cinema_password)
        smtp.send_message(message)
        print('Email Sent')

    def get_customer_tickets(self,customer_id):
        self.cur.execute("SELECT * FROM tickets WHERE customer_id=?",(customer_id,))
        return self.cur.fetchall()

    def get_customer_tickets_by_email(self,email):
        self.cur.execute("SELECT * FROM tickets WHERE email=?",(email,))
        return self.cur.fetchall()

    def quick_get_ticket(self, id):
        self.cur.execute("SELECT path FROM tickets WHERE id=?", (id))
        return self.cur.fetchone()

#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=

#=-=-=-=-=-=-=-=-=-=CUSTOMERS-=-=-=-=-=-=-=-=-=-=
    
    def add_customer(self, forename, surname, email, phonenumber, password, dob):
        # _hash = generate_password_hash(password)
        self.cur.execute("INSERT INTO customers VALUES (NULL, ?,?,?,?,?,?,?,?)",(forename, surname, email, phonenumber, password, dob, "",""))
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
        self.cur.execute("UPDATE customers SET forename=?, surname=?, email=?, phonenumber=?, password=?, dob=?,stripe=?,pm=? WHERE id=?",(*data, id))
        self.conn.commit()

    def pairStripe(self, email, stripe, pm):
        self.cur.execute("UPDATE customers SET stripe=?, pm=? WHERE email=?",(stripe,pm,email))
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

    def fetch_customer(self, email):

        self.cur.execute("SELECT * from customers WHERE email =?", (email,))
        return self.cur.fetchone()

    def validate_customer(self, email, password):
        self.cur.execute("SELECT * from customers WHERE email =?", (email,))
        u = self.cur.fetchone()
        print(u)
        if not u : return False,-1
        return check_password_hash(u[5], password), u[0]


    def validate_manager(self, email, password, id):
        self.cur.execute("SELECT * FROM employees WHERE email=?",(email,))
        m = self.cur.fetchone()
        print(m)
        if not m: return False, -1
        if not check_password_hash(m[5], password):
            return False, -1
        if not int(m[6]) ==1:
            return False, -1
        if not int(id) == m[0]:
            return False, -1

        return True, m[0]

    def validate_employee(self, password, id):
        self.cur.execute("SELECT * FROM employees WHERE id=?",(int(id),))
        e = self.cur.fetchone()

        return check_password_hash(e[5], password), e[0]



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
# db = Database('cinema.db')
# db.add_employee("staff4_fn", "staff4_sn", "jaredswift@hotmail.co.uk", 1, "staff4_password", True)
#-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
# db = Database('cinema.db')
#db.qr_code_generator(1)
#db.ticket_to_pdf(1)
#db.email_ticket('yourForename', 'yourSurname', 'yourEmail', 5)


Database('cinema.db').add_screen(35,8,6)
# Database('cinema.db').add_screening('04-04-2021', '16:00', 1, 1)
# Database('cinema.db').add_screening('04-04-2021', '18:00', 1, 1)
# Database('cinema.db').add_screening('04-04-2021', '20:00', 1, 1)
# Database('cinema.db').add_screening('05-04-2021', '16:00', 1, 2)
# Database('cinema.db').add_screening('08-04-2021', '13:45', 1, 3)
# Database('cinema.db').add_screening('09-04-2021', '13:45', 1, 3)
# Database('cinema.db').add_screening('10-04-2021', '13:45', 1, 3)
# Database('cinema.db').add_screening('15-04-2021', '13:45', 1, 3)
# Database('cinema.db').add_screening('15-04-2021', '13:46', 1, 3)
# Database('cinema.db').add_screening('15-04-2021', '13:47', 1, 3)

# db = Database('cinema.db')
# db.add_employee('Jared', 'Swift', 'jaredswift@hotmail.co.uk', '07495508368','12345678', True)

#print(Database('cinema.db').get_upcoming())
#db.graph_analytics()


# db = Database('cinema.db')
# db.add_customer('seatmapCustomerFName','seatmapCustomerSName', 'seatmapCustomerEmail', 'seatmapCustomerPhone','seatmapCustomerPassword','01-01-01')
# db.add_booking(1, 1, 'A1,A2,A3')
#db.add_overall_analytics(1, 'spider-man', 10, 1)
