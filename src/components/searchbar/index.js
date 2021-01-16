import React from "react";
import styled from 'styled-components';

import * as colors from "../../colors";
import SearchIcon from "../../images/search-icon-yellow.png";
import CalendarIcon from "../../images/year-icon.png";

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

    handleKeyword = (e) => {
        this.setState({ keyword: e.target.value, error: false });
        this.props.searchMovies(this.keywordRef.current.value, this.yearRef.current.value);
    }
    
    handleYear = (e) => {
        //check if query is provided, api requires query.
        if(this.keywordRef.current.value !== '') {
            this.setState({ year: e.target.value });
            this.props.searchMovies(this.keywordRef.current.value, this.yearRef.current.value);
        } else {
            this.setState({ error: true });
        };
    };

    render() {
        const { keyword, year, error } = this.state;

        return (
            <FormContainer>
                <FormInput 
                    type="text"
                    placeholder="Search For Movies"
                    value={ keyword }
                    onChange = { this.handleKeyword }
                    searchByKeyword
                    ref={this.keywordRef}
                />
                
                <FormInput 
                    type="number"
                    placeholder="Year of Release"
                    min="0"
                    value={ year }
                    onChange = { this.handleYear }
                    pattern="\d*"
                    searchByYear
                    ref={this.yearRef}
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

const FormInput = styled.input`
    padding: 10px 35px;
    border: none;
    border-bottom: 2px solid #d9e021;
    font-size: 14px;
    color: ${ colors.fontColor };
    background: url('${ props => props.searchByKeyword ? SearchIcon : CalendarIcon }') no-repeat;
    background-position: 0 50%;
    background-color: #ffffff;

    &:not(:first-child) {
        margin-top: 15px;
    }
`

const ErrorMsg = styled.p`
    display: ${ props => props.error ? 'block' : 'none' };
    margin-top: 10px;
    color: red;
`