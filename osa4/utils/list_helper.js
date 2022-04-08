const dummy = (blogs) => {

    blogs = 1
    return blogs

}

const totalLikes = (blogs) => {

    if (blogs.length === 0)
        return 0

    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    var best = blogs[0]

    for (let x = 1; x < blogs.length; x++) {
        var test = blogs[x]

        if (test.likes > best.likes)
            best = test
    }

    return best
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0)
        return 0

    var list = []

    list.push({ author: blogs[0].author, blogs: 1 })

    for (let x = 1; x < blogs.length; x++) {
        var test = blogs[x]

        var found = false

        for (let x = 0; x < list.length; x++) {
            if (list[x].author === test.author) {
                found = true
                list[x].blogs++
            }
        }

        if (found === false)
            list.push({ author: test.author, blogs: 1 })
    }

    var best = list[0]

    for (let x = 1; x < list.length; x++) {
        var testTwo = list[x]

        if (testTwo.blogs > best.blogs)
            best = testTwo
    }

    return best
}

const mostLikes = (blogs) => {
    if (blogs.length === 0)
        return 0

    var list = []

    list.push({ author: blogs[0].author, likes: blogs[0].likes })

    for (let x = 1; x < blogs.length; x++) {
        var test = blogs[x]

        var found = false

        for (let x = 0; x < list.length; x++) {
            if (list[x].author === test.author) {
                found = true
                list[x].likes += test.likes
            }
        }
        if (found === false)
            list.push({ author: test.author, likes: test.likes })
    }

    var best = list[0]

    for (let x = 1; x < list.length; x++) {
        var testTwo = list[x]

        if (testTwo.likes > best.likes)
            best = testTwo
    }

    return best
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}