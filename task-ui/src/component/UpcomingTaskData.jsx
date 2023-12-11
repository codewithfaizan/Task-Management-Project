import React from 'react'

const UpcomingTaskData = (props) => {
    
    return (
        <div class="task">
            <input class="task-item" name="task" type="checkbox" id={props?.taskId} />
            <label htmlFor={props?.taskId}>
                <span class="label-text">{props.description}</span>
            </label>
            <span class={props.status ? "tag completed" : "tag pending"}>{props.status ? "pending" : "pending"}</span>
        </div>
    )
}

export default UpcomingTaskData
