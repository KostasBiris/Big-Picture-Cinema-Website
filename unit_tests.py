import unittest
from db import Database
import sqlite3
import os
class TestDataBase(unittest.TestCase):

    def testDatabaseCreation(self):
        testDataBase = Database('test.db')
        self.assertTrue(os.path.dirname(os.path.abspath(__file__))+'/test.db')
        conn = sqlite3.connect('test.db')
        cursor = conn.execute('SELECT * FROM movies')
        self.assertEqual(['id','name','blurb','certificate','director','leadactors'], [cursor.description[0][0], cursor.description[1][0],cursor.description[2][0],cursor.description[3][0]
        ,cursor.description[4][0],cursor.description[5][0]])

        cursor = conn.execute('SELECT * FROM screens')
        self.assertEqual(['id','capacity'],[cursor.description[0][0],cursor.description[1][0]])
        
        cursor = conn.execute('SELECT * FROM screenings')
        self.assertEqual(['id','date','time','screenid','movieid'], [cursor.description[0][0],cursor.description[1][0],cursor.description[2][0],cursor.description[3][0],cursor.description[4][0]])

    def testFetchEmpty(self):
        testDataBase = Database('test.db')
        rows = testDataBase.fetch()
        self.assertFalse(len(rows[0]) + len(rows[1]) + len(rows[2]) + len(rows[3]) + len(rows[4]))

    def testInsertMovie(self):
        testDataBase = Database('test.db')
        testDataBase.add_movie('On the Waterfront', 'A movie about an ex-prizefighter, on the waterfront.', '16', 'Elia Kazan', 'Marlon Brando')
        conn = sqlite3.connect('test.db')        
        cursor = conn.execute('SELECT * FROM movies')
        self.assertEqual(cursor.fetchall(), [(1,'On the Waterfront', 'A movie about an ex-prizefighter, on the waterfront.', '16', 'Elia Kazan', 'Marlon Brando')])

    def testUpdateMovie(self):
        testDataBase = Database('test.db')
        testDataBase.update_movie(1, ('On the Waterfront', 'A movie about an ex-prizefighter.', '16', 'Elia Kazan', 'Marlon Brando'))
        conn = sqlite3.connect('test.db')
        cursor = conn.execute('SELECT * FROM movies')
        self.assertEqual(cursor.fetchall(), [(1,'On the Waterfront', 'A movie about an ex-prizefighter.', '16', 'Elia Kazan', 'Marlon Brando')])



    def testFetchNonEmpty(self):
        testDataBase = Database('test.db')
        rows = testDataBase.fetch()
        self.assertEqual(5, len(rows[0]) + len(rows[1]) + len(rows[2]) + len(rows[3]) + len(rows[4]))
        conn = sqlite3.connect('test.db')
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

    def testRemoveMovie(self):
        testDataBase = Database('test.db')
        prev_len = len(testDataBase.fetch()[0])
        testDataBase.remove_movie(1)
        self.assertEqual(prev_len-1, len(testDataBase.fetch()[0]))
        self.assertTrue((1,'On the Waterfront', 'A movie about an ex-prizefighter, on the waterfront.', '16', 'Elia Kazan', 'Marlon Brando') not in testDataBase.fetch()[0])

    def testInsertScreen(self):
        testDataBase = Database('test.db')
        testDataBase.add_screen(50)
        conn = sqlite3.connect('test.db')        
        cursor = conn.execute('SELECT * FROM screens')
        self.assertEqual(cursor.fetchall(), [(1, 50)])
    
    def testRemoveScreen(self):
        testDataBase = Database('test.db')
        prev_len = len(testDataBase.fetch()[1])
        testDataBase.remove_screen(1)
        self.assertEqual(prev_len-1, len(testDataBase.fetch()[1]))
        self.assertTrue((1,50) not in testDataBase.fetch()[1])

    def testInsertScreening(self):
        testDataBase = Database('test.db')
        testDataBase.add_screening('01-03-2020','18:00', 1, 1)
        conn = sqlite3.connect('test.db')
        cursor = conn.execute('SELECT * FROM screenings')
        self.assertEqual(cursor.fetchall(), [(1, '01-03-2020', '18:00', 1, 1)])

    def testRemoveScreening(self):
        testDataBase = Database('test.db')
        prev_len = len(testDataBase.fetch()[2])
        testDataBase.remove_screening(1)
        self.assertEqual(prev_len-1, len(testDataBase.fetch()[2]))
        self.assertTrue((1,'01-03-2020', '18:00', 1, 1) not in testDataBase.fetch()[2])
        

    def testInsertCustomer(self):
        testDataBase = Database('test.db')
        testDataBase.add_customer('Jared', 'Swift', 'ed18jws@leeds.ac.uk', '07495508368', 'o kostas einai andras', '13-07-2001')
        conn = sqlite3.connect('test.db')
        cursor = conn.execute('SELECT * FROM customers')
        self.assertEqual(cursor.fetchall(), [(1, 'Jared', 'Swift', 'ed18jws@leeds.ac.uk', '07495508368', 'o kostas einai andras', '13-07-2001')])

    def testRemoveCustomer(self):
        testDataBase = Database('test.db')
        prev_len = len(testDataBase.fetch()[3])
        testDataBase.remove_customer(1)
        self.assertEqual(prev_len-1, len(testDataBase.fetch()[3]))
        self.assertTrue((1, 'Jared', 'Swift', 'ed18jws@leeds.ac.uk', '07495508368', 'o kostas einai andras', '13-07-2001') not in testDataBase.fetch()[3])

    def testInsertBooking(self):
        testDataBase = Database('test.db')
        testDataBase.add_booking(1,1, 'A12,A11,A10')
        conn = sqlite3.connect('test.db')
        cursor = conn.execute('SELECT * FROM bookings')
        self.assertEqual(cursor.fetchall(), [(1,1,1,'A12,A11,A10')])


    def testRemoveBooking(self):
        testDataBase = Database('test.db')
        prev_len = len(testDataBase.fetch()[4])
        testDataBase.remove_booking(1)
        self.assertEqual(prev_len-1, len(testDataBase.fetch()[4]))
        self.assertTrue((1,1,1, 'A12,A11,A10') not in testDataBase.fetch()[4])
        



def suite():
    suite = unittest.TestSuite()
    suite.addTest(TestDataBase('testDatabaseCreation'))
    suite.addTest(TestDataBase('testFetchEmpty'))
    suite.addTest(TestDataBase('testInsertMovie'))
    suite.addTest(TestDataBase('testUpdateMovie'))
    suite.addTest(TestDataBase('testInsertScreen'))
    suite.addTest(TestDataBase('testInsertScreening'))
    suite.addTest(TestDataBase('testInsertCustomer'))
    suite.addTest(TestDataBase('testInsertBooking'))
    suite.addTest(TestDataBase('testFetchNonEmpty'))
    suite.addTest(TestDataBase('testRemoveBooking'))
    suite.addTest(TestDataBase('testRemoveCustomer'))
    suite.addTest(TestDataBase('testRemoveScreening'))
    suite.addTest(TestDataBase('testRemoveMovie'))
    suite.addTest(TestDataBase('testRemoveScreen'))

    return suite

if __name__ == '__main__':
    testRunner = unittest.TextTestRunner(failfast=False)
    testRunner.run(suite())
    if os.path.isfile(os.path.dirname(os.path.abspath(__file__))+'/test.db'):
        os.remove(os.path.dirname(os.path.abspath(__file__))+'/test.db')