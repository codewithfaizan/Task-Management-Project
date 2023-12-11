import React, { useState, useContext, useEffect } from 'react';
import axios from "../api/axios"
import AuthContext from '../context/AuthProvider';
import AllTask from './AllTask';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const SHOWALL_TASK = "/task/showall"

const Task = () => {
    const { auth } = useContext(AuthContext);
    const [allTaskData, setAllTaskData] = useState([]);
    const [isDeletedData, setIsDeletedData] = useState('');


    const navigate = useNavigate();
    const location = useLocation();

    const loginFrom = "/login";

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        async function getAllData(){
            try {

                console.log(auth.accessToken);
                const response = await axios.get(SHOWALL_TASK, {
                    headers: { Authorization: auth.accessToken }
                });

                // Set the response data in state
                setAllTaskData(response?.data?.Task);
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
                    navigate(loginFrom, { replace: true });
                }
                else {
                    setErrMsg('Login failed');
                }

                // errRef.current.focus();
                console.log(errMsg);
            }
        }

        getAllData();
    }, [isDeletedData])

    return (
        <>
            <p>{errMsg}</p>
            <div class="page-content">
                <div class="header">Today Tasks</div>

                <div class="content-categories">
                    <div class="label-wrapper">
                        <input class="nav-item" name="nav" type="radio" id="opt-1" checked />
                        <label class="category" htmlFor="opt-1">All</label>
                    </div>
                    <div class="label-wrapper">
                        <input class="nav-item" name="nav" type="radio" id="opt-2" />
                        <label class="category" htmlFor="opt-2">Important</label>
                    </div>
                    <div class="label-wrapper">
                        <input class="nav-item" name="nav" type="radio" id="opt-3" />
                        <label class="category" htmlFor="opt-3">Notes</label>
                    </div>
                    <div class="label-wrapper">
                        <input class="nav-item" name="nav" type="radio" id="opt-4" />
                        <label class="category" htmlFor="opt-4">Links</label>
                    </div>
                </div>

                <div class="tasks-wrapper">
                    {allTaskData?.map((item) => (
                        <AllTask
                            taskId= {item?._id}
                            description={item.description}
                            status={item.completed}
                            isDeletedData = {isDeletedData}
                            setIsDeletedData = {setIsDeletedData}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Task
