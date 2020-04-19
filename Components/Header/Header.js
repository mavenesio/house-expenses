import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HeaderContainer = styled.div`
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    cursor:pointer;
    display:flex;
    width:100%;
    height:10%;
    background-color:${props => props.theme.color.primaryDarkColor};
    grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.subTitle};
    color:${props => props.theme.color.white};
`;
const HeaderText = styled.div`
    align-self:center;
    padding-left: 1rem;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <Link href={'./index'}>
                <HeaderText>
                    Gastos
                </HeaderText>
            </Link>
        </HeaderContainer>
    )
}



export default Header


