import React from "react";
import styled from 'styled-components';

export default function CheckBox(props) {
	// Create a custom checkbox component
	return (
		<CheckboxCont>
			<CheckboxInput name={ props.name } type="checkbox"/>
			<CheckboxLabel>{ props.name }</CheckboxLabel>
		</CheckboxCont>
	)
}

const CheckboxCont = styled.div`
	margin-top: 10px;
`

const CheckboxInput = styled.input`
	margin: 0 10px 0 0;
`

const CheckboxLabel = styled.label`
`