import axios from "axios";
import { api_key } from "./ApiKeys";

const URL = 'https://trailapi-trailapi.p.rapidapi.com/activity/'

export const getTrailsData = async (lat, long) => {
    try {
        const { data } = await axios.get(URL, {
            params: {
                lat: `${lat}`,
                limit: '5',
                lon: `${long}`,
                radius: '20',
                'q-activities_activity_type_name_eq': 'hiking'
            },
            headers: {
                'X-RapidAPI-Key': 'd6f8af5c81msh29b15a40494df92p1e3122jsnb65806b02ae6',
                'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
            }
        });
        return data
    } catch (error) {
        throw new Error(error)
    }
}