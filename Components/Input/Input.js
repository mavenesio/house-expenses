import React,{useCallback} from 'react';
import styled from 'styled-components';
import ErrorField from '../ErrorField/ErrorField';

const Input = styled.input`
    width:100%;
    border-radius:8px;
    padding: 20px 20px 5px 20px;
    border: 2px solid ${props => props.theme.color.primaryColor};
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    box-sizing: border-box;
    line-height: 1.2em;
    height:55px;
    background-color: ${props => props.theme.color.white};
    outline: unset;
    &:focus {
        outline: none;
        border: 2px solid ${props => props.theme.color.primaryDarkColor};
    };
    & ~ label{
        color:${props => props.theme.color.primaryDarkColor};
        font-family: ${props => props.theme.font.family};
        font-size: 14px;
        position:absolute;    
        font-weight: 400;
        top: 4px;
        left:10px;
    }
`;

const InputContainer = styled.div`
    width:100%;
    position:relative;
    margin:0rem 1rem 0rem 1rem;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: ${props => props.theme.font.weight.bold};
`;


export const StyledInput = ({name, id, type, handleChange, handleBlur, value, errors, touched, label, noWhitesSpaces}) => {
    const removeWhiteSpaces = useCallback(
        (value , check) => {
            if (check) return value.toString().trim()
            return value
        }, [value]);
    return (
        <InputContainer>
            <Input
                name={name}
                id={id}
                type={type}
                onChange={handleChange}
                onBlur={handleBlur}
                value={removeWhiteSpaces(value, noWhitesSpaces)}
            />
            <label>{label}</label>
            <ErrorField errorMessage={errors} touched={touched} />
        </InputContainer>
        
    )
}


export default Input;