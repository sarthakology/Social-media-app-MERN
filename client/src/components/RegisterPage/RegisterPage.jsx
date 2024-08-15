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

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submitData = async (e) => {
        e.preventDefault();
        const formData = {
            username,
            email,
            password
        };
        try {
            await axios.post('http://localhost:2000/api/register', formData);
            console.log('Data sent successfully');
            navigate('/home');
        } catch (error) {
            setError('Error sending data. Please try again.');
            console.error('Error sending data:', error);
        }
    };

    return (
        <MDBContainer fluid>
            <MDBRow>
                <MDBCol sm='6' className='d-none d-sm-block px-0'>
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                        alt="Urban city skyline background"
                        className="w-100"
                        style={{ objectFit: 'cover', objectPosition: 'left' }}
                    />
                </MDBCol>
                <MDBCol sm='6'>
                    <div className='d-flex flex-row ps-5 pt-5'>
                        <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }} />
                        <span className="h1 fw-bold mb-0">INSTAGRAM</span>
                    </div>
                    <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
                        <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Register</h3>
                        <form onSubmit={submitData}>
                            <MDBInput
                                wrapperClass='mb-4 mx-5 w-100'
                                label='Email address'
                                id='formControlLg'
                                type='email'
                                size="lg"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <MDBInput
                                wrapperClass='mb-4 mx-5 w-100'
                                label='Username'
                                id='formControlLg'
                                type='text'
                                size="lg"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                            />
                            <MDBInput
                                wrapperClass='mb-4 mx-5 w-100'
                                label='Password'
                                id='formControlLg'
                                type='password'
                                size="lg"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <p className="small mb-5 pb-lg-3 ms-5" style={{ color: 'red' }}>{error}</p>
                            <MDBBtn
                                className="mb-4 px-5 mx-5 w-100"
                                color='info'
                                size='lg'
                                type='submit'
                            >
                                Register
                            </MDBBtn>
                        </form>
                        <p className='ms-5'>Already have an account? <Link to="/" className="link-info">Signin here</Link></p>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};
