import React from 'react';
import styled from 'styled-components';

const ErrorFieldContainer = styled.div`
    color: red;
    border-radius:10px;
    height: 1rem;
    font-size:12px;
    margin-top:5px;
    font-weight: ${props => props.theme.font.weight.bold};
`;


const ErrorField = (props) => {
    const {errorMessage, touched} = props;
    return (
        <>
            {
                touched && errorMessage 
                ?
                <ErrorFieldContainer> * {errorMessage} </ErrorFieldContainer>
                :
                null
            }    
        </>)
}

export default ErrorField;