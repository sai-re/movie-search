import React from "react";
import styled from 'styled-components';

import * as colors from '../../colors';

import Checkbox from "../../components/checkbox";

export default class ExpandableFilters extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			filtersShown: [false, false, false]
		};

		this.handleExpand = this.handleExpand.bind(this);
	}

	/**
	* @function listCheckBoxes maps over filters prop and returns checkbox
	* @param {array} filters
	* @returns {JSX.Element} list of checkboxes
	*/
	listCheckBoxes = (filters) => filters.map(filter => <Checkbox key={ filter.id } name={ filter.name } />);

	/**
	* @function handleExpand copy state and togge state bool with index
	* @param {number} index
	*/
	handleExpand = (index) => {
		const filtersShown = [...this.state.filtersShown];
		filtersShown[index] = !filtersShown[index];

		this.setState({ filtersShown: filtersShown });
	};

	render() {
		const { genres, ratings, languages } = this.props;

		return (
			<ExpandableFiltersCont>
				<ExpandableFilter>
					<Expand 
						onClick={ () => this.handleExpand(0) }
						visible={ this.state.filtersShown[0] } >

						Select genre(s)
					</Expand>

					<List visible={ this.state.filtersShown[0] } >
						{ this.listCheckBoxes(genres) }
					</List>
				</ExpandableFilter>

				<ExpandableFilter>
					<Expand 
						onClick={ () => this.handleExpand(1) }
						visible={ this.state.filtersShown[1] } >

						Select min. vote
					</Expand>

					<List visible={ this.state.filtersShown[1] } >
						{ this.listCheckBoxes(ratings) }
					</List>
				</ExpandableFilter>

				<ExpandableFilter>
					<Expand 
						onClick={ () => this.handleExpand(2) }
						visible={ this.state.filtersShown[2] } >
							
						Select language
					</Expand>

					<List visible={ this.state.filtersShown[2] } >
						{ this.listCheckBoxes(languages) }
					</List>
				</ExpandableFilter>
			</ExpandableFiltersCont>
		)
	}
}

const ExpandableFiltersCont = styled.div`
	margin-top: 10px;
`

const ExpandableFilter = styled.div`
	&:not(:first-child) {
		margin-top: 15px;
	}
`

const Expand = styled.button`
    background-color: #ffffff;
    border: none;
	font-size: 1rem;
	color: ${ colors.primaryColor };
	padding: 0;
	cursor: pointer;
	
	&:before {
		content: '${ props => props.visible ? '-' : '+'}';
		margin-right: 10px;
	}
`

const List = styled.div`
	display: ${ props => props.visible ? 'block' : 'none'}
`