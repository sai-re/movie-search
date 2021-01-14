import axios from 'axios';

// All of your API requests should be in this file
// i.e.
export const getMovieGenres = async () => {
	const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=934ce47d71722c5f70806adaf4fa72be&language=en-US";

	try {
		return await axios.get(url);
	} catch(error) {
		console.log(error);
		throw new Error(error);
	}
};

export const getPopularMovies = async () => {
	const url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=934ce47d71722c5f70806adaf4fa72be";

	try {
		return await axios.get(url);
	} catch(error) {
		console.log(error);
		throw new Error(error);
	}
};

export const getMoviesBySearch = async (title, year) => {
	const url = `https://api.themoviedb.org/3/search/movie?api_key=934ce47d71722c5f70806adaf4fa72be&language=en-US&query=${ title }&page=1&include_adult=false&year=${ year }`;

	try {
		return await axios.get(url);
	} catch(error) {
		console.log(error);
		throw new Error(error);
	}
};