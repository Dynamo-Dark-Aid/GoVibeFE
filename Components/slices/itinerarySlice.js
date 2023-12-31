import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";

export const displayItinerary = createAsyncThunk(
  "itinerary/displayItinerary",
  async (_, { getState }) => {
    try {
      const { auth } = getState();
      const { userToken } = auth;

      const response = await axios.get(
        "https://govibeapi.onrender.com/itineraries",
        {
          headers: {
            authorization: userToken,
          },
        }
      );

      return response.data;
    } catch (error) {
      Alert.alert("Error displaying itinerary:", error);
    }
  }
);

export const displayArchivedItinerary = createAsyncThunk(
  "itinerary/displayArchivedItinerary",
  async (_, { getState }) => {
    try {
      const { auth } = getState();
      const { userToken } = auth;

      const response = await axios.get(
        "https://govibeapi.onrender.com/archived-itineraries",
        {
          headers: {
            authorization: userToken,
          },
        }
      );

      return response.data;
    } catch (error) {
      Alert.alert("Error displaying itinerary:", error);
    }
  }
);

export const addToItinerary = createAsyncThunk(
  "itinerary/addToItinerary",
  async (itinerary, { getState }) => {
    try {
      const { auth } = getState();
      const { userToken } = auth;

      const response = await axios.post(
        "https://govibeapi.onrender.com/create-itinerary",
        itinerary,
        {
          headers: {
            authorization: userToken,
          },
        }
      );

      return response.data;
    } catch (error) {
      Alert.alert("Error saving itinerary:", error);
    }
  }
);

export const archiveItinerary = createAsyncThunk(
  "itinerary/archiveItinerary",
  async (itinerary, { getState }) => {
    try {
      const {
        auth,
        itinerary: { itineraryItems },
      } = getState();
      const { userToken } = auth;
      const userItinerary = itineraryItems.find(
        (item) => item.name === itinerary.name
      );

      const response = await axios.put(
        `https://govibeapi.onrender.com/archive-itinerary/${userItinerary.id}`,
        itinerary,
        {
          headers: {
            authorization: userToken,
          },
        }
      );

      return userItinerary;
    } catch (error) {
      Alert.alert("Error archiving itinerary:", error);
    }
  }
);

export const removeFromItinerary = createAsyncThunk(
  "itinerary/removeFromItinerary",
  async (itinerary, { getState }) => {
    try {
      const {
        auth,
        itinerary: { itineraryItems },
      } = getState();
      const { userToken } = auth;
      const userItinerary = itineraryItems.find(
        (item) => item.name === itinerary.name
      );

      if (!userItinerary) {
        throw new Error("Itinerary not found");
      }

      await axios.delete(
        `https://govibeapi.onrender.com/remove-itinerary/${userItinerary.id}`,
        {
          headers: {
            authorization: userToken,
          },
        }
      );

      return { id: userItinerary.id };
    } catch (error) {
      Alert.alert("Error removing from itinerary:", error);
    }
  }
);

const itinerarySlice = createSlice({
  name: "itinerary",
  initialState: {
    itineraryItems: [],
  },
  reducers: {
    clearItineraryItems(state, action) {
      state.itineraryItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(displayItinerary.fulfilled, (state, action) => {
      state.itineraryItems = action.payload;
    }),
      builder.addCase(displayArchivedItinerary.fulfilled, (state, action) => {
        state.itineraryItems = action.payload;
      }),
      builder.addCase(addToItinerary.fulfilled, (state, action) => {
        state.itineraryItems.push(action.payload);
      }),
      builder.addCase(removeFromItinerary.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.itineraryItems = state.itineraryItems.filter(
          (item) => item.id !== id
        );
      }),
      builder.addCase(archiveItinerary.fulfilled, (state, action) => {
        console.log("state.itineraryItems", state.itineraryItems);
        console.log("action.payload", action.payload);
        const { id } = action.payload;
        state.itineraryItems = state.itineraryItems.filter(
          (item) => item.id !== id
        );
        console.log("state.itineraryItems", state.itineraryItems);
      });
  },
});

export const { clearItineraryItems } = itinerarySlice.actions;

export default itinerarySlice.reducer;
