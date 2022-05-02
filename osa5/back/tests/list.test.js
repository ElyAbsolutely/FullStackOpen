const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require("../utils/list_helper")

const blogs = [{
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Not important guy",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 12,
    __v: 0
}, {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 10,
    __v: 0
}, {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 4,
    __v: 0
}, {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Samuel",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 4,
    __v: 0
}]

const blog = [{
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
}]

const emptyBlog = []

test("Dummy returns one", () => {
    const result = dummy(blogs)

    expect(result).toBe(1)
})

describe("Like counter", () => {
    test("Count likes of empty", () => {
        const result = totalLikes(emptyBlog)

        expect(result).toBe(0)
    })
    test("Count likes of one", () => {
        const result = totalLikes(blog)

        expect(result).toBe(5)
    })
    test("Count all likes", () => {
        const result = totalLikes(blogs)

        expect(result).toBe(30)
    })
})

test("Best post", () => {
    const result = favoriteBlog(blogs)

    expect(result).toEqual(blogs[0])
})

test("Author with most blogs", () => {
    const result = mostBlogs(blogs)

    expect(result.author).toBe("Edsger W. Dijkstra")
    expect(result.blogs).toBe(2)
})

test("Author with most likes from all blogs", () => {
    const result = mostLikes(blogs)

    expect(result.author).toBe("Edsger W. Dijkstra")
    expect(result.likes).toBe(14)
})