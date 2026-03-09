from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Class(Base):
    __tablename__ = "classes"

    class_id = Column(String, primary_key=True, index=True)
    class_name = Column(String)
    advisor = Column(String)

    students = relationship("Student", back_populates="class_obj")


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(String, unique=True)
    name = Column(String)
    birth_year = Column(Integer)
    major = Column(String)
    gpa = Column(Float)

    class_id = Column(String, ForeignKey("classes.class_id"))

    class_obj = relationship("Class", back_populates="students")