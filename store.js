import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define your actions
const LOGIN_SUCCESS = "LOGIN_SUCCESS";

const SET_USER_NAME = "SET_USER_NAME";

export const loginSuccess = (isLoggedIn) => ({
  type: LOGIN_SUCCESS,
  payload: isLoggedIn,
});

export const setUserName = (userName) => ({
  type: SET_USER_NAME,
  payload: userName,
});

// Define your reducer
const initialState = {
  isLoggedIn: false,
  userName: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case SET_USER_NAME:
      return {
        ...state,
        userName: action.payload,
      };
    default:
      return state;
  }
};

// Configure Redux Persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

// Create your Redux store
export const store = createStore(persistedReducer);

// Create the persistor to persist the store
export const persistor = persistStore(store);
