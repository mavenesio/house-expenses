import React from 'react';
import styled from 'styled-components';

const ErrorFieldContainer = styled.div`
    color: red;
    border-radius:10px;
    height: 2rem;
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