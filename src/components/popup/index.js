import React from "react";
import styled from 'styled-components';
import { withRouter } from "react-router-dom";

import * as colors from '../../colors';
import * as fetcher from "../../fetcher";

import {
    LeftCont,
    RightCont,
    PlaceHolder,
    HeadingCont,
    Heading,
    RatingCont,
    Rating,
    GenresList,
    Genres,
    Overview,
    Release
} from '../movieitem/index';

class PopUp extends React.Component {
    constructor() {
        super();

        this.state = {
            movieDetails: {}
        }
    }

    back = e => {
        e.stopPropagation();
        this.props.history.goBack();
    };

    /**
    * @function displayGenres prints list of movie genres
    * @param {number} id
	* @returns {JSX.Element} list of genres
	*/
	displayGenres = (genres) => {
        if (genres) return genres.map(genre => <Genres key={ genre.id }>{ genre.name }</Genres>);
    }

    // Write a function to get the movie details based on the movie id taken from the URL.
	async searchMovieById(id) {
		try {
			const moviesDetails = await fetcher.getMoviesByid(id);

			this.setState({ 
				movieDetails: moviesDetails.data, 
			});
		} catch(err) {
			console.log(err);
			throw new Error(err);
		}
	}
    
    componentDidMount() {
        this.searchMovieById(this.props.match.params.id);
    }

    render() {
        const { genres, poster_path, title, vote_average, overview, release_date } = this.state.movieDetails;

        return (
            <PopUpContainer onClick={ this.back }>
                <Modal>
                    <BackButton type="button" onClick={ this.back }>X</BackButton>
    
                    <DetailsContainer>
                        <LeftCont>
                            {poster_path
                                ? 
                                    <Poster
                                        style={{ backgroundColor: "grey", width: "100"}}
                                        src={`https://image.tmdb.org/t/p/w185/${ poster_path }`} 
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
                                    <Rating>{ vote_average }</Rating>
                                </RatingCont>
                            </HeadingCont>
    
                            <GenresList>{ this.displayGenres(genres) }</GenresList>
    
                            <Overview>{ overview }</Overview>
    
                            <Release>{ release_date }</Release>
                        </RightCont>
                    </DetailsContainer>
    
                    <ButtonContainer>
                        <Button>Watch Offline</Button>
                        <Button primary>Watch Online</Button>
                    </ButtonContainer>
                </Modal>
            </PopUpContainer>
        )
    }
}

export default withRouter(PopUp);

const PopUpContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.30);

    overflow: scroll;
    display: flex;
    justify-content: center;

    @media (min-width: 900px) {
        overflow: auto;
        display: block;
    }
`

const Modal = styled.div`
    position: absolute;
    background: #fff;
    top: 10%;
    padding: 10px;
    margin: 10px;
    
    @media (min-width: 900px) {
        padding: 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`

const BackButton = styled.button`
    font-weight: bold;
    color: #ffffff;
    background-color: ${ colors.primaryColor };
    border: none;
    border-radius: 100%;
    padding: 2px 5px;
    cursor: pointer;
    float: right;
    
    @media (min-width: 900px) {
        position: absolute;
        top: -3%;
        left: 98%;
    }
`

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media (min-width: 600px) {
        flex-direction: row;
    }
`

const Poster = styled.img`
	width: 100%;

	@media (min-width: 600px) {
		width: auto;
	}
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;

	@media (min-width: 600px) {
        flex-direction: row;
        justify-content: flex-end
	}
`

const Button = styled.a`
    padding: 10px 15px;
    text-align: center;
    border: 2px solid ${ colors.primaryColor };
    border-radius: 2px;
    background-color: ${ props => props.primary ? colors.primaryColor : '#ffffff' };
    color: ${ props => props.primary ? '#ffffff ': colors.primaryColor };
    cursor: pointer;

    &:first-child {
        margin-bottom: 10px;
    }

    &:hover {
        transform: translateY(-2px);
    }

	@media (min-width: 600px) {
		&:first-child {
            margin: 0 10px 0 0;
        }
	}
`

