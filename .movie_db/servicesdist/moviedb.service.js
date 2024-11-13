import axios from 'axios';
export class MovieDBService {
    axiosInstance;
    apiKey;
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.axiosInstance = axios.create({
            baseURL: "https://api.themoviedb.org/3",
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                api_key: this.apiKey,
            }
        });
    }
    async getPopularMovies(page = 1) {
        try {
            const response = await this.axiosInstance.get('/movie/popular', {
                params: { page },
            });
            return response.data;
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async getTopRatedMovies(page = 1) {
        try {
            const response = await this.axiosInstance.get('/tv/top_rated', {
                params: { page },
            });
            return response.data;
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async searchByKeyword(query, page = 1) {
        try {
            const response = await this.axiosInstance.get('/search/movie', {
                params: { query, page },
            });
            return response.data;
        }
        catch (error) {
            this.handleError(error);
        }
    }
    handleError(error) {
        if (axios.isAxiosError(error)) {
            console.error('Error Message:', error.message);
            if (error.response) {
                console.error('Response Error Data:', error.response.data);
            }
        }
        else {
            console.error('Unexpected Error:', error);
        }
    }
}
//# sourceMappingURL=moviedb.service.js.map