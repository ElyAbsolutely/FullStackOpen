import React, { useState } from "react"

const Blog = (props) => {

    const [isShown, setShownState] = useState(false)

    if (props.blog.title === "deletedBlog101") {
        return null
    }

    const hideWhenVisible01 = { display: isShown ? "none" : "" }
    const showWhenVisible01 = { display: isShown ? "" : "none" }

    const toggleVisibility = () => {
        setShownState(!isShown)
    }

    const likeBlog = (event) => {
        event.preventDefault()

        props.actionLike([{
            title: props.blog.title,
            author: props.blog.author,
            url: props.blog.url,
            likes: props.blog.likes + 1
        },
        props.blog.id,
        props.blog.user
        ])
    }

    const deleteBlog = (event) => {
        event.preventDefault()

        if (props.activeUsername === props.blog.user.username) {
            if (window.confirm("Delete blog " + props.blog.title + "?"))
                props.actionDelete(
                    props.blog.id
                )
        } else
            console.log("No access, en jaksa korjata mikä ikinä ongelma ilmesty poisto napin kaa")
    }

    return (
        < div className="blog">
            <h3>{props.blog.title}</h3>
            <div>
                <button style={hideWhenVisible01} onClick={toggleVisibility}>Show</button>
                <button style={showWhenVisible01} onClick={toggleVisibility}>Hide</button>
                <button onClick={deleteBlog}>Delete</button>
            </div>
            <div style={showWhenVisible01} className="initiallyHiddenPost">
                <p>By: {props.blog.author}</p>
                <a href={props.blog.url}>{props.blog.url}</a>
                <p>Likes: {props.blog.likes} <button onClick={likeBlog}>Like +1</button></p>
                <p>Posted by: {props.blog.user.username}</p>
            </div>
        </div >
    )
}

export default Blog