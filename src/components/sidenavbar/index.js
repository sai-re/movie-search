import React from "react";
import styled from 'styled-components';
import { NavLink as Link } from "react-router-dom";

import * as colors from "../../colors";
import Arrow from "../../images/arrow-icon.png";
import SearchWhite from "../../images/search-icon-white.png";

import Hamburger from '../hamburger/index';

export default class SideNavBar extends React.Component {
	/* Write the necessary functions to show/hide the side bar on mobile devices */
	constructor() {
		super();

		this.state = {
			activeSideBar: false
		}

		this.handleHamburger = this.handleHamburger.bind(this);
	}

	//function for hamburger action
	handleHamburger() {
		//current state is false
		const currentState = this.state.activeSideBar;

		//sets the state to opposite of current state
		this.setState({ activeSideBar: !currentState });
	}

	render () {
		const { activeSideBar } = this.state;

		return (
			<SideNavBarCont className={ activeSideBar && 'visible' }>
				{/* Implement a hamburger icon slide in effect for mobile devices */}
				<Hamburger 
					handleHamburger = { this.handleHamburger }
					active = { activeSideBar }
				/>

				<SideNavMainLink className="menu_nav_link main_nav_link" to="/" activeClassName="active" exact heading={ +true }>
					Wesley

					<NavIcon arrow></NavIcon>
				</SideNavMainLink>

				<SideNavMainLink className="menu_nav_link" to="/discover" activeClassName="active">
					Discover

					<NavIcon search></NavIcon>
				</SideNavMainLink>

				<SideNavHeader><HeaderText>Watched</HeaderText></SideNavHeader>

				<NavLink className="menu_nav_link" to="/watched/movies" activeClassName="active">Movies</NavLink>

				<NavLink className="menu_nav_link" to="/watched/tv-shows" activeClassName="active">Tv Shows</NavLink>

				<SideNavHeader><HeaderText>Saved</HeaderText></SideNavHeader>

				<NavLink className="menu_nav_link" to="/saved/movies" activeClassName="active">Movies</NavLink>
				
				<NavLink className="menu_nav_link" to="/saved/tv-shows" activeClassName="active">Tv Shows</NavLink>
			</SideNavBarCont>
		);
	}
}

const SideNavBarCont = styled.div`
	position: fixed;
	z-index: 9;
	width: 240px;
	height: 100%;
	background-color: ${ colors.sideNavBar };
	transform: translateX(-260px);
	transition: .5s transform ease;

	&.visible {
		transform: translateX(0px);
	}

	@media (min-width: 900px) {
		transform: translateX(0px);
	}

	@media (min-width: 1200px) {
		width: 260px;
	}
`

const SideNavMainLink = styled(Link)`
	position: relative;
	display: block;
	padding: 20px 35px;
	font-size: 1.4em;
	font-weight: ${props => props.heading ? 'bold' : 'inherit'};
	color: #ffffff;
	transition: .2s background-color ease;

	&:hover {
		background-color: ${ colors.secondaryColor }
	}
`

const NavIcon = styled.div`
	content: url(${ props => props.arrow ? Arrow : props.search ? SearchWhite : "" });
	float: right;
`

const SideNavHeader = styled.div`
	font-size: 1.4em;
	color: #ffffff;
	padding: 20px 0 15px 35px;
`

const HeaderText = styled.div`
	padding-bottom: 15px;
	border-bottom: 1px solid #ffffff;
`

const NavLink = styled(Link)`
	display: block;
	padding: 5px 35px;
	color: #ffffff;
	font-weight: 300;

	&:hover {
		color: ${ colors.secondaryColor }
	}
`