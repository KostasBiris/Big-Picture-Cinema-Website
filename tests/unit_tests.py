import unittest #testing framework
from app.db import Database #our database class (MODULAR PROGRAMMING ;))
import sqlite3
import os #for path stuff
import selenium
import urllib.request #for testing server
from werkzeug.security import generate_password_hash, check_password_hash
import numpy as np
import pickle

def stepUp():
    return Database ('test.db'), sqlite3.connect('test.db')
    
def stepDown(db):
    del db
    _dir = os.path.abspath(os.path.join(__file__, os.pardir))
    _dir = os.path.abspath(os.path.join(_dir, os.pardir))
    if os.path.isfile(_dir+'/test.db'):
        os.remove(_dir+'/test.db')


class TestDataBase(unittest.TestCase):

    # Test that the database is successfully created on the instantiation of the Database class.
    def testDatabaseCreation(self):
        #Instantiate Database

        db, conn = stepUp()

        
        #Assertion to check that 'test.db' is created
        self.assertTrue(os.path.dirname(os.path.abspath(__file__))+'/test.db')

        #Manually connect to the database


        #The following section of code is used to ensure that the correct fields are present on each of the tables.
        #The assertions compare the expected fields against those received by the query executed.

        cursor = conn.execute('SELECT * FROM movies')
        self.assertEqual(['id','name','blurb','certificate','director','leadactors'], [cursor.description[0][0], cursor.description[1][0],cursor.description[2][0],cursor.description[3][0]
        ,cursor.description[4][0],cursor.description[5][0]])

        cursor = conn.execute('SELECT * FROM screens')
        self.assertEqual(['id','capacity','seatmap'],[cursor.description[0][0],cursor.description[1][0],cursor.description[2][0]])
        
        cursor = conn.execute('SELECT * FROM screenings')
        self.assertEqual(['id','date','time','screenid','movieid','seatmap','supervisor','upper_section','middle_section', 'lower_section'], [cursor.description[0][0],cursor.description[1][0],cursor.description[2][0],cursor.description[3][0],cursor.description[4][0],
        cursor.description[5][0],cursor.description[6][0],cursor.description[7][0],cursor.description[8][0], cursor.description[9][0] ])

        cursor = conn.execute('SELECT * FROM customers')
        self.assertEqual(['id', 'forename', 'surname', 'email', 'phonenumber', 'hash', 'dob'], [cursor.description[0][0],cursor.description[1][0],cursor.description[2][0],cursor.description[3][0],cursor.description[4][0],
        cursor.description[5][0],cursor.description[6][0]])

        cursor = conn.execute("SELECT * FROM bookings")
        self.assertEqual(['id','screeningid','customerid','seats'],[cursor.description[0][0],cursor.description[1][0],cursor.description[2][0],cursor.description[3][0]] )

        cursor = conn.execute("SELECT * FROM employees")
        self.assertEqual(['id', 'forename', 'surname', 'email', 'phonenumber', 'hash', 'isManager'], [cursor.description[0][0],cursor.description[1][0],cursor.description[2][0],cursor.description[3][0],cursor.description[4][0],
        cursor.description[5][0],cursor.description[6][0]])


        stepDown(db)


    #Test that the correct output is produced when 'fetching' an empty database.
    def testFetchEmpty(self):


        testDataBase = stepUp()[0]

        #Fetch the rows.
        rows = testDataBase.fetch()

        #Asserts that the sum of the lengths of the rows fetched is 0 (False)
        self.assertFalse(len(rows[0]) + len(rows[1]) + len(rows[2]) + len(rows[3]) + len(rows[4])+len(rows[5]))

        stepDown(testDataBase)

    #Test that a movie is correctly inserted.
    def testInsertMovie(self):
        testDataBase,conn = stepUp()

        #Add an entry for testing.
        testDataBase.add_movie('On the Waterfront', 'A movie about an ex-prizefighter, on the waterfront.', '16', 'Elia Kazan', 'Marlon Brando', '22-06-1954')

        #Manually connect to the database.
       
        cursor = conn.execute('SELECT * FROM movies')

        #Asserts that the rows of the 'movies' table only contains our test entry, and that it does indeed contain this entry correctly.
        self.assertEqual(cursor.fetchall(), [(1,'On the Waterfront', 'A movie about an ex-prizefighter, on the waterfront.', '16', 'Elia Kazan', 'Marlon Brando','22-06-1954')])

        stepDown(testDataBase)


    #Test that a movie is correctly updarted.
    def testUpdateMovie(self):
        testDataBase,conn = stepUp()

        conn.cursor().execute("INSERT INTO movies VALUES (NULL, ?,?,?,?,?,?)",('On the Waterfront', 'A movie about an ex-prizefighter, on the waterfront.',
        '16', 'Elia Kazan', 'Marlon Brando', '22-06-1954'))
        conn.commit()
        conn.close()
        #Update our test movie.
        testDataBase.update_movie(1, ('On the Waterfront', 'A movie about an ex-prizefighter.', '16', 'Elia Kazan', 'Marlon Brando, Vivien Leigh', '22-06-1954'))
        
        #Manually connect to the database.
        conn = sqlite3.connect('test.db')
        cursor = conn.execute('SELECT * FROM movies')

        #Asserts that the rows of the 'movies' table only contains our test entry, and that it has been correctly updated.
        self.assertEqual(cursor.fetchall(), [(1,'On the Waterfront', 'A movie about an ex-prizefighter.', '16', 'Elia Kazan', 'Marlon Brando, Vivien Leigh', '22-06-1954')])

        stepDown(testDataBase)

    #Test that the correct output is produced when 'fetching' a database with entries
    def testFetchNonEmpty(self):
        testDataBase,conn = stepUp()
        #Fetch rows
        rows = testDataBase.fetch()

        #Assert that the sum of the lengths of the rows in the database is 5 (as a record has been added to each of the 5 tables.)
        self.assertEqual(6, len(rows[0]) + len(rows[1]) + len(rows[2]) + len(rows[3]) + len(rows[4]) + len(rows[5]))

        #Manually connect to the database.
        conn = sqlite3.connect('test.db')

        #The following assertion ensures that the the result of the fetch function is equal to the tuple of the results of the following queries.
        cur = conn.execute("SELECT * FROM movies")
        movies = cur.fetchall()
        
        cur = conn.execute("SELECT * FROM screens")
        screens = cur.fetchall()
        
        cur = conn.execute("SELECT * FROM screenings")
        screenings = cur.fetchall()
            
        cur = conn.execute("SELECT * FROM customers")
        customers = cur.fetchall()

        cur = conn.execute("SELECT * FROM bookings")
        bookings = cur.fetchall()

        cur = conn.execute("SELECT * FROM employees")
        employees = cur.fetchall()
        self.assertEqual(rows[0], movies)
        self.assertEqual(rows[3], customers)
        self.assertEqual(rows[4], bookings)
        self.assertEqual(rows[5], employees)

        self.assertEqual(len(screenings), len(rows[2]))


        for i in range(len(screenings)):
            for j in range(4):
                self.assertEqual(screenings[i][j], rows[2][i][j])
            self.assertEqual(db.get_seatmap_from_blob(screenings[i][5]).all(), rows[2][i][5].all())
            

        self.assertEqual(len(screens),len(rows[1]))

        for i in range(len(screens)):
            for j in range(1):
                self.assertEqual(screenings[i][j], rows[1][i][j])
            self.assertEqual(db.get_seatmap_from_blob(screens[i][2]).all(), rows[1][i][2].all())

        


    #Test that a movie is correctly removed from the database.
    def testRemoveMovie(self):
        testDataBase,conn = stepUp()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO movies VALUES (NULL, ?,?,?,?,?,?)",("On the Waterfront", "A movie about an ex-prizefighter, on the waterfront.", "16", "Elia Kazan", "Marlon Brando", "22-06-1954"))
        conn.commit()
        #Store the previous number of rows in the 'movies' table.
        cursor.execute("SELECT * FROM movies")
        prev_len = len(cursor.fetchall())
        conn.close()
        #Remove the movie
        testDataBase.remove_movie(1)

        conn = sqlite3.connect('test.db')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM movies")
        new_len = len(cursor.fetchall())
        #Assert that the number of rows has decremented.
        self.assertEqual(prev_len-1, new_len)
        #Assert that our original entry is NOT in the 'movies' table.
        self.assertTrue((1,'On the Waterfront', 'A movie about an ex-prizefighter, on the waterfront.', '16', 'Elia Kazan', 'Marlon Brando', '02-02-2002') not in conn.cursor().fetchall())

        stepDown(testDataBase)

    #Test that a screen is correctly inserted.
    def testInsertScreen(self):
        testDataBase,conn = stepUp()
        
        #Add a screen
        testDataBase.add_screen(25,5,5)

        #Manually connect to the database
        conn = sqlite3.connect('test.db')        
        cursor = conn.execute('SELECT * FROM screens')
        seatmapA = np.zeros((5,5), dtype=int)
        n = int(len(seatmapA)/2)

        for i in range(len(seatmapA[n])):

            #Empty space
            if(i==0 or i==1 or i==(len(seatmapA[n])-2) or i==(len(seatmapA[n])-1)):
                seatmapA[n][i]=-1
            
            #VIP seats
            else:
                seatmapA[n][i]=2

        #Asserts that the rows of the 'screens' table only contains our test entry, and that it does indeed contain this entry correctly.
        self.assertEqual(cursor.fetchall(), [(1, 25, seatmapA.dumps())])

        stepDown(testDataBase)

    #Test that a screen is correctly updated.
    def testUpdateScreen(self):
        testDataBase,conn = stepUp()
        #Update the screen

        seatmapA = np.zeros((5,5), dtype=int)
        n = int(len(seatmapA)/2)

        for i in range(len(seatmapA[n])):

            #Empty space
            if(i==0 or i==1 or i==(len(seatmapA[n])-2) or i==(len(seatmapA[n])-1)):
                seatmapA[n][i]=-1
            
            #VIP seats
            else:
                seatmapA[n][i]=2

        conn.cursor().execute("INSERT INTO screens VALUES (NULL, ?, ?)", (25, seatmapA.dumps()))

        conn.commit()
        conn.close()


        testDataBase.update_screen(1, (36,6,6))

        #Manually connect to the database.
        conn = sqlite3.connect('test.db')
        cursor = conn.execute("SELECT * FROM screens")
        seatmapA = np.zeros((6,6), dtype=int)
        n = int(len(seatmapA)/2)

        for i in range(len(seatmapA[n])):

            #Empty space
            if(i==0 or i==1 or i==(len(seatmapA[n])-2) or i==(len(seatmapA[n])-1)):
                seatmapA[n][i]=-1
            
            #VIP seats
            else:
                seatmapA[n][i]=2

        #Asserts that the rows of the 'screens' table only contains our test entry, and that it has been correctly updated.
        self.assertEqual(cursor.fetchall(), [(1,36, seatmapA.dumps())])

        stepDown(testDataBase)

    #Test that a screen is correctly removed from the database.
    def testRemoveScreen(self):
        testDataBase,conn  = stepUp()
        
        seatmapA = np.zeros((5,5), dtype=int)
        n = int(len(seatmapA)/2)

        for i in range(len(seatmapA[n])):

            #Empty space
            if(i==0 or i==1 or i==(len(seatmapA[n])-2) or i==(len(seatmapA[n])-1)):
                seatmapA[n][i]=-1
            
            #VIP seats
            else:
                seatmapA[n][i]=2
        cursor = conn.cursor()
        cursor.execute("INSERT INTO screens VALUES (NULL, ?, ?)", (25, seatmapA.dumps()))
        
        conn.commit()
       
        #Store the previous number of rows in the 'screens' table.
        cursor.execute("SELECT * FROM screens")
        prev_len = len(cursor.fetchall())
        conn.close()
        #Remove the screen
        testDataBase.remove_screen(1)
        seatmapA = np.zeros((6,6), dtype=int)
        #Assert that the number of rows has decremented.
        conn = sqlite3.connect('test.db')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM screens")
        new_len = len(cursor.fetchall())
    
        self.assertEqual(prev_len-1, new_len)
        #Assert that our original entry is NOT in the 'screens' table
        self.assertTrue((1,50, seatmapA.dumps()) not in conn.cursor().fetchall())
        conn.close()
        stepDown(testDataBase)

    #Test that a screening is correctly inserted.
    def testInsertScreening(self):
        testDataBase, conn = stepUp()
        
        cursor = conn.cursor()

        #Insert test screening
        cursor.execute("INSERT INTO movies VALUES (NULL, ?,?,?,?,?,?)",("On the Waterfront", "A movie about an ex-prizefighter, on the waterfront.", "16", "Elia Kazan", "Marlon Brando", "22-06-1954"))
        seatmapA = np.zeros((5,5), dtype=int)
        n = int(len(seatmapA)/2)

        for i in range(len(seatmapA[n])):

            #Empty space
            if(i==0 or i==1 or i==(len(seatmapA[n])-2) or i==(len(seatmapA[n])-1)):
                seatmapA[n][i]=-1
            
            #VIP seats
            else:
                seatmapA[n][i]=2
        cursor = conn.cursor()
        cursor.execute("INSERT INTO screens VALUES (NULL, ?, ?)", (25, seatmapA.dumps()))
        cursor.execute("INSERT INTO employees VALUES (NULL, ?,?,?,?,?,?)", ("staff1_fn", "staff1_sn", "staff1@email.com", "07495508368", "staff1_password", True))
        conn.commit()
        conn.close()
        testDataBase.add_screening('01-03-2020','18:00', 1, 1,1,1,1,1)
        #Manually connect to the database.
        conn = sqlite3.connect('test.db')
        cursor = conn.execute('SELECT * FROM screenings')
        #Asserts that the rows of the 'screenings' table only contains our test entry, and that it does indeed contain this entry correctly.
        self.assertEqual(cursor.fetchall(), [(1, '01-03-2020', '18:00', 1, 1, seatmapA.dumps(),1,1,1,1)])

        stepDown(testDataBase)


    #Test that a screening is correctly updated.
    def testUpdateScreening(self):
        testDataBase, conn = stepUp()
        
        cursor = conn.cursor()

        #Insert test screening
        cursor.execute("INSERT INTO movies VALUES (NULL, ?,?,?,?,?,?)",("On the Waterfront", "A movie about an ex-prizefighter, on the waterfront.", "16", "Elia Kazan", "Marlon Brando", "22-06-1954"))
        seatmapA = np.zeros((5,5), dtype=int)
        n = int(len(seatmapA)/2)

        for i in range(len(seatmapA[n])):

            #Empty space
            if(i==0 or i==1 or i==(len(seatmapA[n])-2) or i==(len(seatmapA[n])-1)):
                seatmapA[n][i]=-1
            
            #VIP seats
            else:
                seatmapA[n][i]=2
        cursor = conn.cursor()
        cursor.execute("INSERT INTO screens VALUES (NULL, ?, ?)", (25, seatmapA.dumps()))
        cursor.execute("INSERT INTO employees VALUES (NULL, ?,?,?,?,?,?)", ("staff1_fn", "staff1_sn", "staff1@email.com", "07495508368", "staff1_password", True))
        cursor.execute("INSERT INTO screenings VALUES (NULL, ?,?,?,?,?,?,?,?,?) ", ('01-03-2020','18:00', 1, 1, seatmapA.dumps(), 1,1,1,1))
        conn.commit()
        conn.close()
        testDataBase.update_screening(1, ('02-03-2020', '19:00', 1, 1, seatmapA.dumps(),1,1,1,1))
        conn = sqlite3.connect('test.db')
        cursor = conn.execute('SELECT * FROM screenings')

        #Asserts that the rows of the 'screenings' table only contains our test entry, and that it has been correctly updated.
        self.assertEqual(cursor.fetchall(), [(1, '02-03-2020', '19:00', 1, 1, seatmapA.dumps(), 1,1,1,1)])

    #Test that a screening is correctly removed.
    def testRemoveScreening(self):
        testDataBase, conn = stepUp()
        
        cursor = conn.cursor()

        #Insert test screening
        cursor.execute("INSERT INTO movies VALUES (NULL, ?,?,?,?,?,?)",("On the Waterfront", "A movie about an ex-prizefighter, on the waterfront.", "16", "Elia Kazan", "Marlon Brando", "22-06-1954"))
        seatmapA = np.zeros((5,5), dtype=int)
        n = int(len(seatmapA)/2)

        for i in range(len(seatmapA[n])):

            #Empty space
            if(i==0 or i==1 or i==(len(seatmapA[n])-2) or i==(len(seatmapA[n])-1)):
                seatmapA[n][i]=-1
            
            #VIP seats
            else:
                seatmapA[n][i]=2
        cursor = conn.cursor()
        cursor.execute("INSERT INTO screens VALUES (NULL, ?, ?)", (25, seatmapA.dumps()))
        cursor.execute("INSERT INTO employees VALUES (NULL, ?,?,?,?,?,?)", ("staff1_fn", "staff1_sn", "staff1@email.com", "07495508368", "staff1_password", True))
        cursor.execute("INSERT INTO screenings VALUES (NULL, ?,?,?,?,?,?,?,?,?) ", ('01-03-2020','18:00', 1, 1, seatmapA.dumps(), 1,1,1,1))
        cursor.execute("SELECT * FROM screenings")
        prev_len = len(cursor.fetchall())
        conn.commit()
        conn.close()
        testDataBase.remove_screening(1)

        conn = sqlite3.connect('test.db')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM screenings")
        new_len = len(cursor.fetchall())
        #Assert that the number of rows has decremented.
        self.assertEqual(prev_len-1,new_len)

        #Assert that our original entry is NOT in the 'screenings' table
        self.assertTrue((1,'01-03-2020', '18:00', 1, 1, seatmapA.dumps(), 1, 1, 1, 1) not in cursor.fetchall())


        stepDown(testDataBase)

    #Test that a customer is inserted correctly.
    def testInsertCustomer(self):
        testDataBase, conn = stepUp()

        #Insert test customer
        testDataBase.add_customer('Jared', 'Swift', 'ed18jws@leeds.ac.uk', '07495508368', 'o kostas einai andras', '13-07-2001')

        #Manually connect to the database.
        conn = sqlite3.connect('test.db')
        cursor = conn.execute('SELECT * FROM customers')    
        fetch = cursor.fetchall()
        hash = fetch[0][5]
        fetch = [tuple(list(f)[:5] + list(f)[6:]) for f in fetch]
        #Asserts that the rows of the 'customers' table only contains our test entry, and that it does indeed contain this entry correctly.
        self.assertEqual(fetch, [(1, 'Jared', 'Swift', 'ed18jws@leeds.ac.uk', '07495508368', '13-07-2001')])
        self.assertTrue(check_password_hash(hash, 'o kostas einai andras'))

        stepDown(testDataBase)


    def testUpdateCustomer(self):
        testDataBase, conn = stepUp()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO customers VALUES (NULL, ?,?,?,?,?,?)", ('Kostas', 'Biris', 'sc19kb@leeds.ac.uk', '07495508228', generate_password_hash('i kostas einai yuneika'), '13-07-1900'))
        conn.commit()
        conn.close()
        #Update test customer
        testDataBase.update_customer(1, ('Kostas', 'Biris', 'sc19kb@leeds.ac.uk', '07495508228', 'i kostas einai yuneika', '13-07-1900'))
        conn = sqlite3.connect('test.db')
        cursor = conn.execute('SELECT * FROM customers')
        fetch = cursor.fetchall()
        hash = fetch[0][5]
        #Connect manually to the database.

        
        fetch = [tuple(list(f)[:5] + list(f)[6:]) for f in fetch]
        #Asserts that the rows of the 'customers' table only contains our test entry, and that it has been correctly updated.
        self.assertEqual(fetch, [(1,'Kostas', 'Biris', 'sc19kb@leeds.ac.uk', '07495508228', '13-07-1900')])
        fetch = cursor.fetchall()
        self.assertTrue(check_password_hash(hash, 'i kostas einai yuneika'))

        stepDown(testDataBase)
    #Test that a customer is correctly removed.
    def testRemoveCustomer(self):
        testDataBase, conn = stepUp()

        #Store the previous number of rows in the 'customers' table.
        cursor = conn.cursor()
        cursor.execute("INSERT INTO customers VALUES (NULL, ?,?,?,?,?,?)", ('Kostas', 'Biris', 'sc19kb@leeds.ac.uk', '07495508228', generate_password_hash('i kostas einai yuneika'), '13-07-1900'))
        conn.commit()
        cursor.execute("SELECT * FROM customers")
        prev_len = len(cursor.fetchall())
        conn.close()

        #Remove the test customer.
        testDataBase.remove_customer(1)

        #Assert that the length has decremented.
        conn = sqlite3.connect('test.db')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM customers")
        new_len = len(cursor.fetchall())
        
        self.assertEqual(prev_len-1, new_len)

        #Assert that our original entry is NOT in the 'customers' table
        self.assertTrue((1, 'Jared', 'Swift', 'ed18jws@leeds.ac.uk', '07495508368', 'o kostas einai andras', '13-07-2001') not in [tuple(list(f)[:5] + list(f)[6:]) for f in cursor.fetchall()])

        stepDown(testDataBase)

    def testInsertEmployee(self):
        testDataBase, conn = stepUp()

        #Insert test customer
        testDataBase.add_employee('Jared', 'Swift', 'ed18jws@leeds.ac.uk', '07495508368','o kostas einai andras', True)

        #Manually connect to the database.
        conn = sqlite3.connect('test.db')
        cursor = conn.execute('SELECT * FROM employees')    
        fetch = cursor.fetchall()
        hash = fetch[0][5]
        fetch = [tuple(list(f)[:5] + list(f)[6:]) for f in fetch]
        #Asserts that the rows of the 'customers' table only contains our test entry, and that it does indeed contain this entry correctly.
        self.assertEqual(fetch, [(1, 'Jared', 'Swift', 'ed18jws@leeds.ac.uk', '07495508368', True)])
        self.assertTrue(check_password_hash(hash, 'o kostas einai andras'))
        stepDown(testDataBase)
    
    def testUpdateEmployee(self):
        testDataBase, conn = stepUp()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO employees VALUES (NULL, ?,?,?,?,?,?)", ('Kostas', 'Biris', 'sc19kb@leeds.ac.uk', '07495508228', generate_password_hash('i kostas einai yuneika'), True))
        conn.commit()
        conn.close()
        #Update test customer
        testDataBase.update_employee(1, ('Kostas', 'Biris', 'sc19kb@leeds.ac.uk', '07495508228', 'o kostas einai andras', True))
        conn = sqlite3.connect('test.db')
        cursor = conn.execute('SELECT * FROM employees')
        fetch = cursor.fetchall()
        hash = fetch[0][5]
        #Connect manually to the database.

        fetch = [tuple(list(f)[:5] + list(f)[6:]) for f in fetch]
        #Asserts that the rows of the 'customers' table only contains our test entry, and that it has been correctly updated.
        self.assertEqual(fetch, [(1,'Kostas', 'Biris', 'sc19kb@leeds.ac.uk', '07495508228', True)])
        self.assertTrue(check_password_hash(hash, 'o kostas einai andras'))
    
        stepDown(testDataBase)

    def testRemoveEmployee(self):
        testDataBase, conn = stepUp()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO employees VALUES (NULL, ?,?,?,?,?,?)", ('Kostas', 'Biris', 'sc19kb@leeds.ac.uk', '07495508228', generate_password_hash('i kostas einai yuneika'), True))
        conn.commit()
        cursor.execute("SELECT * FROM employees")
        prev_len = len(cursor.fetchall())
        conn.close()

        #Store the previous number of rows in the 'customers' table.
        

        #Remove the test customer.
        testDataBase.remove_employee(1)
        conn = sqlite3.connect('test.db')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM employees")
        new_len = len(cursor.fetchall())
        #Assert that the length has decremented.
        self.assertEqual(prev_len-1, new_len)

        #Assert that our original entry is NOT in the 'customers' table
        self.assertTrue(('Kostas', 'Biris', 'sc19kb@leeds.ac.uk', '07495508228', True) not in [tuple(list(f)[:5] + list(f)[6:]) for f in cursor.fetchall()])
        
        stepDown(testDataBase)

    #Test that a booking is correctly inserted.
    def testInsertBooking(self):
        testDataBase, conn = stepUp()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO movies VALUES (NULL, ?,?,?,?,?,?)",("On the Waterfront", "A movie about an ex-prizefighter, on the waterfront.", "16", "Elia Kazan", "Marlon Brando", "22-06-1954"))
        seatmapA = np.zeros((5,5), dtype=int)
        n = int(len(seatmapA)/2)

        for i in range(len(seatmapA[n])):

            #Empty space
            if(i==0 or i==1 or i==(len(seatmapA[n])-2) or i==(len(seatmapA[n])-1)):
                seatmapA[n][i]=-1
            
            #VIP seats
            else:
                seatmapA[n][i]=2
        cursor.execute("INSERT INTO screens VALUES (NULL, ?, ?)", (25, seatmapA.dumps()))
        cursor.execute("INSERT INTO customers VALUES (NULL, ?,?,?,?,?,?)", ("customer1_fn", "customer1_sn", "customer1@email.com", "07495508368", generate_password_hash("pwd"), '13-07-2001'))
        cursor.execute("INSERT INTO screenings VALUES (NULL, ?,?,?,?,?,?,?,?,?) ", ('01-03-2020','18:00', 1, 1, seatmapA.dumps(), 1,1,1,1))
        conn.commit()
        conn.close()        
        
        #Insert a test booking.

        testDataBase.add_booking(1,1, 'A1,A2,A3')
        
        #Manually connect to the database.
        conn = sqlite3.connect('test.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM bookings')

        #Asserts that the rows of the 'bookings' table only contains our test entry, and that it does indeed contain this entry correctly.
        self.assertEqual(cursor.fetchall(), [(1,1,1,'A1,A2,A3')])

        cursor.execute("SELECT seatmap FROM screenings WHERE id=?",(1,))
        seatmapB = cursor.fetchone()[0]
        seatmapB = pickle.loads(seatmapB)

        flag = 0
        for i in range(len(seatmapA)):
            for j in range(len(seatmapA[i])):
                if seatmapA[i][j] != seatmapB[i][j]: flag=1

        self.assertEqual(flag, 1)
        
        for i in range(len(seatmapB)):
            for j in range(len(seatmapB[i])):
                if (i,j) == (0,0) or (i,j) == (0,1) or (i,j) == (0,2):
                    self.assertEqual(seatmapB[i][j], 1)
                else :
                    self.assertTrue(seatmapB[i][j] in [0,-1, 2])
        
        stepDown(testDataBase)

    #Test that a booking is correctly updated.
    def testUpdateBooking(self):
        testDataBase, conn = stepUp()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO movies VALUES (NULL, ?,?,?,?,?,?)",("On the Waterfront", "A movie about an ex-prizefighter, on the waterfront.", "16", "Elia Kazan", "Marlon Brando", "22-06-1954"))
        seatmapA = np.zeros((5,5), dtype=int)
        n = int(len(seatmapA)/2)

        for i in range(len(seatmapA[n])):

            #Empty space
            if(i==0 or i==1 or i==(len(seatmapA[n])-2) or i==(len(seatmapA[n])-1)):
                seatmapA[n][i]=-1
            
            #VIP seats
            else:
                seatmapA[n][i]=2
        cursor.execute("INSERT INTO screens VALUES (NULL, ?, ?)", (25, seatmapA.dumps()))
        cursor.execute("INSERT INTO customers VALUES (NULL, ?,?,?,?,?,?)", ("customer1_fn", "customer1_sn", "customer1@email.com", "07495508368", generate_password_hash("pwd"), '13-07-2001'))
        cursor.execute("INSERT INTO screenings VALUES (NULL, ?,?,?,?,?,?,?,?,?) ", ('01-03-2020','18:00', 1, 1, seatmapA.dumps(), 1,1,1,1))
        cursor.execute("INSERT INTO bookings VALUES (NULL,?,?,?)",(1,1, 'A1,A2,A3'))
        conn.commit()
        conn.close()

        testDataBase.update_booking(1, (1,1,"B1,B2,B3"))

        conn = sqlite3.connect('test.db')
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM bookings")
        data = cursor.fetchall()

        cursor.execute("SELECT seatmap FROM screenings WHERE id=?",(1,))
        seatmapB = cursor.fetchone()[0]
        seatmapB = pickle.loads(seatmapB)
        flag = 0
        for i in range(len(seatmapA)):
            for j in range(len(seatmapA[i])):
                if seatmapA[i][j] != seatmapB[i][j]: flag=1

        self.assertEqual(flag, 1)
        
        for i in range(len(seatmapB)):
            for j in range(len(seatmapB[i])):
                if (i,j) == (1,0) or (i,j) == (1,1) or (i,j) == (1,2):
                    self.assertEqual(seatmapB[i][j], 1)
                else :
                    self.assertTrue(seatmapB[i][j] in [0,-1, 2])
        
        self.assertEqual(data, [(1,1,1, 'B1,B2,B3')])

        stepDown(testDataBase)

        


    #Test that a booking is correctly removed.
    def testRemoveBooking(self):
        testDataBase, conn = stepUp()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO movies VALUES (NULL, ?,?,?,?,?,?)",("On the Waterfront", "A movie about an ex-prizefighter, on the waterfront.", "16", "Elia Kazan", "Marlon Brando", "22-06-1954"))
        seatmapA = np.zeros((5,5), dtype=int)
        n = int(len(seatmapA)/2)

        for i in range(len(seatmapA[n])):

            #Empty space
            if(i==0 or i==1 or i==(len(seatmapA[n])-2) or i==(len(seatmapA[n])-1)):
                seatmapA[n][i]=-1
            
            #VIP seats
            else:
                seatmapA[n][i]=2
        cursor.execute("INSERT INTO screens VALUES (NULL, ?, ?)", (25, seatmapA.dumps()))
        cursor.execute("INSERT INTO customers VALUES (NULL, ?,?,?,?,?,?)", ("customer1_fn", "customer1_sn", "customer1@email.com", "07495508368", generate_password_hash("pwd"), '13-07-2001'))
        cursor.execute("INSERT INTO screenings VALUES (NULL, ?,?,?,?,?,?,?,?,?) ", ('01-03-2020','18:00', 1, 1, seatmapA.dumps(), 1,1,1,1))
        cursor.execute("INSERT INTO bookings VALUES (NULL,?,?,?)",(1,1, 'A1,A2,A3'))
        conn.commit()
        cursor.execute("SELECT * FROM bookings")
        prev_len = len(cursor.fetchall())
        data = cursor.fetchall()
        conn.close()

        testDataBase.remove_booking(1)

        conn = sqlite3.connect('test.db')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM bookings")
        fetch = cursor.fetchall()
        new_len = len(fetch)
        cursor.execute("SELECT seatmap FROM screenings WHERE id=?",(1,))
        data = cursor.fetchone()[0]

        seatmapB = pickle.loads(data)

        for i in range(len(seatmapB)):
            for j in range(len(seatmapB[i])):
                self.assertEqual(seatmapB[i][j], seatmapA[i][j])
        self.assertTrue((1,1,1, 'A1,A2,A3') not in fetch)
        self.assertEqual(prev_len-1, new_len)
        stepDown(testDataBase)



class TestMainPage(unittest.TestCase):


    def testSearchQuery(self):
        pass

    def testClickWhatsNew(self):
        pass

    def testClickTickets(self):
        pass

    def testClickScreens(self):
        pass

    def testClickInfo(self):
        pass

    def testClickAccount(self):
        pass

    def testClickLogin(self):
        pass

    def testClickSignup(self):
        pass


class TestLoginPage(unittest.TestCase):
    
    def testCorrectLogin(self):
        pass

    def testIncorrectLogin(self):
        pass

    def testNonExistingUser(self):
        pass

    def testLockAccount(self):
        pass

    def testEmptyFields(self):
        pass

class TestRegisterPage(unittest.TestCase):

    def testEmptyFields(self):
        pass

    def testAlphaFirstname(self):
        pass

    def testAlphaSurname(self):
        pass

    def testNumericPhone(self):
        pass

    def testPhoneLength(self):
        pass

    def testValidEmail(self):
        pass

    def testPasswordLength(self):
        pass
    def testValidDoB(self):
        pass

    def testRegisterValid(self):
        pass

    def testRegisterInvalid(self):
        pass




"""
    A 'suite' is required to ensure that our unittests are NOT executed in alphabetical order (how they are by default),
    but instead, are executed according to an order that we specify.

    This method creates our suite, adds all of our tests, and then returns the suite.
"""
def suite():

    #Create suite
    suite = unittest.TestSuite()

    #Add tests for testing the database.
    suite.addTest(TestDataBase('testDatabaseCreation'))
    suite.addTest(TestDataBase('testFetchEmpty'))
    suite.addTest(TestDataBase('testInsertMovie'))
    suite.addTest(TestDataBase('testUpdateMovie'))
    suite.addTest(TestDataBase('testRemoveMovie'))
    suite.addTest(TestDataBase('testInsertScreen'))
    suite.addTest(TestDataBase('testUpdateScreen'))
    suite.addTest(TestDataBase('testRemoveScreen'))
    suite.addTest(TestDataBase('testInsertScreening'))
    suite.addTest(TestDataBase('testUpdateScreening'))  
    suite.addTest(TestDataBase('testRemoveScreening'))
    suite.addTest(TestDataBase('testInsertCustomer'))
    suite.addTest(TestDataBase('testUpdateCustomer')) 
    suite.addTest(TestDataBase('testRemoveCustomer'))
    suite.addTest(TestDataBase('testInsertEmployee'))  
    suite.addTest(TestDataBase('testUpdateEmployee'))
    suite.addTest(TestDataBase('testRemoveEmployee'))
    suite.addTest(TestDataBase('testInsertBooking'))
    suite.addTest(TestDataBase('testUpdateBooking')) 
    suite.addTest(TestDataBase('testRemoveBooking'))

    suite.addTest(TestMainPage('testSearchQuery'))
    suite.addTest(TestMainPage('testClickWhatsNew'))
    suite.addTest(TestMainPage('testClickTickets'))    
    suite.addTest(TestMainPage('testClickScreens'))    
    suite.addTest(TestMainPage('testClickInfo'))    
    suite.addTest(TestMainPage('testClickAccount'))    
    suite.addTest(TestMainPage('testClickLogin'))    
    suite.addTest(TestMainPage('testClickSignup'))

    suite.addTest(TestLoginPage('testCorrectLogin'))    
    suite.addTest(TestLoginPage('testIncorrectLogin'))  
    suite.addTest(TestLoginPage('testNonExistingUser'))  
    suite.addTest(TestLoginPage('testLockAccount'))  
    suite.addTest(TestLoginPage('testEmptyFields'))  

    suite.addTest(TestRegisterPage('testEmptyFields'))
    suite.addTest(TestRegisterPage('testAlphaFirstname'))
    suite.addTest(TestRegisterPage('testAlphaSurname'))
    suite.addTest(TestRegisterPage('testNumericPhone'))
    suite.addTest(TestRegisterPage('testPhoneLength'))
    suite.addTest(TestRegisterPage('testValidEmail'))
    suite.addTest(TestRegisterPage('testValidDoB'))
    suite.addTest(TestRegisterPage('testRegisterValid'))
    suite.addTest(TestRegisterPage('testRegisterInvalid'))

    """



    suite.addTest(TestDataBase('testFetchNonEmpty'))


    """
    return suite

if __name__ == '__main__':
    #Create a TextTestRunner 
    #failfast=False ensures that our testing suite does not terminate upon a singular test failing.    
    testRunner = unittest.TextTestRunner(failfast=True, verbosity=2)
    #Run our test suite!
    testRunner.run(suite())
    stepDown(Database('test.db'))

    #Cleanup the environment by removing the 'test.db' file created by the tests.
    
