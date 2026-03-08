import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function StudentList() {

    const [students, setStudents] = useState([])

    useEffect(() => {
        fetchStudents()
    }, [])

    const fetchStudents = async () => {
        const res = await axios.get("http://127.0.0.1:8000/students")
        setStudents(res.data)
    }

    const deleteStudent = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/students/${id}`)
        fetchStudents()
    }

    return (

        <div>

            <h2>Student List</h2>

            <Link to="/students/add">
                <button>Add Student</button>
            </Link>

            <table border="1">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Major</th>
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
                            <td>{s.gpa}</td>

                            <td>

                                <Link to={`/students/edit/${s.id}`}>
                                    <button>Edit</button>
                                </Link>

                                <button onClick={() => deleteStudent(s.id)}>
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