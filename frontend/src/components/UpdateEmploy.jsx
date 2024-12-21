import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'

const UpdateEmploy = () => {
    const employId = useParams().id;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        employee_id: '',
        email: '',
        phone_number: '',
        department: '',
        date_of_joining: '',
        role: ''
    });
    useEffect(()=>{
        const fetchDetails = async()=>{
            try {
                const result = await axios.get(`http://localhost:3000/employs/${employId}`);
                setFormData({
                    name: result.data[0].name,
                    employee_id: result.data[0].employee_id,
                    email: result.data[0].email,
                    phone_number: result.data[0].phone_number,
                    department: result.data[0].department,
                    date_of_joining: result.data[0].date_of_joining.split('T')[0],
                    role: result.data[0].role
                });
            } catch (error) {
                console.error('Error fetching employee details:', error);
            }
        }
        fetchDetails();
    },[employId]);
    const [error, setError] = useState({});
    const [message, setMessage] = useState('');

    const validate = () => {
        const errors = {};
        if (!formData.name) errors.name = 'Name is required';
        if (!formData.employee_id) errors.employee_id = 'Employee ID is required';
        if (!/^[a-zA-Z0-9]{1,10}$/.test(formData.employee_id)) errors.employee_id = 'Invalid Employee ID format';
        if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email format';
        if (!/^\d{10}$/.test(formData.phone_number)) errors.phone_number = 'Invalid phone number';
        if (!formData.department) errors.department = 'Department is required';
        if (!formData.date_of_joining) errors.date_of_joining = 'Date of joining is required';
        if (new Date(formData.date_of_joining) > new Date()) errors.date_of_joining = 'Future dates not allowed';
        if (!formData.role) errors.role = 'Role is required';
        return errors;
    };

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3000/employs/update/${employId}`, formData);
            setMessage(response.data.message);
            navigate("/view-employees")
        } catch (err) {
            setMessage(err.response?.data?.message || 'Submission failed');
        }
    };

    return (
        <div>
            <h1>Add Employee</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                {error.name && <span>{error.name}</span>}

                <input type="text" name="employee_id" placeholder="Employee ID" value={formData.employee_id} onChange={handleChange} />
                {error.employee_id && <span>{error.employee_id}</span>}

                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                {error.email && <span>{error.email}</span>}

                <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} />
                {error.phone_number && <span>{error.phone_number}</span>}

                <select name="department" value={formData.department} onChange={handleChange}>
                    <option value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                </select>
                {error.department && <span>{error.department}</span>}

                <input type="date" name="date_of_joining" value={formData.date_of_joining} onChange={handleChange} />
                {error.date_of_joining && <span>{error.date_of_joining}</span>}

                <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} />
                {error.role && <span>{error.role}</span>}

                <button type="submit">Submit</button>
                <button type="reset" onClick={() => setFormData({ name: '', employee_id: '', email: '', phone_number: '', department: '', date_of_joining: '', role: '' })}>
                    Reset
                </button>

                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default UpdateEmploy;
