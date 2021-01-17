import React from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import styled from 'styled-components';

import { size } from './mediaSizes';

import SideNavBar from "./components/sidenavbar";
import Discover from "./pages/discover";
import PopUp from './components/popup/index';

import './css/app.css'; 

export default class App extends React.Component {
	render () {
		return (
			<Router>
				<ModleSwitch />
			</Router>
		);
	}
}

function ModleSwitch(props) {
	let location = useLocation();

	let background = location.state && location.state.background;

	return (
		<PageContainer>
			<SideNavBar { ...props } />

			<ContentWrapper>
				<Switch location={ background || location } >
					<Route path="/discover" component={ Discover } { ...props } />
				</Switch>

				{background && <Route path="/movie/:id" component={ PopUp } />}
			</ContentWrapper>
		
		</PageContainer>
	)
}

const ContentWrapper = styled.main`
	@media (min-width: ${ size.medium }) {
		padding-left: 240px;
	}

	@media (min-width: ${ size.large }) {
		padding-left: 260px;
	}
`

const PageContainer = styled.main`
	overflow-x: hidden;
`
