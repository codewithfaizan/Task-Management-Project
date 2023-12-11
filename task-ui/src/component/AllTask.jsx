import React, { useState, useContext, useEffect } from 'react';
import axios from "../api/axios"
import AuthContext from '../context/AuthProvider';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UpdateTask from './UpdateTask';



const AllTask = (props) => {
    const { auth, setAuth, currentComponent, setCurrentComponent } = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();
    const location = useLocation();


    const handleUpdateTask = (event) => {
        const task = {
            description: props.description,
            completed: props?.status ? true : false,
            taskId: props.taskId
        }

        setCurrentComponent(<UpdateTask task={task}/>)
    };



    const handleDeleteTask = async () => {
        try {

            const DELETE_TASK = `/task/${props?.taskId}`

            const response = await axios.delete(DELETE_TASK, {
                headers: { Authorization: auth.accessToken }
            });

            // Set the response data in state
            // console.log(response.data);
            if(response?.data?.title === "Successfull"){
                props.setIsDeletedData(response);
                alert(response?.data?.message);
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
                
            }
            else if (err.response?.status === 400) {
                setErrMsg('You have not any current task yet...');
            } else if (err.response?.status === 401) {
                setErrMsg('Unautherized');
               
            }
            else if (err.response?.status === 403) {
                setErrMsg('User is not logged In');
            }
            else {
                setErrMsg('Login failed');
            }

            // errRef.current.focus();
            // console.log(errMsg);
        }
    }

    return (
        <div class="task">
            <input
                class="task-item"
                name="task"
                type="checkbox"
                checked={props.status}
            />
            <label htmlFor={props?.taskId}>
                <span class="label-text single-line">{props?.description}</span>
            </label>
            <span id={props?.taskId}>
                <span class="tag" onClick={handleUpdateTask}><img class="feather feather-edit" src="svg/edit.svg" alt="" /></span>
                <span class="tag tag-delete" onClick={handleDeleteTask}> <img class="feather feather-trash delete" src="svg/trash.svg" alt="" /></span>
            </span>
        </div>
    )
}

export default AllTask
