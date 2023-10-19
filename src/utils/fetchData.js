import axios from "axios";

const KEY = 'fee917f5e9msh48b5dfa1ace4c25p1f2c42jsnedbe7e5cca48';
const HOST = 'free-to-play-games-database.p.rapidapi.com';
export const errorMessage = "Cannot resolve API data";

export const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(endpoint, {
            headers: {
                'X-RapidAPI-Key': KEY,
                'X-RapidAPI-Host': HOST
            }
        });

        if (response.status !== 200) {
            throw new Error(`API returned status ${response.status}: ${response.statusText}`);
        }

    return response.data;

    } catch (error) {
        throw new Error(errorMessage)
    }
};

export default fetchData;