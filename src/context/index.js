import React, { useState, createContext, useEffect } from "react";

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
  const token = localStorage.getItem("AUTH_TOKEN");
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, mutateProfile] = useState(
    JSON.parse(localStorage.getItem("USER"))
  );
  const [currentOrder, setCurrentOrder] = useState({
    mainDish: "",
    sideDish: "",
    protein: "",
    createdFor: localStorage.getItem("USER")
      ? JSON.parse(localStorage.getItem("USER")).id
      : "",
  });

  useEffect(() => {
    console.log(currentOrder);
    console.log(profile);
    setCurrentOrder({ ...currentOrder, createdFor: profile && profile.id });
    if (localStorage.getItem("AUTH_TOKEN")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [profile]);

  return (
    <>
      <AppContext.Provider
        value={{
          isLoggedIn,
          toggleLoggedIn,
          profile,
          setProfile,
          currentOrder,
          setMainDish,
          setSideDish,
          setProtein,
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

  function setMainDish(id) {
    return setCurrentOrder({ ...currentOrder, mainDish: id });
  }

  function setSideDish(id) {
    return setCurrentOrder({ ...currentOrder, sideDish: id });
  }

  function setProtein(id) {
    return setCurrentOrder({ ...currentOrder, protein: id });
  }
};

export { AppContext, Provider };
