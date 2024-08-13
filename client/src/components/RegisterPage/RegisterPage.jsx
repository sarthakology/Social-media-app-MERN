import React from 'react'
import { Link } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  }
  from 'mdb-react-ui-kit';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitData = (e) => {
    e.preventDefault()
    const formData = {
      username: username,
      email:email,
      password: password
    };
    axios.post('http://localhost:2000/api/register', formData)
      .then(response => {
        console.log('Data sent successfully');
        navigate('/home');

      })
      .catch(error => {
        setError('Error sending data:', error)
        console.error('Error sending data:', error);
      });
  };

    return (
        <MDBContainer fluid>
          <MDBRow>
    
            <MDBCol sm='6' className='d-none d-sm-block px-0'>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                alt="Login image" className="w-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
            </MDBCol>


            <MDBCol sm='6'>
              <div className='d-flex flex-row ps-5 pt-5'>
                <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
                <span className="h1 fw-bold mb-0">INSTAGRAM</span>
              </div>
    
              <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
    
                <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Register</h3>

                <form>
    
                <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg" onChange={(e) => setEmail(e.target.value)} value={email}/>
                <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Username' id='formControlLg' type='string' size="lg" onChange={(e) => setUsername(e.target.value)} value={username}/>
                <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg"onChange={(e) => setPassword(e.target.value)} value={password}/>
                
                <p className="small mb-5 pb-lg-3 ms-5" style={{ color: 'red' }}>{error}</p>


                
    
                <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={submitData}>Register</MDBBtn>
                </form>

                <p className='ms-5'>Already have an account? <Link to="/" class="link-info">Signin here</Link></p>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      );

}
