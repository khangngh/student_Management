# Student Management System
This is a Student Management System designed for managing and storing student data.
It provides a simple web interface to perform common administrative tasks such as adding, editing, deleting, and viewing student information.

The system was developed as part of a Vibe Coding exercise, where AI-assisted development is used to iteratively build and improve a software system through prompts.

# Project Overview
This project demonstrates how AI can help generate and modify a complete web application using prompts.

The application allows users to:

* Add new students
* View a list of students
* Edit student information
* Delete students
* Search students by name
* Manage classes
* View statistics about students
* Export data to CSV

# Tech Stack

Frontend
React.js

Backend
FastAPI (Python)

Database
SQLite

Libraries used:
Frontend
* React Router
* Axios
* Chart.js

Backend
* FastAPI
* SQLAlchemy
* Pandas

# Project Structure

```text
student_management
│
├── backend
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── seed_data.py
│   └── students.db
│
└── frontend
    ├── src
    │   ├── pages
    │   │   ├── StudentList.js
    │   │   ├── AddStudent.js
    │   │   ├── EditStudent.js
    │   │   └── AddClass.js
    │   │
    │   ├── components
    │   │   └── MajorChart.js
    │   │
    │   ├── App.js
    │   └── App.css
```
# Features
## Student Management

Users can:
* Add a student
* Edit student information
* Delete students
* View all students in a table

Student fields:
* student_id
* first_name
* last_name
* birth_date
* major
* gpa
* class_id

# Class Management
Each student belongs to a class.
Class fields:
* class_id
* class_name
* advisor
* start_date
* end_date
Relationship: One class → many students

# Search Function

The system allows users to search for students by name.

Users can enter a keyword in the search bar, and the system will filter students whose **first name or last name contains the keyword**.

Example:

Search:
Nguyen

Results will include students whose name contains "Nguyen".


# Statistics Dashboard

The system provides basic statistics about the student database.

Displayed statistics include:

* Total number of students
* Average GPA
* Number of students by major

The distribution of students by major is visualized using a **pie chart**.

This allows administrators to quickly understand the composition of the student population.


# Export Data

Users can export the student data into a CSV file.

The exported file contains the following fields:

* Student ID
* First Name
* Last Name
* Birth Date
* Major
* GPA
* Class

This feature allows administrators to easily analyze the data using tools such as Excel.


# Running the Project

## 1. Start Backend

Navigate to the backend folder:

```bash
cd backend
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will run at:

http://127.0.0.1:8000

API documentation:

http://127.0.0.1:8000/docs


## 2. Start Frontend

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the React application:

```bash
npm start
```

The frontend will run at:

http://localhost:3000



# Example Workflow

Typical usage flow:

1. Add a new student
2. Assign the student to a class
3. Search students by name
4. View statistics about the system
5. Export the student data to CSV


# Vibe Coding Workflow

This project demonstrates the concept of **Vibe Coding**, where AI assists in building software through prompts.

Development steps included:

1. Generating the initial MVP using AI prompts
2. Expanding the system with new business requirements
3. Updating the database structure
4. Adding new features such as search, statistics, and export
5. Improving the UI and user experience

This workflow shows how AI can accelerate the development process while the developer focuses on refining the system.


# Learning Outcomes

Through this project, the following skills were practiced:

* Writing prompts for AI-assisted development
* Designing database schemas
* Building full-stack applications
* Modifying an existing system using new requirements
* Integrating frontend and backend systems


# Future Improvements

Possible improvements for the system:

* Pagination for the student list
* Filter students by class or major
* Class management dashboard
* Authentication system
* Role-based access control
* Improved UI/UX design
