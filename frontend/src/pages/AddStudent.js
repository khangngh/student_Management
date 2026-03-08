import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function AddStudent() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        student_id: "",
        name: "",
        birth_year: "",
        major: "",
        gpa: ""
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const addStudent = async () => {

        await axios.post("http://127.0.0.1:8000/students", form)

        navigate("/students")
    }

    return (

        <div>

            <h2>Add Student</h2>

            <input
                name="student_id"
                placeholder="Student ID"
                onChange={handleChange}
            />

            <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
            />

            <input
                name="birth_year"
                placeholder="Birth Year"
                onChange={handleChange}
            />

            <input
                name="major"
                placeholder="Major"
                onChange={handleChange}
            />

            <input
                name="gpa"
                placeholder="GPA"
                onChange={handleChange}
            />

            <br /><br />

            <button onClick={addStudent}>Add</button>

        </div>
    )
}

export default AddStudent