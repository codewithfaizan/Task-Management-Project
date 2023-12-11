import React, { useState, useContext, useEffect } from 'react';
import "./style/task.css"
import Task from './Task'
import Login from './Login'
import AuthContext from '../context/AuthProvider';
import CreateTask from './CreateTask';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import UpcomingTask from './UpcomingTask';
import UserProfile from './UserProfile';
import Meeting from './Meeting';





const TaskFrame = () => {
    const { auth, setAuth, currentComponent, setCurrentComponent } = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');
   
  
    const [profileData, setProfileData] = useState([]);

    const [showInbox, setShowInbox] = useState(false);
 
    const [showProfile, setShowProfile] = useState(false);

    const [isShowMeeting, setIsShowMeeting] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const createFrom = location.state?.from?.pathname || "/createtask";
    const loginFrom = "/login";

    const createTask = async () => {
        navigate(createFrom, { replace: true });
    }

    const showPendingTask = async () => {
        // Make a POST request to the SignUp API with formData
        
    };

    return (
        <>
            <div className='task-manager'>
                <div class="left-bar">
                    <div class="left-content">

                        <ul class="action-list">
                            <li class="item">
                                <img class="feather feather-star" src="svg/star.svg" alt="" />
                                <span onClick={() => setCurrentComponent(<CreateTask  />)}>Create</span>
                            </li>
                            <li class="item">
                                <img class="feather feather-inbox" src="../svg/inbox.svg" alt="" />
                                <span onClick={() => setCurrentComponent(<Task  />)}>Inbox</span>
                            </li>
                            <li class="item">
                                <img class="feather feather-calendar" src="svg/calender.svg" alt="" />
                                <span onClick={() => setCurrentComponent(<UpcomingTask/>)}>Upcoming</span>
                            </li>
                            <li class="item">
                                <img class="feather feather-hash" src="svg/hash.svg" alt="" />
                                <span>Important</span>
                            </li>

                            <li class="item">
                                <img class="feather feather-users" src="svg/users.svg" alt="" />
                                <span onClick={() => setIsShowMeeting(!isShowMeeting)}>Meetings</span>
                            </li>
                            {/* <li class="item">
                                <img class="feather feather-trash" src="svg/trash.svg" alt="" />
                                <span>Trash</span>
                            </li> */}
                        </ul>

                        <ul class="category-list">
                            <li class="item">
                                <img class="feather feather-users" src="svg/users.svg" alt="" />
                                <span>Family</span>
                            </li>
                            <li class="item">
                                <img class="feather feather-sun" src="svg/sun.svg" alt="" />
                                <span>Vacation</span>
                            </li>
                            <li class="item">
                                <img class="feather feather-trending-up" src="svg/trending.svg" alt="" />
                                <span>Festival</span>
                            </li>
                            <li class="item">
                                <img class="feather feather-zap" src="svg/zap.svg" alt="" />
                                <span>Concerts</span>
                            </li>
                        </ul>
                    </div>

                    {/* <div class="upper-part">
                        <div class="actions">
                            <div class="circle"></div>
                            <div class="circle-2"></div>
                        </div>
                    </div> */}
                </div>


                {currentComponent}



                {isShowMeeting ? <Meeting/> : ""}
               

            </div>
        </>
    )
}

export default TaskFrame
