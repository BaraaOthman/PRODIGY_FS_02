import React, { useState, useEffect } from 'react';
import './gList.css';
import ItemService from '../ItemServices'; // Import the ItemService
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

const GroceryList = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', category: '', quantity: '' });
    const [editing, setEditing] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [cookies] = useCookies(['username']);
    const username = cookies.username;

    const fetchItems = async () => {
        try {

            // Send the username to the backend
            const response = await fetch('http://localhost:3002/items/items', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'username': username
                }
            });

            if (!username) {
                setMessage('Username not found in cookies');
                return;
            }


            if (!response.ok) {
                const errorData = await response.json();
                setMessage(errorData.message || 'An error occurred.');
                return;
            }

            const data = await response.json();

            // Ensure the data is an array
            if (Array.isArray(data.items.items)) {
                setItems(data.items.items);
            } else {
                setMessage('Invalid data format received from server');
            }
        } catch (error) {
            setMessage('An error occurred.');
        }
    };

    useEffect(() => {
        console.log(`username from the list: ${cookies.username}`);
        fetchItems();
    }, []);

    const handleChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        try {
            const response = await ItemService.addItem(newItem, username);

            const user_id = response.data.data.insertId

            if (response.data.success) {
                setItems([...items, { ...newItem, id: user_id }]);
                setNewItem({ name: '', category: '', quantity: '' });
                await fetchItems()
                navigate('/')
            } else {
                setError(response.data.message || 'Error adding item');
            }
        } catch (error) {
            setError('Error adding item');
        }
    };

    const handleUpdate = async (item_id) => {
        try {

            const data = { name: newItem.name, category: newItem.category, quantity: newItem.quantity };
            console.log(`data : ${JSON.stringify(data)}`)
            const response = await ItemService.updateItem(data,item_id, username);
    
            if (!username) {
                setMessage('Username not found in cookies');
                return;
            }
    
            if (response.status === 200) {
                setItems(items.map(item => (item.item_id === item_id ? newItem : item)));
                setEditing(null);
                setNewItem({ name: '', category: '', quantity: '' });
            } else {
                console.error('Error updating item:', response.message);
            }
        } catch (error) {
            setError('Error updating item');
        }
    };
    
    const handleEdit = (item) => {
        setEditing(item.item_id);
        setNewItem(item);
    };

    const handleDelete = async (item_id) => {
        try {

            if (!username) {
                setMessage('Username not found in cookies');
                return;
            }

            const response = await ItemService.deleteItem(item_id, username);

            if (response.status === 200) {
                setItems(items.filter(item => item.item_id !== item_id));
                navigate('/')
            } else {
                console.error('Error deleting item:', response.message);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div className="grocery-list">
            <h1>Grocery List</h1>
            {message && <p>{message}</p>}
            <table className="grocery-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.item_id}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <button onClick={() => handleEdit(item)}>Edit</button>
                                <button onClick={() => handleDelete(item.item_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="grocery-form">
                <h2>{editing ? 'Edit Item' : 'Add New Item'}</h2>
                <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <input
                    type="text"
                    name="category"
                    value={newItem.category}
                    onChange={handleChange}
                    placeholder="Category"
                />
                <input
                    type="number"
                    name="quantity"
                    value={newItem.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                />
                <button onClick={editing ? () => handleUpdate(editing) : handleAdd}>
                    {editing ? 'Update Item' : 'Add Item'}
                </button>
            </div>
        </div>
    );
}

export default GroceryList;
