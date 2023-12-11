import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import React, { useState, useContext, useEffect, useRef } from 'react';;


const UpdateTask = (props) => {
    const errRef = useRef();
    const descriptionRef = useRef();
    const completedRef = useRef();

    const { auth, setAuth, currentComponent, setCurrentComponent } = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');
    const [description, setDescription] = useState(props.task?.description);
    const [completed, setCompleted] = useState(props.task?.completed);



    const navigate = useNavigate();
    const location = useLocation();


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const UPDATE_TASK = `/task/${props.task?.taskId}`;

            const response = await axios.put(UPDATE_TASK, {
                "description": description,
                "completed": completed
            },
                {
                    headers: { Authorization: auth.accessToken }
                }
            );

            alert("Task has been Updated!!");
            // navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            }
            else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unautherized');
            }
            else {
                setErrMsg('You are not login, Login first...');
            }

            // errRef.current.focus();
        }
    }

    return (
        <>
            <div class="page-content row  d-flex  align-items-center h-100">
                <section className='col-4 d-flex justify-content-center align-items-center'>
                    <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live='assertive' >
                        {errMsg}
                    </p>
                </section>

                <div class="header col-4 d-flex justify-content-center align-items-center" >Update Task </div>
                <div className='col-4'>

                    <form onSubmit={handleSubmit} class="row d-flex justify-content-center align-items-center">
                        <div className="mb-3">
                            <label
                                className="form-label">
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                name="task"
                                ref={descriptionRef}
                                onChange={(e) => setDescription(e.target.value)}
                                defaultValue={props.task?.description}
                                value={description}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                id="html"
                                type="checkbox"
                                defaultChecked={props.task?.completed}
                                ref={completedRef}
                                onChange={(e) => setCompleted(e.target.checked)}
                                value={completed}
                            />
                            <label for="html"> 	&ensp;Completed </label>
                        </div>
                        <button className='col-4 btn btn-primary btn-lg btn-block'
                            type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateTask
