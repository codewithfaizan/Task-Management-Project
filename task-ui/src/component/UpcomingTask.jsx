import React, { useEffect, useState, useContext} from 'react'
import UpcomingTaskData from './UpcomingTaskData';
import AuthContext from '../context/AuthProvider';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';


const PENDING_TASK = "/task/pending"

const UpcomingTask = () => {
    const { auth} = useContext(AuthContext);
    const [allPendingTaskData, setAllPendigTaskData] = useState([]);
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const loginFrom = "/login";

    useEffect(() => {
        async function getPendingData() {
            try {
                const response = await axios.get(PENDING_TASK, {
                    headers: { Authorization: auth.accessToken }
                });

                // Set the response data in state
                setAllPendigTaskData(response.data?.pendingTask);
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

        getPendingData();
    }, [])

    return (
        <>
            <div class="page-content">
                <div class="header upcoming">Upcoming Tasks</div>
                <div class="tasks-wrapper">
                    {allPendingTaskData.map((item) => (
                        <UpcomingTaskData
                            taskId={item._id}
                            description={item.description}
                            status={item.completed}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default UpcomingTask
