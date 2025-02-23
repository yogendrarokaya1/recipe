import React, { useState } from 'react';
import axios from 'axios';

export default function InputForm({ setIsOpen }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let endpoint = isSignUp ? 'signUp' : 'login';
    
        try {
            console.log("Sending request to:", `http://localhost:5000/api/${endpoint}`);
            const response = await axios.post(`http://localhost:5000/api/${endpoint}`, { email, password });
    
            console.log("Response received:", response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
    
            setIsOpen();
        } catch (err) {
            console.error("Error:", err.response);
            setError(err.response?.data?.error || 'An error occurred, please try again!');
        }
    };
    

    return (
        <form className='form' onSubmit={handleOnSubmit}>
            <div className='form-control'>
                <label>Email</label>
                <input
                    type='email'
                    className='input'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input
                    type='password'
                    className='input'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type='submit'>{isSignUp ? 'Sign Up' : 'Login'}</button><br />
            
            {error && <h6 className='error'>{error}</h6>}<br />
            
            <p onClick={() => setIsSignUp((prev) => !prev)}>
                {isSignUp ? 'Already have an account?' : 'Create a new account'}
            </p>
        </form>
    );
}
