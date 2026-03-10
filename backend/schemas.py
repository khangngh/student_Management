from pydantic import BaseModel, Field, field_validator
from datetime import date

class ClassBase(BaseModel):
    class_id: str
    class_name: str
    advisor: str
    start_date: date
    end_date: date

class ClassCreate(ClassBase):
    pass


class Class(ClassBase):
    class Config:
        orm_mode = True

class StudentBase(BaseModel):
    student_id: str = Field(..., min_length=8, max_length=8)
    first_name: str
    last_name: str
    birth_date: date
    major: str
    gpa: float = Field(..., ge=0, le=4)
    class_id: str
    @field_validator("birth_date")
    def validate_birth_date(cls, v):
        if v > date.today():
            raise ValueError("Birth date cannot be in the future")
        return v

class StudentCreate(StudentBase):
    pass


class Student(StudentBase):
    id: int

    class Config:
        orm_mode = True