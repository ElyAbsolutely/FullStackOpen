import React from "react";

import { ArrayThing } from "../types";
import { assertNever } from "../utils";
import Part from "./Part"

const Content: React.FC<ArrayThing> = ({ courseParts }) => {
    const parts = courseParts.map((part) => {
        switch (part.type) {
            case "normal":
                return <Part part={part} />;
            case "groupProject":
                return <Part part={part} />;
            case "submission":
                return <Part part={part} />;
            case "special":
                return <Part part={part} />;
            default:
                return assertNever(part);
        }
    })

    return <React.Fragment>{parts}</React.Fragment>;
}

export default Content;