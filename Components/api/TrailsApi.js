import axios from "axios";
import { api_key } from "./ApiKeys";

const URL = 'https://trailapi-trailapi.p.rapidapi.com/activity/'

export const getTrailsData = async(lat,long) => {
    try {
        const {data} = await axios.get(URL, {
            params: {
                lat: `${lat}`,
                limit: '10',
                lon: `${long}`,
                radius: '20',
                'q-activities_activity_type_name_eq': 'hiking'
            },
            headers: {
              'X-RapidAPI-Key': api_key,
              'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
            }
          });
        return  data
    } catch (error) {
        throw new Error(error)
    }
}