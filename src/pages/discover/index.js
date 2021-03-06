import React from "react";
import styled from 'styled-components';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import * as fetcher from "../../fetcher";
import { size } from '../../mediaSizes';
import { sortRatings } from '../../helpers';

import SearchFilters from "../../components/searchfilter";
import MovieList from "../../components/movielist";

//get debounced function at top lvl
const debounceGetMoviesBySearch = AwesomeDebouncePromise(fetcher.getMoviesBySearch, 500);

export default class Discover extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			keyword: '',
			year: 0,
			results: [],
			movieDetails: null,
			totalCount: 0,
			genreOptions: [],
			ratingOptions: [
				{ id: 7.5, name: 7.5 },
				{ id: 8, name: 8 },
				{ id: 8.5, name: 8.5 },
				{ id: 9, name: 9 },
				{ id: 9.5, name: 9.5 },
				{ id: 10, name: 10 }
			],
			languageOptions: [
				{ id: 'GR', name: 'Greek' },
				{ id: 'EN', name: 'English' },
				{ id: 'RU', name: 'Russian' },
				{ id: 'PO', name: 'Polish' }
			]
		};
	}

	/**
    * @function loadPopularMovies function to preload the popular movies when page loads & get the movie genres
	*/
	async loadPopularMovies() {
		try {
			const movies = await fetcher.getPopularMovies();
			const genres = await fetcher.getMovieGenres();
			
			this.setState({ 
				results: movies.data.results, 
				totalCount: movies.data.results.length,
				genreOptions: genres.data.genres
			});
		} catch(err) {
			console.log(err);
			throw new Error(err);
		}
	}

	/**
    * @function searchMovies function to trigger the API request and load the search results based on the keyword and year given as parameters
	* @param {string} keyword
	* @param {string} year
	*/
	async searchMovies(keyword, year) {
		try {
			let movies;

			//revert to popular movies if no keyword or year values supplied
			if (keyword || year) {
				movies = await debounceGetMoviesBySearch(keyword, year);
			} else {
				movies = await fetcher.getPopularMovies()
			}
			
			this.setState({ 
				results: movies.data.results, 
				totalCount: movies.data.results.length,
			});

		} catch(err) {
			console.log(err);
			throw new Error(err);
		}
	}

	componentDidMount() {
		this.loadPopularMovies();
	}

	render () {
		const { genreOptions, languageOptions, ratingOptions, totalCount, results } = this.state;

		return (
			<DiscoverWrapper>
				<MobilePageTitle>Discover</MobilePageTitle>

				<MovieFilters>
					<SearchFilters 
						genres={ genreOptions }
						ratings={ sortRatings(ratingOptions) }
						languages={ languageOptions }
						searchMovies={ (keyword, year) => this.searchMovies(keyword, year) }
					/>
				</MovieFilters>

				<MovieResults>
					{ totalCount > 0 && <TotalCounter>{ totalCount } results</TotalCounter>}

					<MovieList 
						movies={ results || [] }
						genres={ genreOptions || [] }
					/>
				</MovieResults>
			</DiscoverWrapper>
		)
	}
}

const DiscoverWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 60px 10px;
	
	@media (min-width: ${ size.medium }) {
		flex-direction: row;
		padding: 60px 15px;
	}
	
	@media (min-width: ${ size.large }) {
		padding: 60px 35px;
	}
`

const TotalCounter = styled.div`
	font-weight: 900;
`

const MovieResults = styled.div`
	order: 3;
	margin-top: 15px;
	
	@media (min-width: ${ size.medium }) {
		flex-grow: 3;
		order: 2;
		margin: 7.5px;
		transform: translateY(-35px);
	}
`

const MovieFilters = styled.div`
	order: 2;
	
	@media (min-width: ${ size.medium }) {
		flex-grow: 1;
		order: 3;
		margin: 7.5px;
	}
`

const MobilePageTitle = styled.header`
	flex-basis: 100%;
	order: 1;
	font-size: 1.6em;
	transform: translate(60px, -45px);

	@media (min-width: ${ size.medium }) {
		display: none;
	}
`