import axios from "axios";

const KEY = 'fee917f5e9msh48b5dfa1ace4c25p1f2c42jsnedbe7e5cca48';
const HOST = 'free-to-play-games-database.p.rapidapi.com';

export const fetchData = async (endpoint) => {
    console.log("Fetching data...");
    try {
        const response = await axios.get(endpoint, {
            headers: {
                'X-RapidAPI-Key': KEY,
                'X-RapidAPI-Host': HOST
            }
        });

    return response.data;

    } catch (error) {
        console.error('Cannot fetch data!', error);
        return [];
    }
};

export default fetchData;