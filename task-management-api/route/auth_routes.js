const auth_routes = require("express").Router();
const { loginReq, logOutReq } = require("../controller/userController");
const { taskValidator } = require("../middleware/validation");

// Autherization Middleware
const { verifyJWT } = require("../middleware/validation");


const {
    showTaskCache,
    taskWithIdCache,
    getPendingTaskCache,
    getCompletedTaskCache
} = require("../middleware/redisCache");

const {
    showTask,
    createTask,
    taskWithId,
    updateTask,
    deleteTask,
    getPendingTask,
    getCompletedTask
} = require("../controller/taskControlller");



auth_routes.use(verifyJWT);

// ##### Task Routes #############

auth_routes.get("/showall",
    // showTaskCache,
    showTask);

auth_routes.post("/createnew",
    taskValidator,
    createTask
);

auth_routes.get("/pending",
    // getPendingTaskCache,
    getPendingTask);

auth_routes.get("/complete",
    // getCompletedTaskCache,
    getCompletedTask);

auth_routes.get("/:id",
    // taskWithIdCache,
    taskWithId);


auth_routes.put("/:id",
    taskValidator,
    updateTask
);


auth_routes.delete("/:id", deleteTask);


module.exports = auth_routes;