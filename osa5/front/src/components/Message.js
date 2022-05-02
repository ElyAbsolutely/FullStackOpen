import React from "react"
const Message = (props) => {
    if (props.message[0] === 0)
        return null
    else if (props.message[0] === 1)
        return (
            <div>
                <p style={{ color: "green" }}>{props.message[1]}</p>
            </div>
        )
    else if (props.message[0] === 2)
        return (
            <div>
                <p style={{ color: "red" }}>{props.message[1]}</p>
            </div>
        )
}

export default Message