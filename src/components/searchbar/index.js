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
        }
    }

    render() {
        const { keyword, year } = this.state;

        return (
            <FormContainer>
                <FormInput 
                    type="text"
                    placeholder="Search For Movies"
                    value={ keyword }
                    onChange = { e => this.setState({ keyword: e.target.value }) }
                    searchByKeyword
                />
                
                <FormInput 
                    type="number"
                    placeholder="Year of Release"
                    min="0"
                    value={ year }
                    onChange = { e => this.setState({ year: e.target.value }) }
                    pattern="\d*"
                    searchByYear
                />
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