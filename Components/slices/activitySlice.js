import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Alert } from 'react-native';

export const getActivities = createAsyncThunk('activity/getActivities', async (_, { getState }) => {
    try {
        const { auth } = getState()
        const { userToken } = auth

        const response = await axios.get('https://govibeapi.onrender.com/activities', {
            headers: {
                authorization: userToken
            }
          });
        return response.data;
    } catch (error) {
        Alert.alert('Error getting activities:', error);
    }
})

export const addActivity = createAsyncThunk('activity/addActivity', async (activity, { getState }) => {
    try {
      const { auth } = getState()
      const { userToken } = auth

      const response = await axios.post('https://govibeapi.onrender.com/add-activity', activity, {
        headers: {
            authorization: userToken
        }
      });

      return response.data;
    } catch (error) {
        Alert.alert('Error saving activity:', error);
    }
})

export const removeActivity = createAsyncThunk('activity/removeActivity', async (activity, { getState }) => {
    try {
        const { auth, activity: { activityItems } } = getState();
        const { userToken } = auth
        const userActivity = activityItems.find(item => item.name === activity.name);

        if (!userActivity) {
            throw new Error('Activity not found');
        }

        await axios.delete(`https://govibeapi.onrender.com/remove-activity/${userActivity.id}`, {
            headers: {
                authorization: userToken
            }
          });

        return { id: userActivity.id };
    } catch (error) {
        Alert.alert('Error removing activity:', error)
        throw error
    }
})

const activitySlice = createSlice({
    name: 'activity',
    initialState: {
        activityItems: [],
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getActivities.fulfilled, (state, action) => {
            state.activityItems = action.payload;
        }),
        builder.addCase(addActivity.fulfilled, (state, action) => {
            state.activityItems.push(action.payload);
        }),
        builder.addCase(removeActivity.fulfilled, (state, action) => {
            const { id } = action.payload;
            state.activityItems = state.activityItems.filter(item => item.id !== id);
        })
    }
})

export default activitySlice.reducer;