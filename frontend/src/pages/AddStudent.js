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

        // kiểm tra dữ liệu
        if (
            !form.student_id ||
            !form.name ||
            !form.birth_year ||
            !form.major ||
            !form.gpa ||
            !form.class_id
        ) {
            alert("Please fill all fields")
            return
        }

        const data = {
            student_id: form.student_id,
            name: form.name,
            birth_year: parseInt(form.birth_year),
            major: form.major,
            gpa: parseFloat(form.gpa),
            class_id: form.class_id
        }

        try {

            await axios.post(
                "http://127.0.0.1:8000/students",
                data
            )

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
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="number"
                name="birth_year"
                placeholder="Birth Year"
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
                name="gpa"
                placeholder="GPA"
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