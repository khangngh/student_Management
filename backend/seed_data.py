import random
from datetime import date
from database import SessionLocal
import models

db = SessionLocal()

# ---------- TẠO LỚP ----------
classes_data = [
    ("C01", "Computer Science", "Dr. Nguyen", date(2022, 9, 1), date(2026, 6, 1)),
    ("C02", "Information Technology", "Dr. Tran", date(2022, 9, 1), date(2026, 6, 1)),
    ("C03", "Software Engineering", "Dr. Le", date(2022, 9, 1), date(2026, 6, 1)),
    ("C04", "Artificial Intelligence", "Dr. Pham", date(2022, 9, 1), date(2026, 6, 1)),
    ("C05", "Cyber Security", "Dr. Hoang", date(2022, 9, 1), date(2026, 6, 1)),
]

for c in classes_data:
    new_class = models.Class(
        class_id=c[0],
        class_name=c[1],
        advisor=c[2],
        start_date=c[3],
        end_date=c[4],
    )
    db.add(new_class)

db.commit()

print("Created classes")


# ---------- DỮ LIỆU MẪU ----------
first_names = [
    "Khang","Minh","An","Huy","Nam","Linh","Trang","Phuc","Bao","Tuan",
    "Long","Hung","Son","Duy","Khoa","Nhan","Tien","Dat","Thao","Vy"
]

last_names = [
    "Nguyen","Tran","Le","Pham","Hoang","Vu","Vo","Dang","Bui","Do"
]

majors = [
    "CNTT","KTPM","AI","Cyber Security","Data Science"
]

class_ids = ["C01","C02","C03","C04","C05"]


# ---------- TẠO 50 SINH VIÊN ----------
for i in range(50):

    student = models.Student(
        student_id=str(10000000 + i),   # 8 digits
        first_name=random.choice(first_names),
        last_name=random.choice(last_names),
        birth_date=date(
            random.randint(2000, 2005),
            random.randint(1, 12),
            random.randint(1, 28)
        ),
        major=random.choice(majors),
        gpa=round(random.uniform(2.0, 4.0), 2),
        class_id=random.choice(class_ids)
    )

    db.add(student)

db.commit()

print("Created 50 students")

db.close()