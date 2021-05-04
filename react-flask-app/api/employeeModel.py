from sqlalchemy import create_engine
import sqlalchemy as db
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker, Query

engine = create_engine('sqlite:///cinema.db', convert_unicode=True, echo=False)
db_session = scoped_session(sessionmaker(bind=engine))
Base = declarative_base()
Base.metadata.reflect(engine)
Base.query = db_session.query_property()


class Employee(Base):
    __table__ = Base.metadata.tables['employees']
    # print(__table__.columns)
    
    @classmethod
    def lookup(cls, id):
        res = cls.query.filter_by(id=id).first()
        print(res)
        return res

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

