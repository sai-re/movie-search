import React from "react";
import styled from 'styled-components';

import * as colors from "../../colors";
import { size } from "../../mediaSizes";
import SearchIcon from "../../images/search-icon-yellow.png";
import CalendarIcon from "../../images/year-icon.png";
import FilterIcon from "../../images/filter-icon.png";

export default class SearchBar extends React.Component {
    constructor() {
        super();

        this.state = {
            keyword: '',
            year: '',
            error: false
        }

        this.handleKeyword = this.handleKeyword.bind(this);
        this.handleYear = this.handleYear.bind(this);

        this.keywordRef = React.createRef();
        this.yearRef = React.createRef();
    }

    /**
    * @function handleKeyword sets state to display input value and calls api to update parent state
	*/
    handleKeyword = (e) => {
        this.setState({ keyword: e.target.value, error: false });
        
        if(this.keywordRef.current.value !== '') {
            this.props.searchMovies(this.keywordRef.current.value, this.yearRef.current.value);
        }
    }
    
    /**
    * @function handleYear sets state to display input value and calls api to update parent state only if title is provided
    */
    handleYear = (e) => {
        this.setState({ year: e.target.value });
        
        if(this.keywordRef.current.value !== '') {
            this.props.searchMovies(this.keywordRef.current.value, this.yearRef.current.value);
        } else {
            this.setState({ error: true });
        };
    };

    render() {
        const { keyword, year, error } = this.state;
        
        return (
            <FormContainer>
                <FormInputContainer>
                    <FormInput 
                        type="text"
                        placeholder="Search For Movies"
                        value={ keyword }
                        onChange={ this.handleKeyword }
                        searchByKeyword
                        ref={ this.keywordRef }
                    />
                    
                    <ExpandButton onClick={ this.props.handleExpand } />
                </FormInputContainer>

                <FormInput 
                    type="number"
                    className='searchByYear'
                    placeholder="Year of Release"
                    min="0"
                    value={ year }
                    onChange={ this.handleYear }
                    pattern="\d*"
                    searchByYear
                    expand={ this.props.expand }
                    ref={ this.yearRef }
                />

                <ErrorMsg error={ error }>Please provide a title</ErrorMsg>
            </FormContainer>
        )
    }
}

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const FormInputContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const ExpandButton = styled.button`
    padding: 15px;
    border: 0;
    border-bottom: 2px solid #d9e021;
    margin-left: 10px;
    background: url(${ FilterIcon }) no-repeat;
    cursor: pointer;

    @media (min-width: ${ size.medium }) {
		display: none;
	}
`

const FormInput = styled.input`
    flex-grow: 1;
    padding: 10px 35px;
    border: none;
    border-bottom: 2px solid #d9e021;
    font-size: 14px;
    color: ${ colors.fontColor };
    background: url('${ props => props.searchByKeyword ? SearchIcon : CalendarIcon }') no-repeat;
    background-position: 0 50%;
    background-color: #ffffff;

    &.searchByYear {
        display: ${ props => props.expand ? 'inline-block' : 'none'};

        @media (min-width: ${ size.medium }) {
			display: inline-block;
		}
    }

    &:not(:first-child) {
        margin-top: 15px;
    }
`

const ErrorMsg = styled.p`
    display: ${ props => props.error ? 'block' : 'none' };
    margin-top: 10px;
    color: red;
`