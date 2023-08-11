import axios from "axios";

const KEY = 'fee917f5e9msh48b5dfa1ace4c25p1f2c42jsnedbe7e5cca48';
const HOST = 'free-to-play-games-database.p.rapidapi.com';

// ENDPOINTS
const ALL_GAMES = 'https://free-to-play-games-database.p.rapidapi.com/api/games';

export const fetchData = async () => {
    try {
        const response = await axios.get(ALL_GAMES, {
        headers: {
            'X-RapidAPI-Key': KEY,
            'X-RapidAPI-Host': HOST
        }
        });

    return response.data;

    } catch (error) {
        console.error('Something went wrong!', error);
        return [];
    }
};

export default fetchData;