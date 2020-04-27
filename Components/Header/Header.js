import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {useRouter} from 'next/router';
import PowerOff from '../Icons/PowerOff';

const HeaderContainer = styled.div`
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    cursor:pointer;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
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
    font-weight:800;
`;
const LogOutButton = styled(PowerOff)`
    align-self:center;
    font-size: 30px;
    color: white;
    margin: 0rem 1rem 0rem 1rem;
    &:hover{
        color: ${props => props.theme.color.primaryLightColor};
    }
`;

const Header = (props) => {
    const {title, logOutVisible} = props;
    const router = useRouter();
    return (
        <HeaderContainer>
            <Link href={'./Homepage'}>
                <HeaderText>
                    {title}
                </HeaderText>
            </Link>
            {
                logOutVisible && <LogOutButton onClick={() => {localStorage.removeItem('token'); router.push('/')}} />
            }
        </HeaderContainer>
    )
}



export default Header


