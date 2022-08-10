import React from "react";

import { OtherThing } from "../types";

const Part: React.FC<OtherThing> = ({ part }) => {
    switch (part.type) {
        case "normal":
            return (
                <div>
                    <h2>{part.name} {part.exerciseCount}</h2>
                    {part.description}
                </div>
            )
        case "groupProject":
            return (
                <div>
                    <h2>{part.name} {part.exerciseCount}</h2>
                    Group projects: {part.groupProjectCount}
                </div>
            )
        case "submission":
            return (
                <div>
                    <h2>{part.name} {part.exerciseCount}</h2>
                    {part.description}<br />
                    <a href="url">{part.exerciseSubmissionLink}</a>
                </div>
            )
        case "special":
            return (
                <div>
                    <h2>{part.name} {part.exerciseCount}</h2>
                    {part.description}<br />
                    Required skills:{part.requirements.map((skill) => {
                        return " " + skill;
                    })}
                </div>
            )
        default:
            return null;
    }
}

export default Part