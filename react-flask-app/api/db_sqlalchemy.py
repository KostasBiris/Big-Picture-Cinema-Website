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
# metadata = db.MetaData()
class User(Base):
    # customers = db.Table('customers', metadata, autoload=True, autoload_with=engine)
    __table__ = Base.metadata.tables['customers']
    
    @classmethod
    def lookup(cls, email):
        res = cls.query.filter_by(email=email).first()
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

    