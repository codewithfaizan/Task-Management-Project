import React, { useEffect, useRef} from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Registration = () => {
    const nameRef = useRef();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    const [response, setResponse] = useState('');

    const [errMsg, setErrMsg] = useState('');

    useEffect(()=>{
        nameRef.current.focus();
    },[])

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/login";

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Make a POST request to the SignUp API with formData
        try {
            const response = await axios.post('http://localhost:10000/register', formData);
            // Set the response data in state
            if (response.status === 200) {
                console.log(response.data);
                alert("You are registerd successfully!!")
                navigate(from, { replace: true })// Set the success message in state
            } else if (response.status === 409) {
                setResponse("User already exists!");
                setErrMsg("User already exists!"); // Handle 409 Conflict (user already exists)
            } else {
                console.error('Error:', response.status, response.statusText);
                setResponse("An error occurred. Please try again.");
                setErrMsg("An error occurred. Please try again.");// Handle other status codes
            }


        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            }
            else if (err.response?.status === 400) {
                setErrMsg('Invalid Details');
            } else if (err.response?.status === 401) {
                setErrMsg('Unautherized');
            }
            else if (err.response?.status === 409) {
                setErrMsg('User Already exists!');
            }
            else {
                setErrMsg('Login failed');
            }

            // errRef.current.focus();
            console.log(errMsg);
        }
    };

    return (
        <>
            <section class="vh-100 bg-image reg-style-1"
            >
                <div class="d-flex align-items-center">{errMsg}</div>
                <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div class="container h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div class="card reg-style-2">
                                    <div class="card-body p-5">
                                        <h2 class="text-uppercase text-center mb-5">Create an account</h2>

                                        <form onSubmit={handleSubmit}>

                                            <div class="form-outline mb-4">
                                                <label
                                                    className="form-label">
                                                    Name
                                                </label>
                                                <input
                                                    id="form3Example1cg"
                                                    ref = {nameRef}
                                                    className="form-control form-control-lg"
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div class="form-outline mb-4">

                                                <label
                                                    htmlFor="form3Example3cg"
                                                    className="form-label">
                                                    Email
                                                </label>
                                                <input
                                                    id="form3Example3cg"
                                                    className="form-control form-control-lg"
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div class="form-outline mb-4">
                                                <label
                                                    htmlFor="form3Example4cg"
                                                    className="form-label">
                                                    Password
                                                </label>
                                                <input
                                                    id="form3Example4cg"
                                                    class="form-control form-control-lg"
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div class="form-outline mb-4">
                                                <label
                                                    htmlFor="form3Example4cdg"
                                                    className="form-label">
                                                    Phone Number
                                                </label>
                                                <input
                                                    id="form3Example4cdg"
                                                    class="form-control form-control-lg"
                                                    type="text"
                                                    name="phoneNumber"
                                                    value={formData.phoneNumber}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            {/* <div class="form-check d-flex justify-content-center mb-5">
                                                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                                                <label class="form-check-label" for="form2Example3g">
                                                    I agree all statements in <a href="#!" class="text-body"><u>Terms of service</u></a>
                                                </label>
                                            </div> */}

                                            <div class="d-flex justify-content-center">
                                                <button type="submit"
                                                    class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                            </div>

                                            <p class="text-center text-muted mt-5 mb-0">Have already an account? <a href="/login"
                                                class="fw-bold text-body"><u>Login here</u></a></p>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Registration
