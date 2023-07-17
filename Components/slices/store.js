import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import itineraryReducer from "./itinerarySlice";
import activityReducer from "./activitySlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    itinerary: itineraryReducer,
    activity: activityReducer,
    user: userReducer,
  },
});

export default store;
