const client = require("../redis/client");

async function showTaskCache(req, res, next) {
    try {
        const user_id = req.user._id;
        const data = await client.get(`${user_id}alltask`);
        if (data) {
            return res.status(200).send({ "All Tasks": JSON.parse(data) });
        }
        else {
            next();
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
}

async function taskWithIdCache(req, res, next) {
    try {
        const user_id = req.user._id;
        const data = await client.get(`${user_id}taskWithId`);
        if (data) {
            return res.status(200).send({ "Task": JSON.parse(data) });
        }
        else {
            next();
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
}

async function getPendingTaskCache(req, res, next) {
    try {
        const user_id = req.user._id;
        const data = await client.get(`${user_id}pendingtask`);
        if (data) {
            return res.status(200).send({ "Task": JSON.parse(data) });
        }
        else {
            next();
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
}

async function getCompletedTaskCache(req, res, next) {
    try {
        const user_id = req.user._id;
        const data = await client.get(`${user_id}completedtask`);
        if (data) {
            return res.status(200).send({ "Task": JSON.parse(data) });
        }
        else {
            next();
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
}


module.exports = {
    showTaskCache,
    taskWithIdCache,
    getPendingTaskCache,
    getCompletedTaskCache
};