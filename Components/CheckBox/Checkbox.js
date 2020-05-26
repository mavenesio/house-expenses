// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import Check from '../Icons/CheckSolid';

const CheckBoxContainer = styled.label `
  display: flex;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: ${props => props.theme.font.family};
  margin:0rem 1rem 0rem 1rem;
`;
const CircleCheck = styled(Check)`
    color: ${props => props.checked ? props.theme.color.primaryDarkColor : 'transparent' };
    position:absolute;
    font-size: 20px;
    align-self:center;
    position: absolute;
    top:1.5px;
    left:1.5px;
    border-radius:50%;
    padding:1px;
    border: 2px solid ${props => props.theme.color.primaryDarkColor};
`;

const CheckBoxInput = styled.input.attrs({type: 'checkbox'})`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const CheckBox = ({title, onCheck, checked } ) => {
    return (
      <CheckBoxContainer >
      {title}
        <CheckBoxInput onChange={onCheck} checked={checked} />
        <CircleCheck checked={checked}/>
      </CheckBoxContainer>
    );
}

export default CheckBox;
