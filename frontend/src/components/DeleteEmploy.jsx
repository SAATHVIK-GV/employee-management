import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const DeleteEmploy = () => {
    const employId = useParams().id;
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.delete(`http://localhost:3000/employs/delete/${employId}`);
                setEmployees(response.data);
            } catch (err) {
                console.error('Error fetching employees:', err);
            }
        };

        fetchEmployees();
    }, []);
  return (
    <div>
        <h4 id="delete-mess">Employee Deleted Succesfully</h4>
    </div>
  )
}

export default DeleteEmploy;
