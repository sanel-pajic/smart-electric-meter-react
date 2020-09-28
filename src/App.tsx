import React, { useState, useMemo } from "react";
import { Error } from "./pages/Error";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { AuthorizePage } from "./pages/AuthorizePage";
import { MeterMonthlyReviewPage } from "./pages/MeterMonthlyReviewPage";
import { Settings } from "./components/Settings";
import dotenv from "dotenv";

dotenv.config();

const uri_apollo = process.env.REACT_APP_URI_APOLLO_CLIENT;

export const client = new ApolloClient({
  uri: uri_apollo,
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

  const providerValue = useMemo(
    () => ({ userId, token, first_name, last_name, authorized, setAuthorized }),
    [userId, token, first_name, last_name, authorized, setAuthorized]
  );

  return (
    <CurrentUserContext.Provider value={providerValue}>
      <ApolloProvider client={client}>
        <div>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/" component={AuthorizePage} />
              <Route
                exact
                path="/statistics"
                component={MeterMonthlyReviewPage}
              />
              <Route exact path="/settings" component={Settings} />
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
