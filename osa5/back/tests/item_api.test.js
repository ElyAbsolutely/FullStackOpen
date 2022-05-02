const mongoose = require("mongoose")
const supertest = require("supertest")
const bcrypt = require("bcrypt")
const app = require("../app")
const api = supertest(app)
const helper = require("./test_helper")
const arrays = require("./test_arrays")
const Blog = require("../models/blog")
const User = require("../models/user")

const startOverBlog = () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(arrays.initialBlogs)
    })
}

describe("Test /api/blogs jsons", () => {
    startOverBlog()

    test("Blogs are returned as json", async () => {
        await api.get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("All sent blogs are returned", async () => {
        const response = await api.get("/api/blogs")

        expect(response.body).toHaveLength(arrays.initialBlogs.length)
    })

    test("One of the returned blog titles is HTML is hard", async () => {
        const response = await api.get("/api/blogs")

        const titles = response.body.map(r => r.title)

        expect(titles).toContain("HTML is hard")
    })
})

describe("Posting blogs", () => {
    startOverBlog()

    test("Empty blog is not added", async () => {
        await api
            .post("/api/users")
            .send(arrays.newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const receiver = await api
            .post("/api/login")
            .send(arrays.newUserLogin)

        const newBlog = {}

        await api
            .post("/api/blogs")
            .send(newBlog)
            .set("Authorization", "bearer " + receiver._body.token)
            .expect(400)

        const response = await api.get("/api/blogs")

        expect(response.body).toHaveLength(arrays.initialBlogs.length)
    })

    test("Succesfully added a blog", async () => {
        const receiver = await api
            .post("/api/login")
            .send(arrays.newUserLogin)

        await api
            .post("/api/blogs")
            .send(arrays.newBlog)
            .set("Authorization", "bearer " + receiver._body.token)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const response = await api.get("/api/blogs")

        const titles = response.body.map(r => r.title)

        expect(titles).toContain("Test")
    })
})

describe("Finding and deleting blogs by ID", () => {
    startOverBlog()

    test("A specific blog can be viewed using ID", async () => {
        const startBlogs = await helper.blogsInDb()
        const blogToView = startBlogs[0]

        const returnedBlog = await api
            .get("/api/blogs/" + blogToView.id)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        const processedNoteToView = JSON.parse(JSON.stringify(blogToView))

        expect(returnedBlog.body).toEqual(processedNoteToView)
    })

    test("A specific blog can be deleted using ID", async () => {
        const receiver = await api
            .post("/api/login")
            .send(arrays.newUserLogin)

        const blogReveiver = await api
            .post("/api/blogs")
            .send(arrays.newBlog)
            .set("Authorization", "bearer " + receiver._body.token)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const startBlogs = await helper.blogsInDb()

        await api
            .delete("/api/blogs/" + blogReveiver._body.id)
            .set("Authorization", "bearer " + receiver._body.token)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            startBlogs.length - 1
        )

        const titles = blogsAtEnd.map(r => r.title)

        expect(titles).not.toContain(blogReveiver._body.title)
    })

    test("A specific blog can be revalueted using ID - likes only", async () => {
        const startBlogs = await helper.blogsInDb()
        const blogToPut = startBlogs[0]

        await api
            .put("/api/blogs/" + blogToPut.id)
            .send(arrays.likesOnlyBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        const likess = blogsAtEnd.map(r => r.likes)

        expect(likess).toContain(arrays.likesOnlyBlog.likes)
    })

    test("Fails with statuscode 400 if ID is invalid .GET", async () => {
        var invalidId = "5a3d5da59070081a82a3445"

        await api
            .get("/api/blogs/" + invalidId)
            .expect(400)
    })

    test("Fails with statuscode 400 if ID is invalid .PUT", async () => {
        var invalidId = "5a3d5da59070081a82a3445"

        await api
            .put("/api/blogs/" + invalidId)
            .send(arrays.newBlog)
            .expect(400)
    })
})

describe("External tests", () => {
    startOverBlog()

    test("Returned blog has an id, not _id", async () => {
        const response = await api.get("/api/blogs")

        const ids = response.body.map(r => r.id)

        expect(ids).toBeDefined()
    })

    test("Posting a blog without likes gives zero by default", async () => {
        const receiver = await api
            .post("/api/login")
            .send(arrays.newUserLogin)

        await api
            .post("/api/blogs")
            .send(arrays.likelessBlog)
            .set("Authorization", "bearer " + receiver._body.token)
            .expect(201)

        const response = await api.get("/api/blogs")

        expect(response.body[2].title).toEqual("Give likes plez")
        expect(response.body[2].likes).toEqual(0)
    })

    test("Blog with only author is not added", async () => {
        const receiver = await api
            .post("/api/login")
            .send(arrays.newUserLogin)

        await api
            .post("/api/blogs")
            .send(arrays.authorOnlyBlog)
            .set("Authorization", "bearer " + receiver._body.token)
            .expect(400)

        const response = await api.get("/api/blogs")

        expect(response.body).toHaveLength(arrays.initialBlogs.length)
    })

    test("Posting a blog without authorization gives 401", async () => {
        await api
            .post("/api/blogs")
            .send(arrays.newBlog)
            .expect(401)
    })
})

const startOverUser = () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash("sekret", 10)
        const user = new User({ username: "Mister man", passwordHash })
        await user.save()
    })
}

describe("When there is initially one user at db", () => {
    startOverUser()

    test("Creation succeeds with a fresh username", async () => {
        const usersAtStart = await helper.usersInDb()

        await api
            .post("/api/users")
            .send(arrays.newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(arrays.newUser.username)
    })

    test("Creation fails if username is already taken", async () => {
        const usersAtStart = await helper.usersInDb()

        const result = await api
            .post("/api/users")
            .send(arrays.sameUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)

        expect(result.body.error).toContain("Username is already used")

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})