from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date
from sqlalchemy.orm import relationship
from database import Base


class Class(Base):

    __tablename__ = "classes"

    class_id = Column(String, primary_key=True)

    class_name = Column(String)
    
    advisor = Column(String)
    
    start_date = Column(Date)

    end_date = Column(Date)

class Student(Base):

    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(String, unique=True)

    first_name = Column(String)
    last_name = Column(String)

    birth_date = Column(Date)

    major = Column(String)
    gpa = Column(Float)

    class_id = Column(String, ForeignKey("classes.class_id"))