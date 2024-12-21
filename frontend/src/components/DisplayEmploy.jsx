import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import editicon from "../assets/edit.png";
import deleteicon from "../assets/delete.png";
import axios from 'axios';

const DisplayEmploy = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3000/employs');
                setEmployees(response.data);
            } catch (err) {
                console.error('Error fetching employees:', err);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div>
            <h1>Employee List</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Employee ID</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Department</th>
                        <th>Date of Joining</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.employee_id}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone_number}</td>
                            <td>{employee.department}</td>
                            <td>{employee.date_of_joining}</td>
                            <td>{employee.role}</td>
                            <td><Link to={`/update-employee/${employee.id}`}><img src={editicon} width={"20px"} height={"20px"}></img></Link></td>
                            <td><Link to={`/delete-employee/${employee.id}`}><img src={deleteicon} width={"20px"} height={"20px"}></img></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayEmploy;
