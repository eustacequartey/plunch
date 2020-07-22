import React, { useState, createContext } from "react";

//Apollo Client
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";

const AppContext = createContext({});

const httpLink = createHttpLink({
  uri: "https://plunchapp.herokuapp.com/",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Provider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [profile, mutateProfile] = useState({});
  const [currentOrder, setCurrentOrder] = useState({});

  return (
    <>
      <AppContext.Provider
        value={{
          isLoggedIn,
          toggleLoggedIn,
          profile,
          setProfile,
          currentOrder,
        }}>
        <ApolloProvider client={client}>{props.children}</ApolloProvider>
      </AppContext.Provider>
    </>
  );

  function toggleLoggedIn() {
    return setIsLoggedIn(!isLoggedIn);
  }

  function setProfile(profile) {
    return mutateProfile(profile);
  }
};

export { AppContext, Provider };
