import React from 'react';
import styled from 'styled-components';
import Select from 'react-select'
import {SelectColourStyles} from '../../constants/constants';


const InputContainer = styled.div`
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: 500;
    margin:0.1rem 1rem 0.1rem 1rem;
    width:100%;
    position:relative;
`;
const CustomSelect = styled(Select)`
    & > div{
        padding-bottom:unset;
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


const StyledSelect = (props) => {
    const {options,
           value,
           onChange,
           label,
           name,
           placeholder} = props;

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
        </InputContainer>
    )
}


export default StyledSelect;