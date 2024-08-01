import React, { Component } from 'react';
import StudentService from '../services/StudentService'; 
import { Link } from 'react-router-dom'; 
import { toast } from 'react-toastify';


class StudentTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        this.fetchStudents();
    }

    fetchStudents() {
        StudentService.getAllStudents()
            .then(students => {
                this.setState({ students, loading: false });
            })
            .catch(error => {
                console.error('There was an error fetching the students!', error);
                this.setState({ loading: false, error: error.message });
            });
    }

    handleDelete = (studentId) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            StudentService.deleteStudent(studentId)
                .then(() => {
                    this.fetchStudents();
                    toast.error("Student deleted successfuly!");
                })
                .catch(error => {
                    console.error(`There was an error deleting the student with ID ${studentId}!`, error);
                    this.setState({ error: error.message });
                });
        }
    }

    render() {
        const { students, loading, error } = this.state;

        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>Error: {error}</p>;
        }

        return (
            <div className="container mt-4">
                <h2 className="mb-4">Student List</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td>{student.email}</td>
                                <td>
                                    <Link to={`/edit-student/${student.id}`} >
                                        <button className="btn btn-primary btn-sm">
                                            Edit
                                        </button>
                                    </Link>
                                    <button 
                                        className="btn btn-danger btn-sm ms-2" 
                                        onClick={() => this.handleDelete(student.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mb-3">
                    <Link to="/add-new-student">
                        <button className="btn btn-success">Add New Student</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default StudentTable;
