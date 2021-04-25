# from sqlalchemy import create_engine
# import sqlalchemy
# import flask_sqlalchemy as dba
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import scoped_session, sessionmaker, Query
# from flask_sqlalchemy import SQLAlchemy
# engine = create_engine('sqlite:///cinema.db', convert_unicode=True, echo=False)
# db_session = scoped_session(sessionmaker(bind=engine))
# Base = declarative_base()
# Base.metadata.reflect(engine)
# Base.query = db_session.query_property()

# # connection = engine.connect()
# # from main import app
# # from sqlalchemy.orm import relationship, backref

# metadata = db.MetaData()
# class User(Base):
#     # customers = db.Table('customers', metadata, autoload=True, autoload_with=engine)
#     __table__ = Base.metadata.tables['customers']
    
#     @classmethod
#     def lookup(cls, email):
#         return cls.query.filter_by(email=email)

#     @classmethod
#     def identify(cls, id):
#         return cls.query.get(id)
    
#     @property
#     def identity(self):
#         return self.id

#     @property
#     def rolenames(self):
#         try:
#             return self.roles.split(',')
#         except Exception:
#             return []

# # db = SQLAlchemy(app)
# # db.Model.metadata.reflect(db.engine)

# # class User(db.Model):
# #     # customers = db.Table('customers', metadata, autoload=True, autoload_with=engine)
# #     __table__ = db.Model.metadata.tables['customers']
    
# #     @classmethod
# #     def lookup(cls, email):
# #         return cls.query.filter_by(email=email)

# #     @classmethod
# #     def identify(cls, id):
# #         return cls.query.get(id)
    
# #     @property
# #     def identity(self):
# #         return self.id

# #     @property
# #     def rolenames(self):
# #         try:
# #             return self.roles.split(',')
# #         except Exception:
# #             return []





# if __name__ == '__main__':
#     db_session = scoped_session(sessionmaker(bind=engine))
#     for item in db_session.query(User.id, User.forename, User.password):
#         print (item)
#     # print(User.query.all()[0].email)
#     # print(customers.columns.keys())
#     # print(repr(metadata.tables['customers']))


# # ['id', 'forename', 'surname', 'email', 'phonenumber', 'hash', 'dob']




















from sqlalchemy import create_engine
import sqlalchemy as db
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker, Query

engine = create_engine('sqlite:///cinema.db', convert_unicode=True, echo=False)
db_session = scoped_session(sessionmaker(bind=engine))
Base = declarative_base()
Base.metadata.reflect(engine)
Base.query = db_session.query_property()

# connection = engine.connect()

# from sqlalchemy.orm import relationship, backref

# metadata = db.MetaData()
class User(Base):
    # customers = db.Table('customers', metadata, autoload=True, autoload_with=engine)
    __table__ = Base.metadata.tables['customers']
    
    @classmethod
    def lookup(cls, email):
        # print(email)
        # for item in db_session.query(User.id, User.email):
        #     print (item)
        # for item in (db_session.query(User.email)):
            # print(item)
        
        res = cls.query.filter_by(email=email).first()
        # print(res.password)
        return res
        # print(res.id)
        # print(cls)
        # db_session = scoped_session(sessionmaker(bind=engine))
        # print (db_session.query(email=email).one_or_none())

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)
    
    @property
    def identity(self):
        return self.id

    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
        except Exception:
            return []

if __name__ == '__main__':
    
    # db_session = scoped_session(sessionmaker(bind=engine))
    # for item in db_session.query(User):
        # print (item)
    # User.lookup('jucamohedano@gmail.com')
    # user = db_session.query(User).filter(User.email == 'juan-kmo@hotmail.com').first()
    # print(user.password)
    User.lookup('juan-kmo@hotmail.com')
    # print(User.query.filter_by(email='jucamohedano@gmail.com'))
    # print(customers.columns.keys())
    # print(repr(metadata.tables['customers']))


# ['id', 'forename', 'surname', 'email', 'phonenumber', 'hash', 'dob']