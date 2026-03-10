import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function AddStudent() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        student_id: "",
        first_name: "",
        last_name: "",
        birth_date: "",
        major: "",
        gpa: "",
        class_id: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const addStudent = async () => {

        if (
            !form.student_id ||
            !form.first_name ||
            !form.last_name ||
            !form.birth_date ||
            !form.major ||
            !form.gpa ||
            !form.class_id
        ) {
            alert("Please fill all fields")
            return
        }

        const data = {
            student_id: form.student_id,
            first_name: form.first_name,
            last_name: form.last_name,
            birth_date: form.birth_date,
            major: form.major,
            gpa: parseFloat(form.gpa),
            class_id: form.class_id
        }

        try {

            await axios.post(
                "http://127.0.0.1:8000/students",
                data
            )

            alert("Student added successfully")

            navigate("/students")

        } catch (error) {

            console.log(error.response?.data)

            alert("Error adding student")

        }
    }

    return (

        <div className="form-container">
            <button
                className="back-btn"
                onClick={() => navigate("/students")}
            >
                ← Back
            </button>
            <h1 className="title">Add Student</h1>

            <div className="form-card">

                <input
                    className="form-input"
                    name="student_id"
                    placeholder="Student ID"
                    maxLength="8"
                    onChange={handleChange}
                />

                <div className="row">

                    <input
                        className="form-input"
                        name="first_name"
                        placeholder="First Name"
                        onChange={handleChange}
                    />

                    <input
                        className="form-input"
                        name="last_name"
                        placeholder="Last Name"
                        onChange={handleChange}
                    />

                </div>

                <input
                    className="form-input"
                    type="date"
                    name="birth_date"
                    onChange={handleChange}
                />

                <input
                    className="form-input"
                    name="major"
                    placeholder="Major"
                    onChange={handleChange}
                />

                <input
                    className="form-input"
                    type="number"
                    step="0.1"
                    min="0"
                    max="4"
                    name="gpa"
                    placeholder="GPA"
                    onChange={handleChange}
                />

                <input
                    className="form-input"
                    name="class_id"
                    placeholder="Class ID (ex: C01)"
                    onChange={handleChange}
                />

                <button
                    className="primary-btn"
                    onClick={addStudent}
                >
                    Add Student
                </button>

            </div>

        </div>
    )
}

export default AddStudent