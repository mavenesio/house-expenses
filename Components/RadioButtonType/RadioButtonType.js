// @ts-nocheck
import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';

import CreditCard from '../../Components/Icons/CreditCard';
import Home from '../../Components/Icons/Home';
import Cash from '../../Components/Icons/Cash';
import ShoppingCart from '../../Components/Icons/ShoppingCart';
import Important from '../../Components/Icons/Important';
import CarSolid from '../../Components/Icons/CarSolid';
import FemaleSolid from '../../Components/Icons/FemaleSolid';
import MaleSolid from '../../Components/Icons/MaleSolid';
import BusSolid from '../../Components/Icons/BusSolid';
import TimesCircle from '../../Components/Icons/TimesCircle';


const RadioButtonTypeContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    flex-wrap:wrap;
`;

const IconWrapper = styled.div`
    color:${props => props.iconcolor};    
    margin: 0rem 0.5rem;
    font-size: 20px;
    padding:0.2rem 0.2rem 0rem 0.2rem;
    border-radius:30%;
    cursor:pointer;
`;


const RadioButtonType = ({ value, onChange, cleanAvailable }) => {
    
    return (
        <RadioButtonTypeContainer>
            {
                cleanAvailable &&
                <IconWrapper onClick={() => onChange('')}       iconcolor={'gray'}><TimesCircle /></IconWrapper>
            }
            <IconWrapper onClick={() => onChange('House')}      iconcolor={value === 'House' ?      '#0062ff' : 'gray'}><Home /></IconWrapper>
            <IconWrapper onClick={() => onChange('Market')}     iconcolor={value === 'Market' ?     '#00FF00' : 'gray'}><ShoppingCart /></IconWrapper>
            <IconWrapper onClick={() => onChange('CreditCard')} iconcolor={value === 'CreditCard' ? '#008080' : 'gray'}><CreditCard /></IconWrapper>
            <IconWrapper onClick={() => onChange('Cash')}       iconcolor={value === 'Cash' ?       '#FFFF00' : 'gray'}><Cash /></IconWrapper>
            <IconWrapper onClick={() => onChange('Important')}  iconcolor={value === 'Important' ?  '#FF0000' : 'gray'}><Important /></IconWrapper>
            <IconWrapper onClick={() => onChange('Car')}        iconcolor={value === 'Car' ?        '#0000FF' : 'gray'}><CarSolid /></IconWrapper>
            <IconWrapper onClick={() => onChange('Female')}     iconcolor={value === 'Female' ?     '#FF00FF' : 'gray'}><FemaleSolid /></IconWrapper>
            <IconWrapper onClick={() => onChange('Male')}       iconcolor={value === 'Male' ?       '#808000' : 'gray'}><MaleSolid /></IconWrapper>
            <IconWrapper onClick={() => onChange('Bus')}        iconcolor={value === 'Bus' ?        '#00FFFF' : 'gray'}><BusSolid /></IconWrapper>
        </RadioButtonTypeContainer>
    )
}


export default RadioButtonType;







