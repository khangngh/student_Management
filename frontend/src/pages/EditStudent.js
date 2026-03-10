import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import "./EditStudent.css"
function EditStudent() {

    const { id } = useParams()
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

    useEffect(() => {
        fetchStudent()
    }, [])

    const fetchStudent = async () => {

        const res = await axios.get("http://127.0.0.1:8000/students")

        const student = res.data.find(s => s.id === parseInt(id))

        if (student) {
            setForm(student)
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const updateStudent = async () => {

        try {

            const data = {
                student_id: form.student_id,
                first_name: form.first_name,
                last_name: form.last_name,
                birth_date: form.birth_date,
                major: form.major,
                gpa: parseFloat(form.gpa),
                class_id: form.class_id
            }

            await axios.put(
                `http://127.0.0.1:8000/students/${id}`,
                data
            )

            alert("Student updated successfully")

            navigate("/students")

        } catch (error) {

            console.log(error.response?.data)

            alert("Error updating student")

        }
    }

    return (

        <div className="form-container">

            <button
                className="back-button"
                onClick={() => navigate("/students")}
            >
                ← Back
            </button>

            <h1 className="form-title">
                Edit Student
            </h1>

            <div className="form-card">

                <input
                    className="form-input"
                    name="student_id"
                    value={form.student_id || ""}
                    onChange={handleChange}
                />

                <div className="form-row">

                    <input
                        className="form-input"
                        name="first_name"
                        value={form.first_name || ""}
                        onChange={handleChange}
                    />

                    <input
                        className="form-input"
                        name="last_name"
                        value={form.last_name || ""}
                        onChange={handleChange}
                    />

                </div>

                <input
                    className="form-input"
                    type="date"
                    name="birth_date"
                    value={form.birth_date || ""}
                    onChange={handleChange}
                />

                <input
                    className="form-input"
                    name="major"
                    value={form.major || ""}
                    onChange={handleChange}
                />

                <input
                    className="form-input"
                    type="number"
                    step="0.1"
                    min="0"
                    max="4"
                    name="gpa"
                    value={form.gpa || ""}
                    onChange={handleChange}
                />

                <input
                    className="form-input"
                    name="class_id"
                    value={form.class_id || ""}
                    onChange={handleChange}
                />

                <button
                    className="form-button"
                    onClick={updateStudent}
                >
                    Update Student
                </button>

            </div>

        </div>
    )
}

export default EditStudent