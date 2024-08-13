import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
} from 'mdb-react-ui-kit';
import axios from 'axios';

export default function SigninPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submitData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:2000/api/login', 
                {
                    username,
                    password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.message === 'success' && response.data.token) {
                // Save the token to local storage
                localStorage.setItem('token', response.data.token);
                
                navigate('/home'); // Navigate to home page after successful login
            } else {
                setError("An unexpected error occurred.");
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError("Error occurred while logging in. Please try again.");
        }
    };

    return (
        <MDBContainer fluid>
            <MDBRow>
                <MDBCol sm='6'>
                    <div className='d-flex flex-row ps-5 pt-5'>
                        <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }} />
                        <span className="h1 fw-bold mb-0">INSTAGRAM</span>
                    </div>
                    <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
                        <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>
                        <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Username' id='formControlLg' type='text' size="lg" onChange={(e) => setUsername(e.target.value)} value={username} />
                        <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg" onChange={(e) => setPassword(e.target.value)} value={password} />
                        <p className="small mb-5 pb-lg-3 ms-5" style={{ color: 'red' }}>{error}</p>
                        <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={submitData}>Login</MDBBtn>
                        <p className="small mb-5 pb-lg-3 ms-5"><a className="text-muted" href="#!">Forgot password?</a></p>
                        <p className='ms-5'>Don't have an account? <Link to="/register" className="link-info">Register here</Link></p>
                    </div>
                </MDBCol>
                <MDBCol sm='6' className='d-none d-sm-block px-0'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                        alt="Login image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}
