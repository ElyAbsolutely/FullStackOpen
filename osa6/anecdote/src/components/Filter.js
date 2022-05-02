import { connect } from "react-redux"

import { setFilter, unsetFilter } from "../reducers/filterReducer"
import { postmanPat } from "../reducers/messageReducer"

const Filter = ({ setFilter, unsetFilter, postmanPat }) => {
    const filter = (event) => {
        event.preventDefault()

        const input = event.target.filter.value
        event.target.filter.value = ""

        setFilter(input)
        postmanPat("Set filter as '" + input + "'", 5)
    }

    const unfilter = (event) => {
        event.preventDefault()

        unsetFilter()
        postmanPat("Unset filter", 5)
    }

    return (
        <div >
            <h3>Filter</h3>
            <form onSubmit={filter}>
                <div>
                    <input name="filter" />
                    <button type="submit">Set filter</button>
                </div>
            </form>
            <button onClick={unfilter}>Unset filter</button>
        </div>
    )
}

const mapDispatchToProps = {
    setFilter,
    unsetFilter,
    postmanPat
}

const ConnectedDispatches = connect(
    null,
    mapDispatchToProps
)(Filter)

export default ConnectedDispatches