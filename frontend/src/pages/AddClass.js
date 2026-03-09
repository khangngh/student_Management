    import React, { useState } from "react"
    import axios from "axios"
    import { useNavigate } from "react-router-dom"

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

            // kiểm tra dữ liệu
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

                console.log(form)   // debug xem dữ liệu gửi đi

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

            <div>

                <h2>Add Class</h2>

                <input
                    name="class_id"
                    placeholder="Class ID"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="class_name"
                    placeholder="Class Name"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="advisor"
                    placeholder="Advisor"
                    onChange={handleChange}
                />

                <br /><br />

                <label>Start Date</label>
                <input
                    type="date"
                    name="start_date"
                    onChange={handleChange}
                />

                <br /><br />

                <label>End Date</label>
                <input
                    type="date"
                    name="end_date"
                    onChange={handleChange}
                />

                <br /><br />

                <button onClick={addClass}>
                    Add Class
                </button>

            </div>
        )
    }

    export default AddClass