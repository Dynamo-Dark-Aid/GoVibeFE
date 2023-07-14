import axios from "axios";
import { api_key } from "./ApiKeys";
const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getRestaurantData = async (boundary) => {
  try {
    const { data: { data } } = await axios.get(URL, {
      params: {
        bl_latitude: `${boundary.latitude - boundary.latitudeDelta / 2}`,
        tr_latitude: `${boundary.latitude + boundary.latitudeDelta / 2}`,
        bl_longitude: `${boundary.longitude - boundary.longitudeDelta / 2}`,
        tr_longitude: `${boundary.longitude + boundary.longitudeDelta / 2}`,
        limit: "5",
        lang: "en_US",
      },
      headers: {
        'X-RapidAPI-Key': api_key,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });
    return data
  } catch (error) {
    throw new Error(error)
  }
}