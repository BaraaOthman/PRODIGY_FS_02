import React, { useEffect, useState } from 'react';
import UserService from '../UserServices';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';
import './home.css';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cookies] = useCookies(['username']);

    useEffect(() => {
    

        const fetchUsers = async () => {
            try {
                const response = await UserService.users();
                if (response.data.success && Array.isArray(response.data.users)) {
                    setUsers(response.data.users);
                } else {
                    setError(response.data.message || 'Unexpected response format');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleUpdate = (userId) => {
        console.log(`Update user with ID: ${userId}`);
    
    };

    const handleDelete = (userId) => {
        console.log(`Delete user with ID: ${userId}`);
    
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="home-container">
            <div>
                <h1>Welcome, {cookies.username}</h1>
            </div>
            <h1>User List</h1>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>
                                <button
                                    className="update-button"
                                    onClick={() => handleUpdate(user.id)}
                                >
                                    Update
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
