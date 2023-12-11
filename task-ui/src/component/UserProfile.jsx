import React, { useEffect, useState, useContext } from 'react'
import "./style/general.css"
import Task from './Task'
import Login from './Login'
import AuthContext from '../context/AuthProvider';
import CreateTask from './CreateTask';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import UpcomingTask from './UpcomingTask';



const SHOW_PROFILE = "/profile";

const UserProfile = () => {
    const { auth, setAuth, currentComponent, setCurrentComponent } = useContext(AuthContext);
    const [showProfileData, setShowProfileData] = useState([]);
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const loginFrom = "/login";

    useEffect(()=>{
        async function showProfile(){
            try {

                // console.log(auth.accessToken);
                const response = await axios.get(SHOW_PROFILE, {
                    headers: { Authorization: auth.accessToken }
                });

                // Set the response data in state
                // console.log(response.data?.profile);
                setShowProfileData(response.data?.profile);
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No server response');
                    navigate(loginFrom, { replace: true });
                }
                else if (err.response?.status === 400) {
                    setErrMsg('You have not any current task yet...');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unautherized');
                    navigate(loginFrom, { replace: true });
                }
                else if (err.response?.status === 403) {
                    setErrMsg('User is not logged In');
                }
                else {
                    setErrMsg('Login failed');
                }

                // errRef.current.focus();
                console.log(errMsg);
            }
        }

        showProfile();
        
    },[])
    return (
        <>
            <section class="user-style-1 page-content" >
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col col-lg-12 mb-4 mb-lg-0">
                            <div class="card mb-3 user-style-2">
                                <div class="row g-0">
                                    <div class="col-md-4 gradient-custom text-center text-white user-style-3"
                                    >
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                            alt="Avatar" class="img-fluid my-5 user-style-4" />
                                        <h5>{showProfileData[0]?.name}</h5>
                                        <p>Web Developer</p>
                                        <i class="far fa-edit mb-5"></i>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body p-4">
                                            <h6>Information</h6>
                                            <hr class="mt-0 mb-4" />
                                            <div class="row pt-1">
                                                <div class="col-6 mb-3">
                                                    <h6>email</h6>
                                                    <p class="text-muted">{showProfileData[0]?.email}</p>
                                                </div>
                                                <div class="col-6 mb-3">
                                                    <h6>Phone</h6>
                                                    <p class="text-muted">{showProfileData[0]?.phoneNumber}</p>
                                                </div>
                                            </div>
                                            <h6>Projects</h6>
                                            <hr class="mt-0 mb-4" />
                                            <div class="row pt-1">
                                                <div class="col-6 mb-3">
                                                    <h6>Recent</h6>
                                                    <p class="text-muted">Lorem ipsum</p>
                                                </div>
                                                <div class="col-6 mb-3">
                                                    <h6>Most Viewed</h6>
                                                    <p class="text-muted">Dolor sit amet</p>
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-start">
                                                <a href="#!"><i class="fab fa-facebook-f fa-lg me-3"></i></a>
                                                <a href="#!"><i class="fab fa-twitter fa-lg me-3"></i></a>
                                                <a href="#!"><i class="fab fa-instagram fa-lg"></i></a>
                                            </div>
                                        </div>
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

export default UserProfile
