import axios, { AxiosInstance } from 'axios';

export class MovieDBService {
    private axiosInstance: AxiosInstance;
    private apiKey: String;

    constructor(apiKey: String) {
        this.apiKey = apiKey;
        this.axiosInstance = axios.create({
            baseURL: "https://api.themoviedb.org/3",
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                api_key: this.apiKey,
            }
        })
    }

    public async getPopularMovies(page: number = 1): Promise<any> {
        try {
            const response = await this.axiosInstance.get('/movie/popular', {
                params: { page },
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    public async getTopRatedMovies(page: number = 1): Promise<any> {
        try {
            const response = await this.axiosInstance.get('/tv/top_rated', {
                params: { page },
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    public async searchByKeyword(query: string, page: number = 1): Promise<any> {
        try {
            const response = await this.axiosInstance.get('/search/movie', {
                params: { query, page },
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    private handleError(error: any): void {
        if (axios.isAxiosError(error)) {
            console.error('Error Message:', error.message);
            if (error.response) {
                console.error('Response Error Data:', error.response.data);
            }
        } else {
            console.error('Unexpected Error:', error);
        }
    }
}

