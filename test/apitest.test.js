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
    jest.setTimeout(10000)
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

    it('should update a single user by id', async() => {
        const response = await request.patch("/users/1").send({
            department: 'design'
        })

        expect(response.statusCode).toBe(200)
            // expect(response.body.user.department).toEqual('design')

    });

    it('should delete a single user by id', async() => {
        const response = await request.delete('/users/1')

        expect(response.statusCode).toBe(200)

        response.body.users.forEach(user => {
            if (user.name === "jane smith") {
                throw new Error("user was not delete successfully")
            }
        })
    })

    it("should delete a single user by id", async() => {
        const response = await request.delete("/users/1");

        expect(response.statusCode).toBe(200);

        response.body.users.forEach(user => {
            if (user.name === "jane smith") {
                throw new Error("user was not delete successfully");
            }
        });
    });

    it("should return 404 getting user", async() => {
        const response = await request.get("/users/x");

        expect(response.statusCode).toBe(404);

    })

    it("should return 404 updating user", async() => {
        const response = await request.patch("/users/x").send({
            department: 'design'
        });

        expect(response.statusCode).toBe(404);
    });

    it("should return 404 creating user", async() => {
        const response = await request.post("/users").send({
            abcd: 'blah'
        });

        expect(response.statusCode).toBe(400);
    });

    it("should return 404 deleting user", async() => {
        const response = await request.delete("/users/x");

        expect(response.statusCode).toBe(404);
    });



})