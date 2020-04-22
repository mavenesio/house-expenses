// @ts-nocheck
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import PlusSquare from '../Icons/PlusSquare';
import ChartBar from '../Icons/ChartBar';
import FileRegular from '../Icons/FileRegular';
import Modal from '../Modal/Modal';
import ModalCard from '../Modal/ModalCard';

import Link from 'next/link';

const FooterNavbarContainer = styled.div`
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    cursor:pointer;
    height:10%;
    width:100%;
    background-color:${props => props.theme.color.primaryDarkColor};
    grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.subTitle};
    color:${props => props.theme.color.white};
    display:flex;
    flex-direction:row;
    justify-content:center;
`;
const PlusButton = styled(PlusSquare)`
    align-self:center;
    font-size: 40px;
    color: black;
    margin: 0rem 1rem 0rem 1rem;
    &:hover{
        color: ${props => props.theme.color.primaryLightColor};
    }
`;
const HistoryButton = styled(FileRegular)`
    align-self:center;
    font-size: 40px;
    color: black;
    margin: 0rem 1rem 0rem 1rem;
    &:hover{
        color: ${props => props.theme.color.primaryLightColor};
    }
`;
const ChartButton = styled(ChartBar)`
    align-self:center;
    font-size: 40px;
    color: black;
    margin: 0rem 1rem 0rem 1rem;
    &:hover{
        color: ${props => props.theme.color.primaryLightColor};
    }
`;


const FooterNavbar = () => {
    const [ModalIsVisible, setModalIsVisible] = useState(false);
    const router = useRouter();

    return (<>
                {
                    (router.pathname !== '/' && router.pathname !== '/Loginpage') && 
                    <>
                        <FooterNavbarContainer>
                            <PlusButton onClick={() => setModalIsVisible(!ModalIsVisible)}/>
                            <HistoryButton onClick={() => console.log('2222')}/>
                            <ChartButton onClick={() => console.log('3333')}/>
                        </FooterNavbarContainer>
                        <Modal
                            isVisible={ModalIsVisible} 
                            changeVisibility={() => setModalIsVisible(!ModalIsVisible)}>
                                <ModalCard changeVisibility={() => setModalIsVisible(!ModalIsVisible)} />
                        </Modal >
                    </>
                }
            </>
            )
}

export default FooterNavbar


