import React, { useState } from 'react';
import useAuth from './hooks/useAuth';
import axios from "../api/axios"
import Task from './TaskFrame';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LOGIN_URL = "/login"

function Login() {
    const { auth, setAuth, setIsLogin} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [response, setResponse] = useState('');

    const from = location.state?.from?.pathname || "/";


    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // console.log("Learning Nodejs", auth)



    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Make a POST request to the SignUp API with formData
        try {
            const response = await axios.post(LOGIN_URL, formData);
            // Set the response data in state

            const accessToken = response.data?.data?.accessToken;
            // console.log(response.data?.data?.accessToken);
            setResponse(response.data.message);
            setAuth({ ...formData, accessToken });
            setIsLogin(true);

            // Store email and accesstoken to localstorage
            localStorage.setItem(
                "email",
                JSON.stringify({ "email": formData.email, password: formData.password, "accessToken": accessToken })
            );

            navigate(from, { replace: true });
        } catch (err) {
            console.log(err.response);
            if (!err?.response) {
                setErrMsg('No server response');
            }
            else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
                alert("Incorrect Password!");

            } else if (err.response?.status === 401) {
                setErrMsg('Unautherized');
                alert("Email id is not registred !!!");
            }
            else {
                 setErrMsg('Login failed');
                alert("Incorrect Email or Password!");
            }

        }
    };

    return (<>
        <section class="vh-100 style-1" >
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card shadow-2-strong style-2">
                            <form class="card-body p-5 text-center" onSubmit={handleSubmit}>

                                <h3 class="mb-5">Sign in</h3>

                                <div class="form-outline mb-4">

                                    <label
                                        htmlFor="typeEmailX-2"
                                        className="form-label">
                                        Email
                                    </label>
                                    <input
                                        id="typeEmailX-2"
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
                                        htmlFor="typePasswordX-2"
                                        className="form-label">
                                        Password
                                    </label>
                                    <input
                                        class="form-control form-control-lg"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>


                                <div class="form-check d-flex justify-content-start mb-4">
                                    <input class="form-check-input" type="checkbox" value="" id="form1Example3" />
                                    <label class="form-check-label" for="form1Example3"> Remember password </label>
                                </div>

                                <button class="btn btn-primary btn-lg btn-block" type="submit" >Login</button>

                                {/* <hr class="my-4" />

                                <button class="btn btn-lg btn-block btn-primary style-3"
                                    type="submit"><i class="fab fa-google me-2"></i> Sign in with google</button>
                                <button class="btn btn-lg btn-block btn-primary mb-2 style-4"
                                    type="submit"><i class="fab fa-facebook-f me-2"></i>Sign in with facebook</button> */}

                                <p class="text-center text-muted mt-5 mb-0">New  account? <a href="/register"
                                    class="fw-bold text-body"><u>Register here</u></a></p>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    );
}

export default Login;

