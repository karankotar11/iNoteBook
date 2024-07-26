import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [not_same_password, setnot_same_password] = useState(null);
    let navigate = useNavigate();
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => {
            const newState = { ...prevState, [id]: value };

            // Check if password and confirmPassword match
            if (id === 'password' || id === 'confirmPassword') {
                setPasswordMismatch(newState.password !== newState.confirmPassword);
                
                if(newState.password===newState.confirmPassword)
                {
                    setnot_same_password(null);
                }
                else{
                  
                    setnot_same_password("Confirm password not Match!")
                }
                
            }
           
           

            return newState;
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        props.setProgress(30);
        // console.log('Username:', formData.username);
        // console.log('Email:', formData.email);
        // console.log('Password:', formData.password);
        // console.log('Confirm Password:', formData.confirmPassword);
        //fething data

        const url = "http://localhost:5000/api/auth/createuser";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: formData.username, email: formData.email, password: formData.password })
        });
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            props.showalert("Please enter all data", "Warning");
            props.setProgress(100);
            return;
        }
        props.setProgress(100);
        const json = await response.json();
        console.log(json);
        if (json.success) {

            props.showalert("User created successfully", "Success.")
            navigate('/login');
        }
        
        console.log("username:" + formData.email)

        setFormData(
            {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        );
    };
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-center mt-5">Signup</h2>
                        <form>
                            <div className="form-group">

                                <input type="text" className="form-control p-2 my-4" id="username" value={formData.username || ''} placeholder="Enter username" onChange={handleChange} required />
                            </div>
                            <div className="form-group">

                                <input type="email" className="form-control p-2 my-4" id="email" value={formData.email || ''} placeholder="Enter email" autoComplete="email" onChange={handleChange} required />
                            </div>
                            <div className="form-group">

                                <input type="password" className="form-control p-2 my-4" id="password" value={formData.password || ''} placeholder="Password" autoComplete="new-password" onChange={handleChange} required />
                            </div>
                            <div className="form-group">

                                <input type="password" className="form-control p-2 my-4" id="confirmPassword" value={formData.confirmPassword || ''} autoComplete="new-password" placeholder="Confirm Password" onChange={handleChange} required />
                                <h5 className='my-0 text-danger'>{not_same_password}</h5>
                            </div>
                            
                            <button type="submit" disabled={passwordMismatch} className="btn btn-primary btn-block" onClick={handleSubmit}>Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
