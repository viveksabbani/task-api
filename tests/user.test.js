const path = require('path');
const request = require('supertest');
const app = require('../src/app');
const User = require(path.resolve('src/models/user'));
const {testUser,testUserId,setupDatabase} = require(path.resolve('tests/fixtures','db'));

beforeEach(async ()=>{
    await setupDatabase();
})

afterEach(async ()=>{
    // await User.deleteOne({email: 'vsabb@gmail.com'});
})

test('User signup Test',async ()=>{
    const response = await request(app).post('/users').send({name: 'viveksabbani',email: 'sabbanivivek@gmail.com', password: 'tennismaster'});
    expect(response.status).toBe(201);
    //Assert the database has been changed correct
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull();
    //Assert that the data stored in database is same as passed
    expect(response.body).toMatchObject({
        user: {
            name: 'viveksabbani',
            email: 'sabbanivivek@gmail.com'           
        }
    });
})

test('User login test',async()=>{
    const response = await request(app).post('/user/login').send({
        email: 'vsabb@gmail.com',
        password: 'tennismaster123'
    });
    expect(response.status).toBe(200);
})

test('Validate new token is saved',async()=>{
    const response = await request(app).post('/user/login').send({
        email: 'vsabb@gmail.com',
        password: 'tennismaster123'
    });
    expect(response.status).toBe(200);
    const user = await User.findById(testUserId);
    expect(response.body.token).toBe(user.tokens[1].token);
})
test('User login failure',async()=>{
    const response = await request(app).post('/user/login').send({
        email: 'dummy@email.com',
        password: 'dummypassword'
    });
    expect(response.status).toBe(400);
})

test('Get the user profile', async()=>{
    const response = await request(app)
                    .get('/users/me')
                    .set('Authorization',`Bearer ${testUser.tokens[0].token}`)
                    .send();
    expect(response.status).toBe(200);
})

test('Should not get user profile without auth token', async()=>{
    const response = await request(app).get('/users/me').send();
    expect(response.status).toBe(401);
})

test('Delete user account', async()=>{
    const response = await request(app).delete('/users/me')
                    .set('Authorization', `Bearer ${testUser.tokens[0].token}`).send();
    expect(response.status).toBe(200);
    //Assert user is deleted
    const user = await User.findById(testUserId);
    expect(user).toBeNull();
})
test('Should not delete user account without auth token', async()=>{
    const response = await request(app).delete('/users/me').send();
    expect(response.status).toBe(401);
})

test('Should upload user avatar', async()=>{
    const response = await request(app).post('/users/me/avatar')
                    .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
                    .attach('avatar','tests/fixtures/myself.jpg');
    expect(response.status).toBe(200);
    //Assert image uploaded is of data type buffer
    const user = await User.findById(testUserId)
    expect(user.avatar).toEqual(expect.any(Buffer));
})

test('Should update valid user field', async()=>{
    const response = await request(app).patch('/users/me')
                    .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
                    .send({
                        name: 'vicky'
                    });
    expect(response.status).toBe(200);
    //Assert user fields are updated
    const user = await User.findById(testUserId);
    expect(user.name).toBe('vicky');
})

test('Should not update invalid user fields', async()=>{
    const response = await request(app).patch('/users/me')
                    .set('Authorization',`Bearer ${testUser.tokens[0].token}`)
                    .send({
                        location: 'Hyderabad'
                    });
    expect(response.status).toBe(400);
    //Assert location filed is not added/updated
    const user = await User.findById(testUserId);
    expect(user.location).toBeUndefined();
})