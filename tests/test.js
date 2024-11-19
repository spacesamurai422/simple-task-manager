const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

let testTaskId;

describe('Tasks API test', () => {
    it('should create new task', async () => {
        const newTask = {
            title: 'This is a test task',
            description: 'This is the test description',
            status: 0
        };

        const response = await chai.request(app).post('/tasks').send(newTask);
        testTaskId = response.body.TaskID;

        // Assert for the POST request
        chai.expect(response).to.have.status(201);
        chai.expect(response.body).to.have.property('TaskID');
    })

    it('should fetch all tasks', async () => {
        const response = await chai.request(app).get('/tasks');

        // Assert for the GET request
        chai.expect(response).to.have.status(200);
        chai.expect(response.body).to.be.an('array');
        chai.expect(response.body.length).to.be.at.least(1);
    })

    it('should fetch task by id', async () => {
        const response = await chai.request(app).get(`/tasks/${testTaskId}`);

        // Assert for the GET request
        chai.expect(response).to.have.status(200);
    })

    it('should update task', async () => {
        const updatedTask = {
            title: 'This is the updated task',
            description: 'This is the test description',
            status: 1
        };

        const response = await chai.request(app).put(`/tasks/${testTaskId}`).send(updatedTask);

        // Assert for the PUT request
        chai.expect(response).to.have.status(200);
    })

    it('should delete task', async () => {
        const response = await chai.request(app).delete(`/tasks/${testTaskId}`);

        // Assert for the DELETE request
        chai.expect(response).to.have.status(200);
    })

});