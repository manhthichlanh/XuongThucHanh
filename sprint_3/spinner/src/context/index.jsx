import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';

import axios from "axios";

export const AppContext = createContext();

const initialState = {
    giftCurrent: "",
    listUser: [],
    listUserGame: [],
    listResult: []
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "UPDATE_USER":
        const newlstUser = action.payload.map((user) => {
          return {
            id: user._id,
            option: user.fullname,
            style: { backgroundColor: ranDomcolor(), textColor: "#fff" },
          };
        });
  
        return {
          ...state,
          listUserGame: [...state.listUserGame, ...newlstUser],
        };
      case "REMOVE_USER_GAME":
        const index = action.payload.index;
        const id = action.payload.id;
        const infoUser = state.listUser.find((user) => user._id === id);
  
        infoUser.gift?.push(state.giftCurrent);
        const time = moment(Date.now()).format("hh:mm:ss");
  
        const result = {
          time,
          gift: state.giftCurrent,
          option: infoUser.fullname,
        };
        const listResult = [...state.listResult, result];
  
        const listUserGame = action.payload.remove
          ? [
              ...state.listUserGame.slice(0, index),
              ...state.listUserGame.slice(index + 1),
            ]
          : [...state.listUserGame];
  
        return {
          ...state,
          listResult,
          listUserGame,
        };
      case "UPDATE_GIFT":
        return {
          ...state,
          giftCurrent: action.payload.gift,
        };
      default:
        return state;
    }
  };

 function useAppContext() {
  const context = useContext(AppContext);

  if (context === null) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
}

 function AppContextProvider({ children }) {

    const [users, setUsers] = useState([]);
    const [List, setList] = useState([]);
    const [state, dispatch] = useReducer(reducer,initialState);

    const fetchUsers = async () => {
      
        try {
            const response = await axios.get('http://localhost:3000/users');
            const data = response.data.data;
            const List = data.map(item=>{return { id:item._id, option: item.fullname, style: { backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` } }})
            setUsers(data);
            setList(List);
          } catch (error) {
            console.log(error.message);
          }
      };
    
      const addUser = async (newUser) => {
    
        try {
          const response = await axios.post('http://localhost:3000/users/add', newUser);
          console.log(response.data) ;
        } catch (error) {

          return error.message;
        }
        return (false);
      };
    
      const deleteUser = async (id) => {

        try {
          await axios.delete(`http://localhost:3000/users/${id}`);
          await fetchUsers()
        } catch (error) {
          setError(error.message);
        }
      };

    const data = {
        users,
        List,
        state,
        fetchUsers,
        addUser,
        deleteUser,
        dispatch,
      };
      

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}
export { useAppContext, AppContextProvider }