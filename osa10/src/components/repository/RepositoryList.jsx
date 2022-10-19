import { useState } from "react"
import { FlatList, StyleSheet } from "react-native"
import { Link } from "react-router-native"
import SelectList from "react-native-dropdown-select-list"
import { Searchbar } from "react-native-paper"
import { useDebounce } from "use-debounce"

import useRepositories from "../../hooks/useRepositories"
import RepositoryItem from "./RepositoryItem"
import ItemSeparator from "../fancyfier/ItemSeperator"
import theme from "../fancyfier/theme"
import CoolioText, { getFont } from "../fancyfier/CoolioText"

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10
    },
    searchContainer: {
        backgroundColor: "white",
        color: "black",
        fontSize: 16,
        fontWeight: "400",
        fontFamily: getFont(),
        borderRadius: 0,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: "black"
    },
    selectContainer: {
        backgroundColor: "white",
        color: "black",
        fontSize: 16,
        fontWeight: "400",
        fontFamily: getFont(),
        borderRadius: 0,
        borderWidth: 1,
        borderColor: "black"
    },
    selectContainerInput: {
        backgroundColor: "white",
        color: "black",
        fontSize: 16,
        fontWeight: "400",
        fontFamily: getFont(),
        borderRadius: 0
    },
    sidelines: {
        paddingRight: 10,
        paddingLeft: 10
    },
    button: {
        borderColor: theme.colors.background,
        borderWidth: 1,
        borderRadius: 5,
        width: "25%",
        margin: 5,
        padding: 10,
        backgroundColor: theme.colors.main
    },
})

const RepositoryLink = ({ item }) => {

    return (
        <Link to={"/list/" + item.id}>
            <RepositoryItem item={item} />
        </Link>
    )
}

const RepositoryList = () => {
    const [order, setOrder] = useState({ orderBy: "CREATED_AT", orderDirection: "DESC" })
    const [search, setSearch] = useState({ searchKeyword: "" })
    const [selected, setSelected] = useState(0)
    const [debouncedSearch] = useDebounce(search, 1500)

    const { repositories, fetchMore, loading } = useRepositories({ ...order, ...debouncedSearch, first: 4 })

    const changeOrder = (selected) => {
        switch (selected) {
            case 1:
                setOrder({ orderBy: "RATING_AVERAGE", orderDirection: "DESC" })
                break
            case 2:
                setOrder({ orderBy: "RATING_AVERAGE", orderDirection: "ASC" })
                break
            default:
                setOrder({ orderBy: "CREATED_AT", orderDirection: "DESC" })
        }
    }

    const makeYourChoice = [
        { key: 0, value: "Default" },
        { key: 1, value: "Highest" },
        { key: 2, value: "Lowest" }
    ]

    const onChangeSearch = query => setSearch({ searchKeyword: query })

    const onEndReach = () => {
        fetchMore()
    }

    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : []

    return (
        <>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={search}
                style={styles.searchContainer}
            />
            <SelectList
                setSelected={setSelected}
                data={makeYourChoice}
                onSelect={() => changeOrder(selected)}
                search={false}
                dropdownStyles={styles.selectContainerInput}
                boxStyles={styles.selectContainer}
            />
            <ItemSeparator />
            {!repositoryNodes || loading ?
                <CoolioText center>Loading repositories...</CoolioText>
                :
                <FlatList
                    data={repositoryNodes}
                    ItemSeparatorComponent={ItemSeparator}
                    renderItem={RepositoryLink}
                    onEndReached={onEndReach}
                />
            }
        </>
    )
}

export default RepositoryList