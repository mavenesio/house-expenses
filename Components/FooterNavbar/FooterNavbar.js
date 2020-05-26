// @ts-nocheck
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import ChartBar from '../Icons/ChartBar';
import SearchDollar from '../Icons/SearchDollar';
import History from '../Icons/History';
import Home from '../Icons/Home';

const FooterNavbarContainer = styled.div`
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    cursor:pointer;
    height:4rem;
    width:100%;
    background-color:${props => props.theme.color.primaryDarkColor};
    grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.subTitle};
    display:flex;
    flex-direction:row;
    justify-content:center;
    border-top: unset; 
    align-self:flex-end;
`;
const HistoryButton = styled(History)`
    align-self:center;
    font-size: 40px;
    color: ${props => props.theme.color.buttonPrimaryColor};
    margin: 0rem 1rem 0rem 1rem;
    &:hover{
        color: ${props => props.theme.color.buttonOnHoverColor};
    }
`;
const TrackingButton = styled(SearchDollar)`
    align-self:center;
    font-size: 40px;
    color: ${props => props.theme.color.buttonPrimaryColor};
    margin: 0rem 1rem 0rem 1rem;
    &:hover{
        color: ${props => props.theme.color.buttonOnHoverColor};
    }
`;
const ChartButton = styled(ChartBar)`
    align-self:center;
    font-size: 40px;
    color: ${props => props.theme.color.buttonPrimaryColor};
    margin: 0rem 1rem 0rem 1rem;
    &:hover{
        color: ${props => props.theme.color.buttonOnHoverColor};
    }
`;
const HomeButton = styled(Home)`
    align-self:center;
    font-size: 40px;
    color: ${props => props.theme.color.buttonPrimaryColor};
    margin: 0rem 1rem 0rem 1rem;
    &:hover{
        color: ${props => props.theme.color.buttonOnHoverColor};
    }
`;


const FooterNavbar = () => {
    const router = useRouter();

    return (
            <FooterNavbarContainer>
                <HomeButton onClick={() => router.push('/Homepage')} />
                <HistoryButton onClick={() => router.push('/ExpenseHistory')}/>
                <TrackingButton onClick={() => router.push('/ExpenseTracking')}/>
                {/*<ChartButton onClick={() => router.push('/ExpenseReport')}/>*/}
            </FooterNavbarContainer>
            )
}

export default FooterNavbar


