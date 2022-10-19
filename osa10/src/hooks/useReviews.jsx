import { useQuery } from "@apollo/client"

import { GET_MY_REVIEWS } from "../graphql/queries"

const useReviews = () => {
    const { data, loading, fetchMore, ...result } = useQuery(GET_MY_REVIEWS, {
        fetchPolicy: "cache-and-network"
    })

    const handleFetchMore = () => {
        const canFetchMore = !loading

        if (!canFetchMore)
            return

        fetchMore({})
    }

    return {
        reviews: data?.me.reviews,
        fetchMore: handleFetchMore,
        loading,
        ...result,
    }
}

export default useReviews