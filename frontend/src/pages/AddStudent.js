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

        <div>

            <h2>Add Student</h2>

            <input
                name="student_id"
                placeholder="Student ID"
                maxLength="8"
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="first_name"
                placeholder="First Name"
                onChange={handleChange}
            />

            <input
                name="last_name"
                placeholder="Last Name"
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="date"
                name="birth_date"
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="major"
                placeholder="Major"
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="number"
                step="0.1"
                min="0"
                max="4"
                name="gpa"
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="class_id"
                placeholder="Class ID (ex: C01)"
                onChange={handleChange}
            />

            <br /><br />

            <button onClick={addStudent}>
                Add Student
            </button>

        </div>
    )
}

export default AddStudent