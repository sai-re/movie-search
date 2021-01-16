import React from "react";
import styled from 'styled-components';
import Img from "react-cool-img";
import { NavLink as Link, useLocation } from "react-router-dom";

import * as colors from '../../colors';

export default function MovieItem(props) {
	const { genres, genre_ids, poster, title, rating, overview, release, id } = props;
	
	//get current location
	let location = useLocation();

	/**
	* @function displayGenres filters movie genres from genre options
	* @returns {JSX.Element} list of genres
	*/
	const displayGenres = () => {
		const genreList = genres.filter(genre => genre_ids.includes(genre.id));

		return genreList.map(genre => <Genres key={ genre.id }>{ genre.name }</Genres>);
	}

	/**
	* @function truncateString cuts off string after provided value
	* @param {string} str
	* @param {number} num
	* @returns {string} string
	*/
	function truncateString(str, num) {
		//if description smaller than cut off, return string
		if (str.length <= num) {
			return str
		}

		return str.slice(0, num) + '...'
	}

	return (
		// The MovieItemWrapper must be linked to the movie details popup
		<MovieItemWrapper to={{
			pathname: `/movie/${ id }`,
			state: { background: location },
			details: props,
		}}>
			<LeftCont>
				{poster
					? 
						<Poster
							style={{ backgroundColor: "grey", width: "100"}}
							src={`https://image.tmdb.org/t/p/w185/${ poster }`} 
							alt={ title } 
						/>
					:
						<PlaceHolder />
				}
			</LeftCont>

			<RightCont>
				<HeadingCont>
					<Heading>{ title }</Heading>

					<RatingCont>
						<Rating>{ rating }</Rating>
					</RatingCont>
				</HeadingCont>

				<GenresList>{ displayGenres() }</GenresList>

				<Overview>{ truncateString(overview, 200) }</Overview>

				<Release>{ release }</Release>
			</RightCont>
		</MovieItemWrapper>
	)
}

const MovieItemWrapper = styled(Link)`
	display: flex;
	position: relative;
	background-color: white;
	border-radius: 3px;
	padding: 10px;
	margin-top: 15px;
`

export const LeftCont = styled.div`
	margin: 10px;
`

export const RightCont = styled.div`
	display: flex;
	flex-direction: column;
	margin: 10px;
`

export const Poster = styled(Img)`
	width: 100px;

	@media (min-width: 600px) {
		width: auto;
	}
`

export const PlaceHolder = styled.div`
	width: 100px;
	height: 150px;
	background-color: grey;

	@media (min-width: 600px) {
		width: 185px;
		height: 278px
	}
`

export const HeadingCont = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	flex-direction: column;
	
	@media (min-width: 600px) {
		flex-direction: row;
		align-items: center;
	}
`

export const Heading = styled.h2`
	margin: 0;
	font-size: 1.2rem;
	
	@media (min-width: 600px) {
		font-size: 1.5rem;
	}
`

export const RatingCont = styled.div`
	padding: 5px;
	border-radius: 3px;
	background-color: #d9e021;
	margin-top: 10px;
	
	@media (min-width: 600px) {
		margin-top: 0px;
	}
`

export const Rating = styled.p`
	color: #ffffff;
`

export const GenresList = styled.ul`
	margin: 10px 0 0 0;
	padding: 0;
	color: ${ colors.secondaryColor };
	font-weight: bold;
	font-size: 14px;
`

export const Genres = styled.li`
	font-size: 14px;
	list-style-type: none;
	display: inline-block;

	&:not(:last-child) {
		margin-right: 5px;

		&:after {
			content: '|';
			margin-left: 5px;
		}
	}
`

export const Overview = styled.p`
	margin-top: 10px;
	flex-grow: 1;
`

export const Release = styled.p`
	margin-top: 20px;
	font-size: 14px;
`