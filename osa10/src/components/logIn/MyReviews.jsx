import { FlatList, View, Pressable, Alert } from "react-native"
import { Link } from "react-router-native"

import ItemSeparator from "../fancyfier/ItemSeperator"
import CoolioText from "../fancyfier/CoolioText"
import useReviews from "../../hooks/useReviews"
import useDeleteReview from "../../hooks/useDeleteReview"
import { styles, cutDate } from "../repository/Review"

const MyReviews = () => {
    const { reviews, loading, fetchMore } = useReviews()
    const [deleteReview] = useDeleteReview()

    if (!reviews || loading)
        return <></>

    const MyReview = ({ item }) => {
        const date = cutDate(item.createdAt)

        const deletus = () => {
            console.log("deletus")

            Alert.alert(
                "Delete review",
                "Are you sure you want to delete this review?",
                [
                    {
                        text: "Cancel",
                        onPress: () => {
                            console.log("Cancel Pressed")
                        },
                        style: "cancel"
                    },
                    {
                        text: "Delete", onPress: () => {
                            console.log("OK Pressed")
                            deleteReview(item.id)
                            fetchMore()
                        }
                    }
                ]
            )
        }

        return (
            < View style={styles.container} >
                <View style={styles.flexContainer}>
                    <View style={styles.score}>
                        <CoolioText theme big center>{item.rating}</CoolioText>
                    </View>
                    <View style={styles.text}>
                        <CoolioText big>{item.repository.name}</CoolioText>
                        <CoolioText desc>{date}</CoolioText>
                        <CoolioText>{item.text}</CoolioText>
                    </View>
                </View>
                <View style={styles.flexContainerEven}>
                    <Link to={"/list/" + item.repository.id} style={styles.buttonView}>
                        <CoolioText desc whiteOut>View Repository</CoolioText>
                    </Link>
                    <Pressable onPress={deletus} style={styles.buttonDelete}>
                        <CoolioText desc whiteOut>Delete Review</CoolioText>
                    </Pressable>
                </View>
            </View >
        )
    }

    const reviewNodes = reviews
        ? reviews.edges.map(edge => edge.node)
        : []

    return (
        <>
            {
                reviews.edges.length !== 0 ?
                    <FlatList
                        data={reviewNodes}
                        ItemSeparatorComponent={ItemSeparator}
                        renderItem={MyReview}
                    />
                    :
                    <CoolioText center>No reviews found...</CoolioText>
            }
        </>
    )
}

export default MyReviews