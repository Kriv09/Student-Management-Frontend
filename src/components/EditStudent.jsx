import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../services/axiosIntance'; 
import { hashStringSHA256 } from '../Utils/UtilsFunctions';

const EditStudent = () => {
  const { id } = useParams(); // Get the student ID from the route parameters
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '' 
  });
  const [storedPassword, setStoredPassword] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axiosInstance.get(`/student/${id}`);
        setStudent({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          currentPassword: '' 
        });
        setStoredPassword(response.data.password); 
      } catch (error) {
        console.error('Error fetching student data:', error.response || error.message);
        toast.error('Error fetching student data');
      }
    };

    fetchStudentData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hash the entered password to compare with the stored hashed password
    const hashedCurrentPassword = await hashStringSHA256(student.currentPassword);

    // Verify the entered password matches the stored password
    if (hashedCurrentPassword !== storedPassword) {
      toast.error('Incorrect password');
      return;
    }

    try {
      await axiosInstance.put(`/updateStudent/${id}`, {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
      });
      toast.success('Student updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error updating student data:', error.response || error.message);
      toast.error('Error updating student data');
    }
  };

  return (
    <div className="container mt-4">
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formFirstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="formFirstName"
            placeholder="Enter student first name"
            name="firstName"
            value={student.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formLastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="formLastName"
            placeholder="Enter student last name"
            name="lastName"
            value={student.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formEmail" className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="formEmail"
            placeholder="Enter student email"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formCurrentPassword" className="form-label">Current Password</label>
          <input
            type="password"
            className="form-control"
            id="formCurrentPassword"
            placeholder="Enter your current password"
            name="currentPassword"
            value={student.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditStudent;
