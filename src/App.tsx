import React, { useState } from "react";
import { Home } from "./pages/Home";
import { Error } from "./pages/Error";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { LoginPage } from "./pages/LoginPage";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

export const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(
        ({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          ),
        console.log("GRAPHQL ERRORS", graphQLErrors)
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  },
  request: (operation) => {
    const token = localStorage.getItem("token");
    if (token) {
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      });
    }
  },
});

export const CurrentUserContext = React.createContext<{
  userId: string;
  token: string;
  authorized: boolean;
  first_name: string;
  last_name: string;
  setAuthorized: Function;
}>({
  userId: "",
  token: "",
  first_name: "",
  last_name: "",
  authorized: false,
  setAuthorized: () => {},
});

const App: React.FC = () => {
  const [
    { userId, token, first_name, last_name, authorized },
    setAuthorized,
  ] = useState({
    userId: "",
    token: "",
    first_name: "",
    last_name: "",
    authorized: false,
  });
  return (
    <CurrentUserContext.Provider
      value={{
        userId,
        token,
        first_name,
        last_name,
        authorized,
        setAuthorized,
      }}
    >
      <ApolloProvider client={client}>
        <div>
          <BrowserRouter>
            <Header />

            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route exact path="/app" component={Home} />

              <Route render={() => <Error />} />
            </Switch>
            <Footer
              title="Created by Sanel Pajic"
              description="Smart Electric Meter App"
            />
          </BrowserRouter>
        </div>
      </ApolloProvider>
    </CurrentUserContext.Provider>
  );
};

export default App;
