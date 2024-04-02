from sqlalchemy import create_engine, Column, Integer, String 
from sqlalchemy.ext.declarative import declarative_base 
from sqlalchemy.orm import sessionmaker 
from app.connection_string import MYSQL_CONNECTION_STRING

# create an in-memory SQLite database 
engine = create_engine(MYSQL_CONNECTION_STRING, echo=True) 

Base = declarative_base() 

class User(Base): 
	__tablename__ = 'users'
	id = Column(Integer, primary_key=True) 
	name = Column(String) 
	fullname = Column(String) 
	password = Column(String) 

	def __repr__(self): 
		return f"<User(name='{self.name}', 
	fullname='{self.fullname}', password='{self.password}'>" 

# create the users table 
Base.metadata.create_all(engine) 

# create a session to manage the connection to the database 
Session = sessionmaker(bind=engine) 
session = Session() 

# add a new user to the database 
user = User(name='john', fullname='John Doe', password='password') 
session.add(user) 
session.commit() 

# query the users table 
users = session.query(User).all() 
print(users) 
# Output: [<User(name='john', fullname='John Doe', password='password')>] 
