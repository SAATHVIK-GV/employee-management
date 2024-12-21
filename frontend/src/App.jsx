import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddEmploy from './components/AddEmploy';
import UpdateEmploy from './components/UpdateEmploy';
import DisplayEmploy from './components/DisplayEmploy';
import DeleteEmploy from './components/DeleteEmploy';

const App = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/add-employee">Add Employee</Link></li>
                    <li><Link to="/view-employees">View Employees</Link></li>
                </ul>
            </nav>
            <div className='intro-content'>
                <h1>Employee Management System</h1>
                <h4>FSD Task 1</h4>
            </div>
            <Routes>
                <Route path="/add-employee/" element={<AddEmploy />} />
                <Route path="/view-employees" element={<DisplayEmploy />} />
                <Route path="/update-employee/:id" element={<UpdateEmploy/>} />
                <Route path="/delete-employee/:id" element={<DeleteEmploy/>} />
            </Routes>
        </Router>
    );
};

export default App;
