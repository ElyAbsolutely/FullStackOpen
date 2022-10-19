import { StatusBar } from "expo-status-bar"
import { ApolloProvider } from "@apollo/client"
import { NativeRouter } from "react-router-native"

import Main from "./src/components/main"
import createApolloClient from "./src/utils/apolloClient"
import AuthStorage from "./src/utils/authStorage"
import AuthStorageContext from "./src/context/AuthStorageContext"

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

export default function App() {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  )
}