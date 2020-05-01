import React from 'react';
import styled from 'styled-components';
import Select from 'react-select'
import {SelectColourStyles} from '../../constants/constants';
import ErrorField from '../ErrorField/ErrorField';


const InputContainer = styled.div`
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: 500;
    width:100%;
    margin:0rem 1rem 0rem 1rem;
    position:relative;
`;
const CustomSelect = styled(Select)`
    & > div{
        padding-bottom:unset;
        background-color: ${props => props.theme.color.white};
        height:55px;
        & > div > div {
            top:60%;
        }
    }
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


const StyledSelect = ({options, value, onChange, label, name, placeholder,  errors, touched}) => {
    return (
        <InputContainer>
            <CustomSelect 
                styles={SelectColourStyles}
                options={options}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                inputId={name}
            />
            <label>{label}</label>
            <ErrorField errorMessage={errors} touched={touched} />
        </InputContainer>
    )
}


export default StyledSelect;