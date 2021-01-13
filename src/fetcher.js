import axios from 'axios';

// All of your API requests should be in this file
// i.e.
export const getMovieGenres = async () => {
	try {
		return await axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=934ce47d71722c5f70806adaf4fa72be&language=en-US");
	} catch(error) {
		throw new Error(error);
	}
};

export const getPopularMovies = async () => {
	try {
		return await axios.get("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=934ce47d71722c5f70806adaf4fa72be");
	} catch(error) {
		throw new Error(error);
	}
};