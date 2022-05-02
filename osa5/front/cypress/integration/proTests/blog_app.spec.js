const user = {
    name: "Matti Luukkainen",
    username: "mluukkai",
    password: "salainen"
}

const faultyUser = {
    name: "Cyberdyne Systems Model 101 (Codename: Arnold Schwarzenegger)",
    username: "Terminator T-800",
    password: "iWantAllYourUserAccounts"
}

const blog = {
    title: "The Juiciest Baked Chicken Thighs",
    author: "Stephanie",
    url: "https://iamafoodblog.com/baked-chicken-thighs/",
    likes: 14
}

describe("Beginning", function () {

    beforeEach(function () {
        cy.visit("http://localhost:3001/")
    })

    describe("5.17", function () {

        it("Front page can be opened", function () {
            console.log(cy) //For science
            cy.contains("blogs")
        })

        it("Login form can be opened", function () {
            cy.contains("Login as user").click()
            cy.contains("Please log in")
        })

    })

})

describe("Advanced", function () {

    beforeEach(function () {
        cy.request("POST", "http://localhost:3001/api/cleaner/reset")

        cy.request("POST", "http://localhost:3001/api/users/", user)

        cy.visit("http://localhost:3001/")
    })

    describe("5.18", function () {

        it("User can login and logout", function () {
            cy.contains("Login as user").click()
            cy.get("#inputLoginUsername").type(user.username)
            cy.get("#inputLoginPassword").type(user.password)
            cy.get("#loginSubmit").click()
            cy.contains("Logged in as " + user.name)
            cy.contains("Logout").click()
            cy.contains("Login as user")
        })

        it("Wrong login credentials won´t log you in", function () {
            cy.contains("Login as user").click()
            cy.get("#inputLoginUsername").type(faultyUser.username)
            cy.get("#inputLoginPassword").type(faultyUser.password)
            cy.get("#loginSubmit").click()
            cy.contains("Wrong username or password")
                .and("have.css", "color", "rgb(255, 0, 0)")
        })

    })

    describe("5.19", function () {

        beforeEach(function () {
            cy.contains("Login as user").click()
            cy.get("#inputLoginUsername").type(user.username)
            cy.get("#inputLoginPassword").type(user.password)
            cy.get("#loginSubmit").click()
        })

        it("Logged user can create a blog", function () {
            cy.contains("Post a Blog").click()
            cy.get("#postBlogInputTitle").type(blog.title)
            cy.get("#postBlogInputAuthor").type(blog.author)
            cy.get("#postBlogInputUrl").type(blog.url)
            cy.get("#postBlogInputLikes").type(blog.likes)
            cy.get("#postBlogSubmit").click()
            cy.contains("New blog: " + blog.title + " by " + blog.author + " added")
        })

    })

    describe("5.20 - 5.21", function () {

        beforeEach(function () {
            cy.contains("Login as user").click()
            cy.get("#inputLoginUsername").type(user.username)
            cy.get("#inputLoginPassword").type(user.password)
            cy.get("#loginSubmit").click()
            cy.contains("Post a Blog").click()
            cy.get("#postBlogInputTitle").type(blog.title)
            cy.get("#postBlogInputAuthor").type(blog.author)
            cy.get("#postBlogInputUrl").type(blog.url)
            cy.get("#postBlogInputLikes").type(blog.likes)
            cy.get("#postBlogSubmit").click()
            cy.contains("Logout").click()
        })

        it("A blog can be liked ", function () {
            cy.contains("Show").click()
            cy.contains("Like +1").click()
            cy.contains("Likes: " + 15)
            cy.contains("Like +1").click()
            cy.contains("Like +1").click()
            cy.contains("Like +1").click()
            cy.contains("Likes: " + 18)
        })

        it("A blog cannot be deleted by any other user...", function () {
            cy.contains("Show").click()
            cy.contains("Delete").click()
            cy.contains("Something went wrong")
            cy.wait(5000)
            cy.contains(blog.title)
        })

        it("...unlike the poster", function () {
            cy.contains("Login as user").click()
            cy.get("#inputLoginUsername").type(user.username)
            cy.get("#inputLoginPassword").type(user.password)
            cy.get("#loginSubmit").click()
            cy.contains("Show").click()
            cy.contains("Delete").click()
            cy.contains("Blog deleted")
        })

    })

    describe("5.22", function () {

        it("Blogs are sorted from the most likes to least liked", function () { //Hyvä puhdas koodi
            cy.contains("Login as user").click()
            cy.get("#inputLoginUsername").type(user.username)
            cy.get("#inputLoginPassword").type(user.password)
            cy.get("#loginSubmit").click()

            cy.contains("Post a Blog").click()
            cy.get("#postBlogInputTitle").type("03")
            cy.get("#postBlogInputAuthor").type(blog.author)
            cy.get("#postBlogInputUrl").type(blog.url)
            cy.get("#postBlogInputLikes").type(3)
            cy.get("#postBlogSubmit").click()

            cy.contains("Post a Blog").click()
            cy.get("#postBlogInputTitle").type("01")
            cy.get("#postBlogInputAuthor").type(blog.author)
            cy.get("#postBlogInputUrl").type(blog.url)
            cy.get("#postBlogInputLikes").type(36)
            cy.get("#postBlogSubmit").click()

            cy.contains("Post a Blog").click()
            cy.get("#postBlogInputTitle").type("04")
            cy.get("#postBlogInputAuthor").type(blog.author)
            cy.get("#postBlogInputUrl").type(blog.url)
            cy.get("#postBlogInputLikes").type(1)
            cy.get("#postBlogSubmit").click()

            cy.contains("Post a Blog").click()
            cy.get("#postBlogInputTitle").type("02")
            cy.get("#postBlogInputAuthor").type(blog.author)
            cy.get("#postBlogInputUrl").type(blog.url)
            cy.get("#postBlogInputLikes").type(28)
            cy.get("#postBlogSubmit").click()

            cy.wait(5000)

            cy.contains("01")
            cy.contains("02")
            cy.contains("03")
            cy.contains("04")

            cy.get(".blog:first").contains("01")
            cy.get(".blog:first").contains("Likes: 36")
            cy.get(".blog:last").contains("04")
            cy.get(".blog:last").contains("Likes: 1")

            cy.get(".blog:last").contains("Show").click()
            cy.get(".blog:last").contains("Hide").as("hideButton")
            cy.get(".blog:last").contains("Like +1").as("likeButton")
            cy.get("@likeButton").click()
            cy.wait(100)
            cy.get("@likeButton").click()
            cy.wait(100)
            cy.get("@likeButton").click()
            cy.wait(100)
            cy.get("@likeButton").click()
            cy.wait(100)
            cy.get("@likeButton").click()
            cy.wait(100)
            cy.get("@hideButton").click()
            cy.wait(100)

            cy.get(".blog:first").contains("01")
            cy.get(".blog:first").contains("Likes: 36")
            cy.get(".blog:last").contains("03")
            cy.get(".blog:last").contains("Likes: 3")

            cy.get(".blog")
                .first()
                .should("contain.text", "01")
                .next()
                .should("contain.text", "02")
                .next()
                .should("contain.text", "04")
                .next()
                .should("contain.text", "03")
        })

    })

})