import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Togglable from "../components/Togglable"

describe("<Togglable/>", () => {
    let container

    beforeEach(() => {
        container = render(
            <Togglable buttonLabel="Open">
                <div className="testDiv" >
                    togglable content
                </div>
            </Togglable>
        ).container
    })

    test("Renders its children", () => {
        screen.getByText("togglable content")
    })

    test("At start the children are not displayed", () => {
        const div = container.querySelector(".togglableContent")
        expect(div).toHaveStyle("display: none")
    })

    test("After clicking the button, children are displayed", async () => {
        const button = screen.getByText("Open")
        await userEvent.click(button)

        const div = container.querySelector(".togglableContent")
        expect(div).not.toHaveStyle("display: none")
    })
})