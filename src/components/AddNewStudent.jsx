// src/components/AddNewStudent.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import StudentService from '../services/StudentService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Validation schema using Yup
const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

const AddNewStudent = () => {
    const navigate = useNavigate();

    const handleSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
        const newStudent = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password
        };

        StudentService.createStudent(newStudent)
            .then(() => {
                toast.success('Student added successfully!');
                resetForm();
                navigate('/');
            })
            .catch(error => {
                console.error('There was an error adding the student!', error);
                toast.error('Failed to add student. Please try again.');
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Add New Student</h2>
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <Field
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                            />
                            <ErrorMessage name="firstName" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <Field
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                            />
                            <ErrorMessage name="lastName" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <Field
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                            />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <Field
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                            />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Adding...' : 'Add Student'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddNewStudent;
