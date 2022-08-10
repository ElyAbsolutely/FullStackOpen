import { MyProps } from "../types";

const Total = ({ courseParts }: MyProps) => (
    <p>
        <b>Number of exercises: {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</b>
    </p>
)

export default Total;