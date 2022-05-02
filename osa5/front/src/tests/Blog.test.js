import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "../components/Blog"

const blog = {
    title: "Component testing is done with react-testing-library",
    author: "James",
    url: "www.hello.com",
    likes: 200,
    user: {
        username: "Daveyyy",
        id: "624efa6cb9dd4950f1a017c0"
    },
    id: "123"
}

describe("Tutorial tests", () => {

    test("Renders blog.title", () => {
        const { container } = render(<Blog blog={blog} />)
        screen.debug()

        const div = container.querySelector(".blog")
        expect(div).toHaveTextContent(
            "Component testing is done with react-testing-library"
        )

        const element = screen.getByText(
            "Component testing is done with react-testing-library"
        )
        screen.debug(element)
        expect(element).toBeDefined()
    })

    test("mockHandler", async () => {
        const mockHandler = jest.fn()

        render(
            <Blog blog={blog}
                actionLike={mockHandler}
                actionDelete={mockHandler}
                activeUsername={"Daveyyy"}
                key={"123"} />
        )

        const button01 = screen.getByText("Like +1")
        screen.debug(button01)
        await userEvent.click(button01)

        const button02 = screen.getByText("Delete")
        screen.debug(button02)
        await userEvent.click(button02)

        console.log(mockHandler)

        expect(mockHandler.mock.calls).toHaveLength(1)

        //eh?
    })

})