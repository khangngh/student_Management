import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import ListStudent from "./pages/StudentList"
import AddStudent from "./pages/AddStudent"
import EditStudent from "./pages/EditStudent"

function App() {
  return (
    <Router>

      <Routes>

        <Route path="/" element={<ListStudent />} />

        <Route path="/students" element={<ListStudent />} />

        <Route path="/students/add" element={<AddStudent />} />

        <Route path="/students/edit/:id" element={<EditStudent />} />

      </Routes>

    </Router>
  )
}

export default App