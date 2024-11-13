import dotenv from 'dotenv';
import { MovieDBService } from './dist/moviedb.service.js';

dotenv.config({ path: './movie_db/.env' });

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
console.log(API_KEY)

const service = new MovieDBService(API_KEY);

async function test() {
    try {
        const search = await service.searchByKeyword("Star Wars");
        console.log(search);
    } catch {

    }
}

test();