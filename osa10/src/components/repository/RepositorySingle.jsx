import { View, StyleSheet, FlatList, Pressable, Linking } from "react-native"
import { useParams } from "react-router-native"

import RepositoryItem from "./RepositoryItem"
import CoolioText from "../fancyfier/CoolioText"
import ItemSeparator from "../fancyfier/ItemSeperator"
import theme from "../fancyfier/theme"
import useRepository from "../../hooks/useRepository"
import Review from "./Review"

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10,
    },
    button: {
        backgroundColor: theme.colors.main,
        borderRadius: 6,
        padding: 10
    }
})

const RepositorySingle = () => {
    const params = useParams()
    const id = params.id

    const variables = {
        repositoryId: id,
        first: 2
    }

    const { repository, loading, fetchMore } = useRepository(variables)

    const onEndReach = () => {
        fetchMore()
    }

    if (!repository || loading)
        return (<></>)

    const reviewNodes = repository
        ? repository.reviews.edges.map(edge => edge.node)
        : []

    const goToLink = () => {
        Linking.openURL(repository.url)
    }

    return ( // { flex: 1 } antaa Flatlisting scrollata loppuun saakka tai poistaa View
        <View style={{ flex: 1 }}>
            <RepositoryItem item={repository} />
            <View style={styles.container}>
                <Pressable onPress={goToLink} style={styles.button}>
                    <CoolioText big center whiteOut>Open in GitHub</CoolioText>
                </Pressable>
            </View>
            <ItemSeparator />
            {repository.reviews.edges.length !== 0 ?
                <FlatList
                    data={reviewNodes}
                    ItemSeparatorComponent={ItemSeparator}
                    renderItem={Review}
                    onEndReached={onEndReach}
                />
                :
                <CoolioText center>No reviews found...</CoolioText>
            }
        </View>
    )
}

export default RepositorySingle