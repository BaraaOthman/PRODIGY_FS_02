import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import GroceryList from './components/GroceryList';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<GroceryList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
