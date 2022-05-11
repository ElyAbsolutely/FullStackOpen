const Notification = ({ n }) => {
    const style = {
        border: "solid",
        padding: 10,
        borderWidth: 1
    }

    if (n === "")
        return null

    return <div style={style}>{n}</div>
}

export default Notification