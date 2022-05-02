import React, { useState } from "react"
import PropTypes from "prop-types"

const CreateBlog = ({ action }) => {
    const [blogTitle, setBlogTitle] = useState("")
    const [blogAuthor, setBlogAuthor] = useState("")
    const [blogUrl, setBlogUrl] = useState("")
    const [blogLikes, setBlogLikes] = useState("")

    const changeInputBlogTitle = (event) => {
        event.preventDefault()
        setBlogTitle(event.target.value)
    }
    const changeInputBlogAuthor = (event) => {
        event.preventDefault()
        setBlogAuthor(event.target.value)
    }
    const changeInputBlogUrl = (event) => {
        event.preventDefault()
        setBlogUrl(event.target.value)
    }
    const changeInputBlogLikes = (event) => {
        event.preventDefault()
        setBlogLikes(event.target.value)
    }
    const blogForm = (event) => {
        event.preventDefault()

        if (blogLikes === "")
            action({
                title: blogTitle,
                author: blogAuthor,
                url: blogUrl,
                likes: undefined
            })
        else
            action({
                title: blogTitle,
                author: blogAuthor,
                url: blogUrl,
                likes: blogLikes
            })

        setBlogTitle("")
        setBlogAuthor("")
        setBlogUrl("")
        setBlogLikes("")
    }

    return (
        <div>
            <h2>Post a new blog</h2>
            <form onSubmit={blogForm}>
                <div>
                    Title: <input
                        id="postBlogInputTitle"
                        value={blogTitle}
                        onChange={changeInputBlogTitle} />
                </div>
                <div>
                    Author: <input
                        id="postBlogInputAuthor"
                        value={blogAuthor}
                        onChange={changeInputBlogAuthor} />
                </div>
                <div>
                    Url: <input
                        id="postBlogInputUrl"
                        value={blogUrl}
                        onChange={changeInputBlogUrl} />
                </div>
                <div>
                    Likes: <input
                        id="postBlogInputLikes"
                        type="number"
                        value={blogLikes}
                        onChange={changeInputBlogLikes} />
                </div>
                <div>
                    <button id="postBlogSubmit" type="submit">Post</button>
                </div>
            </form>
        </div>
    )
}

CreateBlog.propTypes = {
    action: PropTypes.func.isRequired
}

export default CreateBlog