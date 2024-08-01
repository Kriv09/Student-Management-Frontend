// src/App.js
import './App.css';
import Nav from './components/Nav';
import StudentTable from './components/StudentTable';
import AddNewStudent from './components/AddNewStudent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import EditStudent from './components/EditStudent' 

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="container mt-4">

          {/* Define Routes */}
          <Routes>
            <Route path="/" element={<StudentTable />} />
            <Route path="/add-new-student" element={<AddNewStudent />} />
            <Route path='/edit-student/:id' element={<EditStudent />} />
          </Routes>
        </div>
        <ToastContainer /> {/* Toastr container for notifications */}
      </div>
    </Router>
  );
}

export default App;
