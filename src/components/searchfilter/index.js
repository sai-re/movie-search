import React from "react";
import styled, { css } from 'styled-components';

import { size } from "../../mediaSizes";

import ExpandableFilters from "../../components/expandablefilters";
import SearchBar from "../../components/searchbar";

export default class SearchFilters extends React.Component {
	constructor() {
		super();

		this.state = { expand: false }
	}

	/**
    * @function handleExpand sets state opposite to toggle expand filters on mobile
    */
	handleExpand = () => this.setState({ expand: !this.state.expand });

	render() {
		const { genres, ratings, languages, searchMovies } = this.props;
	
		return (
			<FiltersWrapper>
				<SearchFiltersCont marginBottom>
					{/* Implement a SearchBar component and use it for both the keyword and the year inputs */}
					<SearchBar searchMovies={ searchMovies } expand={ this.state.expand } handleExpand={ this.handleExpand } />
				</SearchFiltersCont>
	
				<SearchFiltersCont className="expandable-filters" expand={ this.state.expand }>
					<CategoryTitle>Movies</CategoryTitle>
	
					{/* Implement a component called "ExpandableFilters" and use it for the filter categories */}
					<ExpandableFilters
						handleExpand={ this.handleExpand }
						genres={ genres }
						ratings={ ratings }
						languages={ languages }
					/>
				</SearchFiltersCont>
			</FiltersWrapper>
		)
	}
}

const FiltersWrapper = styled.div`
	position: relative;
`

const SearchFiltersCont = styled.div`
	&.expandable-filters {
		display: ${ props => props.expand ? 'block' : 'none'};

		@media (min-width: ${ size.medium }) {
			display: block;
		}
	}

	background-color: white;
	padding: 20px;
	border-radius: 3px;
	transition: all .3s ease-in-out;
	
	${props => props.marginBottom && css`
		margin-bottom: 15px;
	`}
`

const CategoryTitle = styled.div`
	font-weight: bold;
`