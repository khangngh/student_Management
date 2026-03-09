import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function StudentList() {

    const [students, setStudents] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetchStudents()
    }, [])

    const fetchStudents = async () => {

        let url = "http://127.0.0.1:8000/students"

        if (search !== "") {
            url += `?name=${search}`
        }

        const res = await axios.get(url)

        setStudents(res.data)
    }

    const deleteStudent = async (id) => {

        await axios.delete(`http://127.0.0.1:8000/students/${id}`)

        fetchStudents()
    }

    const exportCSV = () => {

        window.open("http://127.0.0.1:8000/export")
    }

    return (

        <div>

            <h2>Student List</h2>

            <div style={{ marginBottom: "20px" }}>

                <input
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button onClick={fetchStudents}>
                    Search
                </button>

                <Link to="/students/add">
                    <button style={{ marginLeft: "10px" }}>
                        Add Student
                    </button>
                </Link>

                <button
                    onClick={exportCSV}
                    style={{ marginLeft: "10px" }}
                >
                    Export CSV
                </button>

            </div>

            <table border="1">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Major</th>
                        <th>Class</th>
                        <th>GPA</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {students.map(s => (

                        <tr key={s.id}>

                            <td>{s.student_id}</td>

                            <td>{s.name}</td>

                            <td>{s.major}</td>

                            <td>{s.class_id}</td>

                            <td>{s.gpa}</td>

                            <td>

                                <Link to={`/students/edit/${s.id}`}>
                                    <button>Edit</button>
                                </Link>

                                <button
                                    onClick={() => deleteStudent(s.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    )
}

export default StudentList