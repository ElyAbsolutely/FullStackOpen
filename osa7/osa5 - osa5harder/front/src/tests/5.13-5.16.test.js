import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Blog from "../components/Blog"
import CreateBlog from "../components/CreateBlog"

const blog = {
    title: "The coolest title",
    author: "Daniel",
    url: "www.dasite.com",
    likes: 201,
    user: {
        username: "Daveyyy",
        id: "624efa6cb9dd4950f1a017c0"
    },
    id: "123"
}

/*function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time))
}*/

describe("Project tests", () => {

    let container

    beforeEach(() => {
        container = render(
            (<Blog blog={blog} />)
        ).container
    })

    test("5.13", () => {
        const title = screen.getByText("The coolest title")
        expect(title).not.toHaveStyle("display: none")

        const div = container.querySelector(".initiallyHiddenPost")
        expect(div).toHaveStyle("display: none")
    })

    /*test("5.14", () => {
         const button = screen.getByText("Show")
         userEvent.click(button)

         const title = screen.getByText("The coolest title")
         expect(title).not.toHaveStyle("display: none")

         const div = container.querySelector(".initiallyHiddenPost")
         expect(div).not.toHaveStyle("display: none")
    })*/

    //???????????????
    //Testit ei mene läpi jos ei odota pientä hetkeä userEvent.click() tekiessä
    //async await riittää

    test("5.14 v2", async () => {
        const button = screen.getByText("Show")
        await userEvent.click(button)

        /*await delay(1000).then(() =>
            console.log("Ran after 1 second has passed")
        )*/

        const title = screen.getByText("The coolest title")
        expect(title).not.toHaveStyle("display: none")

        const div = container.querySelector(".initiallyHiddenPost")
        expect(div).not.toHaveStyle("display: none")
    })

})

describe("Project tests 02", () => {

    test("5.15", async () => {
        const mockHandler = jest.fn()

        render(<Blog blog={blog} actionLike={mockHandler} />)

        const button = screen.getByText("Like +1")
        await userEvent.click(button)
        await userEvent.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })

    test("5.16", async () => {
        const createBlog = jest.fn()

        render(<CreateBlog action={createBlog} />)

        const inputs = screen.getAllByRole("textbox")

        console.log(inputs)

        const values = [
            "Testing form title...",
            "Testing form author...",
            "Testing form url..."
        ]

        await userEvent.type(inputs[0], values[0])
        await userEvent.type(inputs[1], values[1])
        await userEvent.type(inputs[2], values[2])

        //Kirjoittaa vain ekan kirjaimen
        //Tarvii myös async await

        const sendButton = screen.getByText("Post")
        await userEvent.click(sendButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe(values[0])
        expect(createBlog.mock.calls[0][0].author).toBe(values[1])
        expect(createBlog.mock.calls[0][0].url).toBe(values[2])
        expect(createBlog.mock.calls[0][0].likes).toBe(undefined)
    })

})