import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"

function EditStudent() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        student_id: "",
        name: "",
        birth_year: "",
        major: "",
        gpa: ""
    })

    useEffect(() => {
        fetchStudent()
    }, [])

    const fetchStudent = async () => {

        const res = await axios.get("http://127.0.0.1:8000/students")

        const student = res.data.find(s => s.id === parseInt(id))

        setForm(student)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const updateStudent = async () => {

        await axios.put(
            `http://127.0.0.1:8000/students/${id}`,
            form
        )

        navigate("/students")
    }

    return (

        <div>

            <h2>Edit Student</h2>

            <input
                name="student_id"
                value={form.student_id || ""}
                onChange={handleChange}
            />

            <input
                name="name"
                value={form.name || ""}
                onChange={handleChange}
            />

            <input
                name="birth_year"
                value={form.birth_year || ""}
                onChange={handleChange}
            />

            <input
                name="major"
                value={form.major || ""}
                onChange={handleChange}
            />

            <input
                name="gpa"
                value={form.gpa || ""}
                onChange={handleChange}
            />

            <br /><br />

            <button onClick={updateStudent}>Update</button>

        </div>
    )
}

export default EditStudent