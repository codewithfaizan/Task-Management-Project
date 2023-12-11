const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description:{
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
    
}, {timestamps: true});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;