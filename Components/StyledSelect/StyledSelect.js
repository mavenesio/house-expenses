import React from 'react';
import styled from 'styled-components';
import Select from 'react-select'
import ErrorField from '../ErrorField/ErrorField';
import theme from '../../Theme/light';

const SelectColourStyles = {
    control: (styles, { isFocused }) => {
      return ({
        ...styles,
        borderRadius: 'unset',
        padding: '10px',
        weight: 500,
        border: 'unset',
        borderBottom: isFocused ? `2px solid ${theme.color.primaryDarkColor}` : `2px solid ${theme.color.gray}`,
        boxShadow: isFocused ? 0 : 0,
        backgroundColor: 'transparent',
        '&:hover': {
        }
      });
    },
    option: (styles, { isFocused, isSelected }) => {
      return {
        ...styles,
        color: 'black',
        weight: 500,
        backgroundColor: isFocused ? '#e6e6e6' : isSelected ? '#e6e6e6' : 'white',

      };
    }
  };
const InputContainer = styled.div`
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: 500;
    width:100%;
    min-width:125px;
    position:relative;
`;
const CustomSelect = styled(Select)`
    & > div{
        border-radius: 8px 8px 0px 0px;
        padding-bottom:unset;
        background-color: ${props => props.theme.color.backgroundPrimaryColor};
        height:55px;
        & > div > div {
            top:60%;
            color: ${props => props.theme.color.backgroundSecondaryColor};
        background-color: ${props => props.theme.color.backgroundPrimaryColor};
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