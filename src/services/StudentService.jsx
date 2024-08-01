import axiosInstance from './axiosIntance';

class StudentService {

    static createStudent(studentData) {
        return axiosInstance.post('/addStudent', studentData)
            .then(response => response.data)
            .catch(error => {
                console.error('There was an error creating the student!', error);
                throw error;
            });
    }

    static getAllStudents() {
        return axiosInstance.get('/allStudents')
            .then(response => response.data)
            .catch(error => {
                console.error('There was an error fetching the students!', error);
                throw error;
            });
    }

    static getStudentById(studentId) {
        return axiosInstance.get(`/student/${studentId}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`There was an error fetching the student with ID ${studentId}!`, error);
                throw error;
            });
    }

    static updateStudent(studentId, studentData) {
        return axiosInstance.put(`/updateStudent/${studentId}`, studentData)
            .then(response => response.data)
            .catch(error => {
                console.error(`There was an error updating the student with ID ${studentId}!`, error);
                throw error;
            });
    }

    static deleteStudent(studentId) {
        return axiosInstance.delete(`/deleteStudent/${studentId}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`There was an error deleting the student with ID ${studentId}!`, error);
                throw error;
            });
    }
}

export default StudentService;