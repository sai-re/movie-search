import React from "react";
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

import * as colors from '../../colors';

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

export default function PopUp(props) {
    const { genres, genre_ids, poster, title, rating, overview, release } = props.location.details;

    //get history object
    const history = useHistory();

    const back = e => {
        e.stopPropagation();
        history.goBack();
    };

    /**
	* @function displayGenres filters movie genres from genre options
	* @returns {JSX.Element} list of genres
	*/
	const displayGenres = () => {
		const genreList = genres.filter(genre => genre_ids.includes(genre.id));

		return genreList.map(genre => <Genres key={ genre.id }>{ genre.name }</Genres>);
	}

    return (
        <PopUpContainer onClick={ back }>
            <Modal>
                <BackButton type="button" onClick={ back }>X</BackButton>

                <DetailsContainer>
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

                        <Overview>{ overview }</Overview>

                        <Release>{ release }</Release>
                    </RightCont>
                </DetailsContainer>                
            </Modal>
        </PopUpContainer>
    )
}

const PopUpContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.30);
`

const Modal = styled.div`
    position: absolute;
    background: #fff;
    border: 2px solid #444;
    top: 50%;
    left: 50%;
    padding: 10px;
    transform: translate(-50%, -50%);

    @media (min-width: 900px) {
        padding: 20px;
    }
`

const BackButton = styled.button`
    position: absolute;
    top: -3%;
    font-weight: bold;
    color: #ffffff;
    background-color: ${ colors.primaryColor };
    border: none;
    border-radius: 100%;
    padding: 2px 5px;
    left: 98%;
    cursor: pointer;
`

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media (min-width: 900px) {
        flex-direction: row;
    }
`

const Poster = styled.img`
	width: 100%;

	@media (min-width: 900px) {
		width: auto;
	}
`