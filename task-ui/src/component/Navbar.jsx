import React, { useState, useContext, useEffect } from 'react';
// Initialization for ES Users
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import AuthContext from '../context/AuthProvider';
import UserProfile from './UserProfile';
import axios from "../api/axios"
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LOGOUT_USER = "/logout"

const Navbar = () => {
    const [errMsg, setErrMsg] = useState('');
    const { isLogin, setIsLogin } = useContext(AuthContext);


    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        initMDB({ Dropdown, Collapse })
    }, []);


    const from = "/";

    const handleLogoutReq = async () => {
        localStorage.setItem(
            "email",
            JSON.stringify({ "email": null, password: null, "accessToken": null })
        );

        alert("You have been logged oot!!!");
        setIsLogin(false);
        navigate(from, { replace: true });

    }

    const { auth, setAuth, currentComponent, setCurrentComponent } = useContext(AuthContext);
    return (
        <>
            <nav class="navbar navbar-expand-lg nav-bg-color ">
                <div class="container-fluid ">
                    <button
                        data-mdb-collapse-init
                        class="navbar-toggler"
                        type="button"
                        data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i class="fas fa-bars"></i>
                    </button>

                    <div class="collapse navbar-collapse " id="navbarSupportedContent" >
                        <a class="navbar-brand mt-2 mt-lg-0" href="/">
                            {/* <img
                                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                                height="15"
                                alt="MDB Logo"
                                loading="lazy"
                            /> */}
                            Task Management
                        </a>
                        {/* <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="/login">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/register">Register</a>
                            </li>
                        </ul> */}
                    </div>

                    {!isLogin ?
                        <div class="d-flex align-items-center">
                            <a class="link-secondary me-3" href="/login">
                                <img
                                    src="images/img10.jpg"
                                    class="rounded-circle"
                                    height="25"
                                    alt="Black and White Portrait of a Man"
                                    loading="lazy"
                                />
                            </a>
                        </div>
                        :

                        <div class="d-flex align-items-center">
                            <a class="link-secondary me-3" href="#">
                                <i class="fas fa-shopping-cart"></i>
                            </a>

                            <div class="dropdown">
                                <a
                                    data-mdb-dropdown-init
                                    class="dropdown-toggle d-flex align-items-center hidden-arrow"
                                    href="/"
                                    id="navbarDropdownMenuAvatar"
                                    role="button"
                                    aria-expanded="false"
                                >
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                        class="rounded-circle"
                                        height="25"
                                        alt="Black and White Portrait of a Man"
                                        loading="lazy"
                                    />
                                </a>
                                <ul
                                    class="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="navbarDropdownMenuAvatar"
                                >
                                    <li>
                                        <a class="dropdown-item" onClick={() => setCurrentComponent(<UserProfile />)}>My profile</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">Settings</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" onClick={handleLogoutReq}>Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar
