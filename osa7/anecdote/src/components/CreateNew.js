import { useCounterCreateInputs } from "../hooks/index"

const CreateNew = (props) => {
    const inputs = useCounterCreateInputs()

    const handleSubmit = (e) => {
        e.preventDefault()

        inputs.clear()

        props.addNew({
            content: inputs.values.content,
            author: inputs.values.author,
            info: inputs.values.info,
            votes: 0
        })
    }

    return (
        <div>
            <h2>Create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Content
                    <input
                        name="content"
                        value={inputs.values.content}
                        onChange={(e) => inputs.changeContent(e.target.value)} />
                </div>
                <div>
                    Author
                    <input
                        name="author"
                        value={inputs.values.author}
                        onChange={(e) => inputs.changeAuthor(e.target.value)} />
                </div>
                <div>
                    Url for more info
                    <input
                        name="info"
                        value={inputs.values.info}
                        onChange={(e) => inputs.changeInfo(e.target.value)} />
                </div>
                <button type="submit" >Create</button>
            </form>
            <button onClick={() => inputs.clear()}>Clear</button>
        </div>
    )
}

export default CreateNew