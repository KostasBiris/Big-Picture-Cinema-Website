import unittest #testing framework
from db import Database #our database class (MODULAR PROGRAMMING ;))
import sqlite3
import os #for path stuff


"""
    UnitTest TestCase class for testing on the Database.
    Consists of the following tests:
        'testDatabaseCreation'
        'testFetchEmpty'
        'testInsertMovie'
        'testUpdateMovie'
        'testInsertScreen'
        'testUpdateScreen'
        'testInsertScreening'
        'testUpdateScreening'  
        'testInsertCustomer'
        'testUpdateCustomer'    
        'testInsertBooking'
        'testUpdateBooking' 
        'testFetchNonEmpty'
        'testRemoveBooking'
        'testRemoveCustomer'
        'testRemoveScreening'
        'testRemoveMovie'
        'testRemoveScreen'

        
"""
class TestDataBase(unittest.TestCase):

    # Test that the database is successfully created on the instantiation of the Database class.
    def testDatabaseCreation(self):
        #Instantiate Database
        testDataBase = Database('test.db')
        
        #Assertion to check that 'test.db' is created
        self.assertTrue(os.path.dirname(os.path.abspath(__file__))+'/test.db')

        #Manually connect to the database
        conn = sqlite3.connect('test.db')


        #The following section of code is used to ensure that the correct fields are present on each of the tables.
        #The assertions compare the expected fields against those received by the query executed.

        cursor = conn.execute('SELECT * FROM movies')
        self.assertEqual(['id','name','blurb','certificate','director','leadactors'], [cursor.description[0][0], cursor.description[1][0],cursor.description[2][0],cursor.description[3][0]
        ,cursor.description[4][0],cursor.description[5][0]])

        cursor = conn.execute('SELECT * FROM screens')
        self.assertEqual(['id','capacity'],[cursor.description[0][0],cursor.description[1][0]])
        
        cursor = conn.execute('SELECT * FROM screenings')
        self.assertEqual(['id','date','time','screenid','movieid'], [cursor.description[0][0],cursor.description[1][0],cursor.description[2][0],cursor.description[3][0],cursor.description[4][0]])

        cursor = conn.execute('SELECT * FROM customers')
        self.assertEqual(['id', 'forename', 'surname', 'email', 'phonenumber', 'password', 'dob'], [cursor.description[0][0],cursor.description[1][0],cursor.description[2][0],cursor.description[3][0],cursor.description[4][0],
        cursor.description[5][0],cursor.description[6][0]])

        cursor = conn.execute("SELECT * FROM bookings")
        self.assertEqual(['id','screeningid','customerid','seats'],[cursor.description[0][0],cursor.description[1][0],cursor.description[2][0],cursor.description[3][0]] )


    #Test that the correct output is produced when 'fetching' an empty database.
    def testFetchEmpty(self):

        testDataBase = Database('test.db')

        #Fetch the rows.
        rows = testDataBase.fetch()

        #Asserts that the sum of the lengths of the rows fetched is 0 (False)
        self.assertFalse(len(rows[0]) + len(rows[1]) + len(rows[2]) + len(rows[3]) + len(rows[4]))

    #Test that a movie is correctly inserted.
    def testInsertMovie(self):
        testDataBase = Database('test.db')

        #Add an entry for testing.
        testDataBase.add_movie('On the Waterfront', 'A movie about an ex-prizefighter, on the waterfront.', '16', 'Elia Kazan', 'Marlon Brando')

        #Manually connect to the database.
        
        conn = sqlite3.connect('test.db')        
        cursor = conn.execute('SELECT * FROM movies')

        #Asserts that the rows of the 'movies' table only contains our test entry, and that it does indeed contain this entry correctly.
        self.assertEqual(cursor.fetchall(), [(1,'On the Waterfront', 'A movie about an ex-prizefighter, on the waterfront.', '16', 'Elia Kazan', 'Marlon Brando')])

    #Test that a movie is correctly updarted.
    def testUpdateMovie(self):
        testDataBase = Database('test.db')

        #Update our test movie.
        testDataBase.update_movie(1, ('On the Waterfront', 'A movie about an ex-prizefighter.', '16', 'Elia Kazan', 'Marlon Brando'))
        
        #Manually connect to the database.
        conn = sqlite3.connect('test.db')
        cursor = conn.execute('SELECT * FROM movies')

        #Asserts that the rows of the 'movies' table only contains our test entry, and that it has been correctly updated.
        self.assertEqual(cursor.fetchall(), [(1,'On the Waterfront', 'A movie about an ex-prizefighter.', '16', 'Elia Kazan', 'Marlon Brando')])


    #Test that the correct output is produced when 'fetching' a database with entries
    def testFetchNonEmpty(self):
        testDataBase = Database('test.db')
        #Fetch rows
        rows = testDataBase.fetch()

        #Assert that the sum of the lengths of the rows in the database is 5 (as a record has been added to each of the 5 tables.)
        self.assertEqual(5, len(rows[0]) + len(rows[1]) + len(rows[2]) + len(rows[3]) + len(rows[4]))

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
        self.assertEqual(rows, (movies,screens,screenings,customers,bookings))

    #Test that a movie is correctly removed from the database.
    def testRemoveMovie(self):
        testDataBase = Database('test.db')

        #Store the previous number of rows in the 'movies' table.
        prev_len = len(testDataBase.fetch()[0])
        #Remove the movie
        testDataBase.remove_movie(1)
        #Assert that the number of rows has decremented.
        self.assertEqual(prev_len-1, len(testDataBase.fetch()[0]))
        #Assert that our original entry is NOT in the 'movies' table.
        self.assertTrue((1,'On the Waterfront', 'A movie about an ex-prizefighter, on the waterfront.', '16', 'Elia Kazan', 'Marlon Brando') not in testDataBase.fetch()[0])

    #Test that a screen is correctly inserted.
    def testInsertScreen(self):
        testDataBase = Database('test.db')
        
        #Add a screen
        testDataBase.add_screen(50)

        #Manually connect to the database
        conn = sqlite3.connect('test.db')        
        cursor = conn.execute('SELECT * FROM screens')

        #Asserts that the rows of the 'screens' table only contains our test entry, and that it does indeed contain this entry correctly.
        self.assertEqual(cursor.fetchall(), [(1, 50)])

    #Test that a screen is correctly updated.
    def testUpdateScreen(self):
        testDataBase = Database('test.db')
        #Update the screen (NOTE: the ',' is used to allow a singleton tuple to be passed to the function.)
        testDataBase.update_screen(1, (60,))

        #Manually connect to the database.
        conn = sqlite3.connect('test.db')
        cursor = conn.execute("SELECT * FROM screens")

        #Asserts that the rows of the 'screens' table only contains our test entry, and that it has been correctly updated.
        self.assertEqual(cursor.fetchall(), [(1,60)])

    #Test that a screen is correctly removed from the database.
    def testRemoveScreen(self):
        testDataBase = Database('test.db')
        #Store the previous number of rows in the 'screens' table.
        prev_len = len(testDataBase.fetch()[1])
        #Remove the screen
        testDataBase.remove_screen(1)
        #Assert that the number of rows has decremented.
        self.assertEqual(prev_len-1, len(testDataBase.fetch()[1]))
        #Assert that our original entry is NOT in the 'screens' table
        self.assertTrue((1,50) not in testDataBase.fetch()[1])

    #Test that a screening is correctly inserted.
    def testInsertScreening(self):
        testDataBase = Database('test.db')
        
        #Insert test screening
        testDataBase.add_screening('01-03-2020','18:00', 1, 1)
        
        #Manually connect to the database.
        conn = sqlite3.connect('test.db')
        cursor = conn.execute('SELECT * FROM screenings')

        #Asserts that the rows of the 'screenings' table only contains our test entry, and that it does indeed contain this entry correctly.
        self.assertEqual(cursor.fetchall(), [(1, '01-03-2020', '18:00', 1, 1)])

    #Test that a screening is correctly updated.
    def testUpdateScreening(self):
        testDataBase = Database('test.db')
        
        #Update our test screening.
        testDataBase.update_screening(1, ('02-03-2020', '19:00', 1, 1))
        conn = sqlite3.connect('test.db')
        cursor = conn.execute('SELECT * FROM screenings')

        #Asserts that the rows of the 'screenings' table only contains our test entry, and that it has been correctly updated.
        self.assertEqual(cursor.fetchall(), [(1, '02-03-2020', '19:00', 1, 1)])

    #Test that a screening is correctly removed.
    def testRemoveScreening(self):
        testDataBase = Database('test.db')
        #Store the previous number of rows in the 'screenings' table.
        prev_len = len(testDataBase.fetch()[2])

        #Remove a screening
        testDataBase.remove_screening(1)

        #Assert that the number of rows has decremented.
        self.assertEqual(prev_len-1, len(testDataBase.fetch()[2]))

        #Assert that our original entry is NOT in the 'screenings' table
        self.assertTrue((1,'01-03-2020', '18:00', 1, 1) not in testDataBase.fetch()[2])
        
    #Test that a customer is inserted correctly.
    def testInsertCustomer(self):
        testDataBase = Database('test.db')

        #Insert test customer
        testDataBase.add_customer('Jared', 'Swift', 'ed18jws@leeds.ac.uk', '07495508368', 'o kostas einai andras', '13-07-2001')

        #Manually connect to the database.
        conn = sqlite3.connect('test.db')
        cursor = conn.execute('SELECT * FROM customers')

        #Asserts that the rows of the 'customers' table only contains our test entry, and that it does indeed contain this entry correctly.
        self.assertEqual(cursor.fetchall(), [(1, 'Jared', 'Swift', 'ed18jws@leeds.ac.uk', '07495508368', 'o kostas einai andras', '13-07-2001')])


    def testUpdateCustomer(self):
        testDataBase = Database('test.db')

        #Update test customer
        testDataBase.update_customer(1, ('Kostas', 'Biris', 'sc19kb@leeds.ac.uk', '07495508228', 'i kostas einai yuneika', '13-07-1900'))

        #Connect manually to the database.
        conn = sqlite3.connect('test.db')

        cursor = conn.execute('SELECT * FROM customers')

        #Asserts that the rows of the 'customers' table only contains our test entry, and that it has been correctly updated.
        self.assertEqual(cursor.fetchall(), [(1,'Kostas', 'Biris', 'sc19kb@leeds.ac.uk', '07495508228', 'i kostas einai yuneika', '13-07-1900')])

    #Test that a customer is correctly removed.
    def testRemoveCustomer(self):
        testDataBase = Database('test.db')

        #Store the previous number of rows in the 'customers' table.
        prev_len = len(testDataBase.fetch()[3])

        #Remove the test customer.
        testDataBase.remove_customer(1)

        #Assert that the length has decremented.
        self.assertEqual(prev_len-1, len(testDataBase.fetch()[3]))

        #Assert that our original entry is NOT in the 'customers' table
        self.assertTrue((1, 'Jared', 'Swift', 'ed18jws@leeds.ac.uk', '07495508368', 'o kostas einai andras', '13-07-2001') not in testDataBase.fetch()[3])

    #Test that a booking is correctly inserted.
    def testInsertBooking(self):
        testDataBase = Database('test.db')

        #Insert a test booking.
        testDataBase.add_booking(1,1, 'A12,A11,A10')
        
        #Manually connect to the database.
        conn = sqlite3.connect('test.db')

        cursor = conn.execute('SELECT * FROM bookings')

        #Asserts that the rows of the 'bookings' table only contains our test entry, and that it does indeed contain this entry correctly.
        self.assertEqual(cursor.fetchall(), [(1,1,1,'A12,A11,A10')])

    #Test that a booking is correctly updated.
    def testUpdateBooking(self):
        testDataBase = Database('test.db')

        #Update test booking
        testDataBase.update_booking(1, (1,1, 'B12,B11,B10'))

        #Manually connect to the database.
        conn = sqlite3.connect('test.db')
        cursor = conn.execute('SELECT * FROM bookings')

        #Asserts that the rows of the 'bookings' table only contains our test entry, and that it has been correctly updated.
        self.assertEqual(cursor.fetchall(), [(1,1,1,'B12,B11,B10')])

    #Test that a booking is correctly removed.
    def testRemoveBooking(self):
        testDataBase = Database('test.db')
        
        #Store the previous number of rows in the 'bookings' table.
        prev_len = len(testDataBase.fetch()[4])

        #Remove booking
        testDataBase.remove_booking(1)

        #Assert that the length has decremented.
        self.assertEqual(prev_len-1, len(testDataBase.fetch()[4]))

        #Assert that our original entry is NOT in the 'bookings' table.
        self.assertTrue((1,1,1, 'A12,A11,A10') not in testDataBase.fetch()[4])
        
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
    suite.addTest(TestDataBase('testInsertScreen'))
    suite.addTest(TestDataBase('testUpdateScreen'))
    suite.addTest(TestDataBase('testInsertScreening'))
    suite.addTest(TestDataBase('testUpdateScreening'))  
    suite.addTest(TestDataBase('testInsertCustomer'))
    suite.addTest(TestDataBase('testUpdateCustomer'))    
    suite.addTest(TestDataBase('testInsertBooking'))
    suite.addTest(TestDataBase('testUpdateBooking')) 
    suite.addTest(TestDataBase('testFetchNonEmpty'))
    suite.addTest(TestDataBase('testRemoveBooking'))
    suite.addTest(TestDataBase('testRemoveCustomer'))
    suite.addTest(TestDataBase('testRemoveScreening'))
    suite.addTest(TestDataBase('testRemoveMovie'))
    suite.addTest(TestDataBase('testRemoveScreen'))
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

    return suite

if __name__ == '__main__':
    #Create a TextTestRunner 
    #failfast=False ensures that our testing suite does not terminate upon a singular test failing.    
    testRunner = unittest.TextTestRunner(failfast=False)
    #Run our test suite!
    testRunner.run(suite())

    #Cleanup the environment by removing the 'test.db' file created by the tests.
    if os.path.isfile(os.path.dirname(os.path.abspath(__file__))+'/test.db'):
        os.remove(os.path.dirname(os.path.abspath(__file__))+'/test.db')