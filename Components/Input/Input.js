import React,{useCallback} from 'react';
import styled from 'styled-components';
import ErrorField from '../ErrorField/ErrorField';

const Input = styled.input`
    width:100%;
    padding: 20px 20px 5px 20px;
    border:unset;
    border-radius: 8px 8px 0px 0px;
    border-bottom: 2px solid ${props => props.theme.color.gray};
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    box-sizing: border-box;
    line-height: 1.2em;
    height:55px;
    background-color: ${props => props.theme.color.backgroundPrimaryColor};
    color: ${props => props.theme.color.backgroundSecondaryColor};
    outline: unset;
    &:focus {
        outline: none;
        border-bottom: 2px solid ${props => props.theme.color.primaryDarkColor};
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
    min-width:125px;    
    position:relative;
    margin:0rem 1rem 0rem 1rem;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: ${props => props.theme.font.weight.bold};
    @media (max-width: 768px) {
        width:100%;
    }
`;


export const StyledInput = ({name, id, type, handleChange, handleBlur, value, errors, touched, label, noWhitesSpaces, noCharacters}) => {
    const formatValue = useCallback(
        (value , noWhitesSpaces, noCharacters) => {
            let formatedValue = value;
            if (noWhitesSpaces) formatedValue = formatedValue.toString().trim();
            if (noCharacters) formatedValue = formatedValue.replace(/[a-zA-Z]/g, '');
            return formatedValue
        }, [value]);
    return (
        <InputContainer>
            <Input
                name={name}
                id={id}
                type={type}
                onChange={handleChange}
                onBlur={handleBlur}
                value={formatValue(value, noWhitesSpaces, noCharacters)}
            />
            <label>{label}</label>
            <ErrorField errorMessage={errors} touched={touched} />
        </InputContainer>
        
    )
}


export default Input;