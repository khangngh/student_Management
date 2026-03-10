import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./AddClass.css"

function AddClass() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        class_id: "",
        class_name: "",
        advisor: "",
        start_date: "",
        end_date: ""
    })

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const addClass = async () => {

        if (
            !form.class_id ||
            !form.class_name ||
            !form.advisor ||
            !form.start_date ||
            !form.end_date
        ) {
            alert("Please fill all fields")
            return
        }

        try {

            console.log(form)

            await axios.post(
                "http://127.0.0.1:8000/classes",
                form
            )

            alert("Class created successfully")

            navigate("/students")

        } catch (error) {

            console.log("Error:", error.response?.data)

            alert("Failed to create class")

        }
    }

    return (

        <div className="addclass-container">

            <button
                className="addclass-back"
                onClick={() => navigate("/students")}
            >
                ← Back
            </button>

            <h1 className="addclass-title">
                Add Class
            </h1>

            <div className="addclass-card">

                <input
                    className="addclass-input"
                    name="class_id"
                    placeholder="Class ID"
                    onChange={handleChange}
                />

                <input
                    className="addclass-input"
                    name="class_name"
                    placeholder="Class Name"
                    onChange={handleChange}
                />

                <input
                    className="addclass-input"
                    name="advisor"
                    placeholder="Advisor"
                    onChange={handleChange}
                />

                <input
                    className="addclass-input"
                    type="date"
                    name="start_date"
                    onChange={handleChange}
                />

                <input
                    className="addclass-input"
                    type="date"
                    name="end_date"
                    onChange={handleChange}
                />

                <button
                    className="addclass-button"
                    onClick={addClass}
                >
                    Add Class
                </button>

            </div>

        </div>
    )
}

export default AddClass