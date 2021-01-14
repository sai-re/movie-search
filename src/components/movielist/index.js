import React from "react";
import styled from 'styled-components';

import MovieItem from '../movieitem';

export default function MovieList(props) {
	const { movies, genres } = props;

	return (
		<MoviesWrapper>
			{/* Finish the MovieItem component and use it here to display the movie results */}
			{movies.map(movie => (
				<MovieItem 
					key={ movie.id }
					genres={ genres }
					id={ movie.id }
					poster={ movie.poster_path }
					title={ movie.title }
					overview={ movie.overview }
					release={ movie.release_date }
					rating={ movie.vote_average }
					genre_ids={ movie.genre_ids }
				/> )
			)}
		</MoviesWrapper>
	)
}

const MoviesWrapper = styled.div`
	position: relative;
`