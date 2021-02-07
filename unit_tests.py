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
        self.assertFalse(len(rows[0]) + len(rows[1]) + len(rows[2]))

    def testInsertMovie(self):
        testDataBase = Database('test.db')
        testDataBase.add_movie('On the Waterfront', 'A movie about an ex-prizefighter, on the waterfront.', '16', 'Elia Kazan', 'Marlon Brando')
        conn = sqlite3.connect('test.db')        
        cursor = conn.execute('SELECT * FROM movies')
        self.assertEqual(cursor.fetchall(), [(1,'On the Waterfront', 'A movie about an ex-prizefighter, on the waterfront.', '16', 'Elia Kazan', 'Marlon Brando')])

    def testFetchNonEmpty(self):
        testDataBase = Database('test.db')
        rows = testDataBase.fetch()
        self.assertEqual(1, len(rows[0])+len(rows[1])+len(rows[2]))
        self.assertEqual(rows[0], [(1,'On the Waterfront', 'A movie about an ex-prizefighter, on the waterfront.', '16', 'Elia Kazan', 'Marlon Brando')])


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


def suite():
    suite = unittest.TestSuite()
    suite.addTest(TestDataBase('testDatabaseCreation'))
    suite.addTest(TestDataBase('testFetchEmpty'))
    suite.addTest(TestDataBase('testInsertMovie'))
    suite.addTest(TestDataBase('testFetchNonEmpty'))
    suite.addTest(TestDataBase('testRemoveMovie'))
    suite.addTest(TestDataBase('testInsertScreen'))
    suite.addTest(TestDataBase('testRemoveScreen'))
    return suite

if __name__ == '__main__':
    testRunner = unittest.TextTestRunner(failfast=False)
    testRunner.run(suite())
    if os.path.isfile(os.path.dirname(os.path.abspath(__file__))+'/test.db'):
        os.remove(os.path.dirname(os.path.abspath(__file__))+'/test.db')