const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require("../index"); // Replace with the actual path to your server file

const User = require('../model/User'); // Adjust the path based on your application structure
const Task = require('../model/Task'); // Adjust the path based on your application structure

chai.use(chaiHttp);

describe(`------------------------ Task Test Suite for Authenticate User------------------ `, function () {
    this.timeout(5000);

    let loginResponse;
    let accessToken;
    let taskId;

    let taskData = {
        description: 'This is my todays Task',
        completed: false
    };

    it('Should show task for authenticated user', async function () {
        loginResponse = await chai.request(server)
            .post('/user/login')
            .send({
                email: 'vishal@gmail.com',
                password: 'vishal@123'
            });

        accessToken = loginResponse.body.data.accessToken;
        // console.log(accessToken);

        const taskResponse = await chai.request(server)
            .get('/user/auth/showtask')
            .set('Authorization', `${accessToken}`);


        chai.expect(taskResponse.status).to.equal(200);

    });

    it('Should create task for authenticated user', async function () {
        const response = await chai.request(server)
            .post('/user/auth/createtask')
            .set('Authorization', `${accessToken}`)
            .send(taskData);


        const result = await Task.findOne({ description: taskData.description });
        taskId = result._id.toHexString();

        chai.expect(response.status).to.equal(201);

    });

    it('Should update task for authenticated user', async function () {

        taskData = {
            description: "This is my updated task!",
            completed: true
        }

        const response = await chai.request(server)
            .put(`/user/auth/update/${taskId}`)
            .set('Authorization', `${accessToken}`)
            .send(taskData);


        chai.expect(response.status).to.equal(201);

    });

    after(async () => {
        try {
            const result = await Task.deleteOne({ description: taskData.description });
            if (result.deletedCount > 0) {
                console.log("       Task deleted after all task-tests have completed!");
            } else {
                console.log("       No task found to delete after tests.");
            }
        }
        catch (error) {
            console.log(error.message);
        }
    });

});
