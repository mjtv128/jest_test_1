const supertest = require('supertest')

const host = 'http://localhost:3000'
const request = supertest(host)

//create test suite 
//then create indisvidual 

//BDD
//create mocked user array = to use in test suite 
const mock = [{
        id: 1,
        name: "jane smith",
        email: "j@yahoo.com",
        department: "marketing"
    },
    {
        id: 2,
        name: "harry brown",
        email: "harry@yahoo.com",
        department: "operations"
    }
];

describe('Users API test suite', () => {
    it('should get all users', async() => {
        const response = await request.get('/users')

        // console.log(response.body)
        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeNull();
        expect(response.body).toEqual(mock);
    });

    it('should get a single user by id', async() => {
        const response = await request.get('/users/2')

        expect(response.statusCode).toBe(200)
        expect(response.body[0].name).toContain("harry");
        expect(response.body[0].department).toEqual("operations");
    });

    it('should create user', async() => {
        const users = await request.get('/users')
        const countBefore = users.body.length

        const response = await request.post('/users').send({
            name: 'ivan',
            email: 'ivan@ga',
            department: 'research'
        })

        expect(response.statusCode).toBe(201);
        expect(response.body.length).toBe(countBefore + 1)



    })
})