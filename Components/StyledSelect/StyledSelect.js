import React from 'react';
import styled from 'styled-components';
import Select from 'react-select'
import {SelectColourStyles} from '../../constants/constants';


const InputContainer = styled.div`
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: ${props => props.theme.font.weight.bold};
    margin:1rem;
    position:relative;
`;
const CustomSelect = styled(Select)`
    & ~ label{
        color:${props => props.theme.color.primaryDarkColor};
        font-family: ${props => props.theme.font.family};
        font-size: 14px;
        position:absolute;
        top:0px;
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
                onChange={(value) => onChange(value)}
                placeholder={placeholder}
                name={name}
                inputId={name}
            />
            <label>{label}</label>
        </InputContainer>
    )
}


export default StyledSelect;