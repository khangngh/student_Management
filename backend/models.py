from sqlalchemy import Column, Integer, String, Float
from database import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(String, unique=True)
    name = Column(String)
    birth_year = Column(Integer)
    major = Column(String)
    gpa = Column(Float)