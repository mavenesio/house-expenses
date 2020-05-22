// @ts-nocheck
import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';

import CreditCard from '../../Components/Icons/CreditCard';
import Home from '../../Components/Icons/Home';
import Cash from '../../Components/Icons/Cash';
import ShoppingCart from '../../Components/Icons/ShoppingCart';
import Important from '../../Components/Icons/Important';


const RadioButtonTypeContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    width:100%;
`;

const IconWrapper = styled.div`
    color:${props => props.iconcolor};    
    margin: 0rem 1rem;
    font-size: 20px;
    padding:0.2rem 0.2rem 0rem 0.2rem;
    border-radius:30%;
    cursor:pointer;
`;


const RadioButtonType = ({ value, onChange }) => {
    
    return (
        <RadioButtonTypeContainer>
            <IconWrapper onClick={() => onChange('House')} iconcolor={value === 'House' ? '#0062ff' : 'gray'}><Home /></IconWrapper>
            <IconWrapper onClick={() => onChange('Market')} iconcolor={value === 'Market' ? 'green' : 'gray'}><ShoppingCart /></IconWrapper>
            <IconWrapper onClick={() => onChange('CreditCard')} iconcolor={value === 'CreditCard' ? 'violet' : 'gray'}><CreditCard /></IconWrapper>
            <IconWrapper onClick={() => onChange('Cash')} iconcolor={value === 'Cash' ? 'orange' : 'gray'}><Cash /></IconWrapper>
            <IconWrapper onClick={() => onChange('Important')} iconcolor={value === 'Important' ? 'red' : 'gray'}><Important /></IconWrapper>
        </RadioButtonTypeContainer>
    )
}


export default RadioButtonType;







