import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import MajorChart from "../components/MajorChart"
function StudentList() {

    const [students, setStudents] = useState([])
    const [search, setSearch] = useState("")
    const [stats, setStats] = useState(null)

    const [sortField, setSortField] = useState(null)
    const [sortOrder, setSortOrder] = useState("asc")

    useEffect(() => {
        fetchStudents()
        fetchStats()
    }, [])

    const fetchStudents = async () => {

        let url = "http://127.0.0.1:8000/students"

        if (search !== "") {
            url += `?name=${search}`
        }

        const res = await axios.get(url)

        setStudents(res.data)
    }

    const fetchStats = async () => {

        const res = await axios.get(
            "http://127.0.0.1:8000/stats"
        )

        setStats(res.data)
    }

    const deleteStudent = async (id) => {

        await axios.delete(
            `http://127.0.0.1:8000/students/${id}`
        )

        fetchStudents()
        fetchStats()
    }

    const exportCSV = () => {

        window.open(
            "http://127.0.0.1:8000/export"
        )
    }

    const sortData = (field) => {

        const order =
            sortField === field && sortOrder === "asc"
                ? "desc"
                : "asc"

        setSortField(field)
        setSortOrder(order)

        const sorted = [...students].sort((a, b) => {

            if (a[field] < b[field])
                return order === "asc" ? -1 : 1

            if (a[field] > b[field])
                return order === "asc" ? 1 : -1

            return 0
        })

        setStudents(sorted)
    }

    return (

        <div className="container">

            <h1 className="title">Student Management</h1>

            {/* =============================
                STATISTICS
            ============================== */}

            {stats && (

                <div className="stats">

                    <div className="card">
                        <h3>Total Students</h3>
                        <p>{stats.total_students}</p>
                    </div>

                    <div className="card">
                        <h3>Average GPA</h3>
                        <p>{stats.average_gpa?.toFixed(2)}</p>
                    </div>

                    <div className="card">
                        <h3>Students by Major</h3>

                        <MajorChart data={stats.students_by_major} />

                    </div>

                </div>

            )}

            {/* =============================
                ACTION BAR
            ============================== */}

            <div className="toolbar">

                <input
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button onClick={fetchStudents}>
                    Search
                </button>

                <Link to="/students/add">
                    <button>
                        Add Student
                    </button>
                </Link>

                <Link to="/classes/add">
                    <button>
                        Add Class
                    </button>
                </Link>

                <button onClick={exportCSV}>
                    Export CSV
                </button>

            </div>

            {/* =============================
                STUDENT TABLE
            ============================== */}

            <table className="student-table">

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

                            <td className="actions">

                                <Link to={`/students/edit/${s.id}`}>
                                    <button className="edit">
                                        Edit
                                    </button>
                                </Link>

                                <button
                                    className="delete"
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