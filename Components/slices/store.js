import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import itineraryReducer from './itinerarySlice';
import activityReducer from './activitySlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        itinerary: itineraryReducer,
        activity: activityReducer,
    }
})

export default store;