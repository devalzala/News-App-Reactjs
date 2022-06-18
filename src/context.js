// context creation
// provider
// consumer is lenghty so it is removed it is added in useContext Hooks
// useContext Hook


import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./Reducer";

let API = "http://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  query: "react",
  nbPages: 0,
  page: 0,
  hits: [],
};

const AppContext = React.createContext();

// create a provider function
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchApiData = async (url) => {

    dispatch({
        type: 'SET_LOADING'
    })


    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data, "dataaaaaaaaaaa");
      dispatch({
        type: "GET_STORIES",
        payload: { 
            hits: data.hits,
            nbPages: data.nbPages,
        },
      });
    } catch (error) {
      console.log(error, "Error APifetchinggggggggg");
    }
  };

  // to remove the post

  const removePost = (post_ID) => {
    dispatch({
      type: "REMOVE_POST",
      payload: post_ID
    });
  }

  // search the posts
  const searchPost = (searchQuery) => {
    dispatch({type: "SEARCH_QUERY", payload: searchQuery})
  }


  // pagination

  const getPrevPage = () => {
    dispatch({type: "PREV_PAGE"})
  }
  const getNextPage = () => {
    dispatch({type: "NEXT_PAGE"})
  }


  useEffect(() => {
    fetchApiData(`${API}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);

  return <AppContext.Provider value={{...state, removePost, searchPost, getPrevPage, getNextPage}}>{children}</AppContext.Provider>;
};

// custom hook creation
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
