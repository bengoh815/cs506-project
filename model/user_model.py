import re

class User:
    def __init__(self, user_id, name, email):
        self.user_id = self.setUserID(user_id)
        self.name = self.setName(name)
        self.email = self.setEmail(email)

    def setUserId(self, user_id):
        if re.match("^[\d]+$", user_id):
            self.user_id = user_id
    
    def getUserId(self):
        return self.user_id
    
    def setName(self, name):
        if re.match("^[A-Za-z\s]+$", name):
            self.name = name
    
    def getName(self):
        return self.name
    
    def setEmail(self, email):
        if re.match("^[\w_.+-]+@[\w]+\.[\w-.]+$"):
            self.email = email
    
    def getEmail(self):
        return self.email
    
    def getRecordings():
        return []
