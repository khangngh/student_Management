import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function StudentList() {

    const [students, setStudents] = useState([])
    const [search, setSearch] = useState("")

    const [sortField, setSortField] = useState(null)
    const [sortOrder, setSortOrder] = useState("asc")

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

    const sortData = (field) => {

        const order =
            sortField === field && sortOrder === "asc"
                ? "desc"
                : "asc"

        setSortField(field)
        setSortOrder(order)

        const sorted = [...students].sort((a, b) => {

            if (a[field] < b[field]) return order === "asc" ? -1 : 1
            if (a[field] > b[field]) return order === "asc" ? 1 : -1
            return 0

        })

        setStudents(sorted)
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

                <Link to="/classes/add">
                    <button style={{ marginLeft: "10px" }}>
                        Add Class
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

                        <th onClick={() => sortData("student_id")}>
                            ID
                        </th>

                        <th onClick={() => sortData("first_name")}>
                            First Name
                        </th>

                        <th onClick={() => sortData("last_name")}>
                            Last Name
                        </th>

                        <th onClick={() => sortData("major")}>
                            Major
                        </th>

                        <th onClick={() => sortData("class_id")}>
                            Class
                        </th>

                        <th onClick={() => sortData("gpa")}>
                            GPA
                        </th>

                        <th>
                            Action
                        </th>

                    </tr>
                </thead>

                <tbody>

                    {students.map(s => (

                        <tr key={s.id}>

                            <td>{s.student_id}</td>

                            <td>{s.first_name}</td>

                            <td>{s.last_name}</td>

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