import AsyncStorage from "@react-native-async-storage/async-storage"

class AuthStorage {
    constructor(namespace = "auth") {
        this.namespace = namespace
    }

    async getAccessToken() {
        const accessToken = await AsyncStorage.getItem(
            this.namespace + ":authoritan",
        )

        return accessToken ? JSON.parse(accessToken) : null
    }

    async setAccessToken(accessToken) {
        await AsyncStorage.setItem(
            this.namespace + ":authoritan",
            JSON.stringify(accessToken),
        )
    }

    async removeAccessToken() {
        await AsyncStorage.removeItem(this.namespace + ":authoritan")
    }
}

export default AuthStorage