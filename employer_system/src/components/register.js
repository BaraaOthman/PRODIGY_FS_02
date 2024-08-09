import React, { useState } from 'react';
import "./loginRegister.css"
import UserService from '../UserServices';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
      });
 
      const handleChange = (e) => {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
    
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    const handleSubmit = async (event) => {
        const formDataObj = new FormData();
      formDataObj.append("username", formData.username);
      formDataObj.append("email", formData.email);
      formDataObj.append("password", formData.password);
        event.preventDefault();
        try {
            const response = await UserService.register(formData)

            setMessage(response.data.message);

            if (response.data.success === true) { 
                // Redirect to login page or dashboard
                navigate('/login')
                // navigate("/login");
            }
        } catch (error) {
            setMessage(error.response.data.message || 'An error occurred.');
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            {message && <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                type="text"
                id="name"
                className="formFieldInput"
                placeholder="Enter your full name"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                type="email"
                id="email"
                className="formFieldInput"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                type="password"
                id="password"
                className="formFieldInput"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;


