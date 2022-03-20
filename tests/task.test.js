const path = require('path');
const request = require('supertest');
const app = require(path.resolve('src/app'));
const Task = require(path.resolve('src/models/task'));
const {testUser,testUserId,setupDatabase} = require(path.resolve('tests/fixtures','db'));

beforeEach(setupDatabase);

test('Should create a task for user',async ()=>{
    const response = await request(app).post('/tasks')
                    .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
                    .send({
                        description: 'Watch formula one'
                    });
    expect(response.status).toBe(201);
    //Assert the task description stored in the database is same as we set
    const task = await Task.findById(response.body._id);
    expect(task.description).not.toBeNull();
    expect(task.completed).toEqual(false);
})