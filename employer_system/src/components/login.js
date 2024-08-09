import "./loginRegister.css"
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import UserService from '../UserServices';


const Login = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [cookies, setCookie] = useCookies(['username']);

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

        formDataObj.append("password", formData.password);

        event.preventDefault();
        try {
            const response = await UserService.login(formData)
            setMessage(response.data.message);
            if (response.data.success) {
                // Redirect to dashboard or home page
                setCookie('username', formData.username, { path: '/' });
                
                navigate('/')
            }else {
                setMessage(response.data.message);
            }
    
        } catch (error) {
            setMessage(error.response.data.message || 'An error occurred.');
        }
    };

    return (
        <div className="login-register-container">
            <h1>Login</h1>
            {message && <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>

                    <input
                        type="text"
                        id="username"
                        className="formFieldInput"
                        placeholder="Enter your username"
                        name="username"
                        value={formData.username}
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
                <button type="submit">Login</button>
            </form>
            <div className="footer">
                <p>Don't have an account? <a href="/register">Sign Up Here</a></p>
            </div>
        </div>
    );
};

export default Login;











































// ha seb aal aayleeeeeeeeeeee
// shu sayer hayetee?
// ma sayer shi 3omru ma hada yrja3 mabdi za3lakkkkkkkkkkkkkkkkkkkkkkkkkkkk
// barou2 albe







































////////////////
/////
//
///
//maba2aaaaaaaaaa t2liiii hekkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
// ma 5alayteini kafi hayete kafi hayete
// mn ba3d ezn jaleltik ma t2tshi

// hayete barou2 eltelik 3edi nbesti ma3 ahlna w bnetfeham 3ala rawa2
// 5alas trekiini heik merte7 b shi yali 3am eshte8lu w enti rou7i la3and ahlna
// 5alast hayete

/// ktirrrrrrrrrrrrr masmoumm badanii tfeh ma bdi shuf 7ada 5alas
//





////////////////////
//ktirrrr m3asbeeeeeeeeeeeeeeeeeeeeeeeeeeee








// hayete shu 3am ta3mmli
// ya 3ami shu fe hala2
// b7yete hayda she8l hayda?



// bdi sakru khalas bdi tafii aanjd 3asabt
// 3am t5alfi klmti?
// ana ezeiki aw ezi 3ayletna b shi?
