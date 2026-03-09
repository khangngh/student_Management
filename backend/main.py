from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models, schemas
from database import SessionLocal, engine
import pandas as pd
from fastapi.responses import StreamingResponse
import io
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import or_
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


from fastapi import Query

@app.get("/students")
def get_students(name: str = Query(None), db: Session = Depends(get_db)):

    query = db.query(models.Student)

    if name:
        query = query.filter(
        or_(
            models.Student.first_name.contains(name),
            models.Student.last_name.contains(name)
        )
    )

    return query.all()

@app.post("/students")
def add_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    new_student = models.Student(**student.dict())
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student


@app.put("/students/{student_id}")
def update_student(student_id: int, student: schemas.StudentCreate, db: Session = Depends(get_db)):
    db_student = db.query(models.Student).filter(models.Student.id == student_id).first()

    db_student.student_id = student.student_id
    db_student.first_name = student.first_name
    db_student.last_name = student.last_name
    db_student.birth_date = student.birth_date
    db_student.major = student.major
    db_student.gpa = student.gpa
    db_student.class_id = student.class_id

    db.commit()

    return db_student


@app.delete("/students/{student_id}")
def delete_student(student_id: int, db: Session = Depends(get_db)):
    db_student = db.query(models.Student).filter(models.Student.id == student_id).first()
    db.delete(db_student)
    db.commit()
    return {"message": "deleted"}

@app.post("/classes")
def create_class(c: schemas.ClassCreate, db: Session = Depends(get_db)):
    new_class = models.Class(**c.dict())
    db.add(new_class)
    db.commit()
    db.refresh(new_class)
    return new_class


@app.get("/classes")
def get_classes(db: Session = Depends(get_db)):
    return db.query(models.Class).all()

from sqlalchemy import func


@app.get("/stats")
def get_stats(db: Session = Depends(get_db)):

    total_students = db.query(models.Student).count()

    avg_gpa = db.query(func.avg(models.Student.gpa)).scalar()

    major_stats = (
        db.query(models.Student.major, func.count(models.Student.id))
        .group_by(models.Student.major)
        .all()
    )

    return {
        "total_students": total_students,
        "average_gpa": avg_gpa,
        "students_by_major": major_stats
    }

@app.get("/export")
def export_csv(db: Session = Depends(get_db)):

    students = db.query(models.Student).all()

    data = [
    {
        "Student ID": s.student_id,
        "First Name": s.first_name,
        "Last Name": s.last_name,
        "Birth Date": s.birth_date,
        "Major": s.major,
        "GPA": s.gpa,
        "Class": s.class_id
    }
    for s in students
]

    df = pd.DataFrame(data)

    stream = io.StringIO()
    df.to_csv(stream, index=False)

    response = StreamingResponse(
        iter([stream.getvalue()]),
        media_type="text/csv"
    )

    response.headers["Content-Disposition"] = "attachment; filename=students.csv"

    return response