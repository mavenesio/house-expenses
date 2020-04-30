import React, {useCallback} from 'react';
import styled from 'styled-components';
import client from '../../config/apollo';
import Link from 'next/link';
import {useRouter} from 'next/router';
import PowerOff from '../Icons/PowerOff';
import LightOff from '../Icons/LightOff';
import LightOn from '../Icons/LightOn';

const HeaderContainer = styled.div`
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    cursor:pointer;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    width:100%;
    height:4rem;
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
        color: ${props => props.theme.color.black};
    }
`;
const SwitchContainer = styled.div`
    align-self:center;
    margin: 0rem 1rem 0rem 1rem;
`;
const LightOnIcon = styled(LightOn)`
    color: #ffe736;
    font-size:40px;
    &:hover{
        color: #a2a6a6;
    }
`;
const LightOffIcon = styled(LightOff)`
    color: #a2a6a6;
    font-size:40px;
    &:hover{
        color: #ffe736;
    }
`;

const Header = ({page, changeMode, isDarkMode}) => {
    const router = useRouter();
    const getTitle = useCallback(
        (page) => {
            if (page === undefined) return ''
            switch (page.toLowerCase()) {
                case '/index': return 'Login';
                case '/': return 'Login';
                case '/homepage': return 'This month expenses';
                default: return '';
            }
        },[])

    return (
        <HeaderContainer>
            <Link href={'./Homepage'}>
                <HeaderText>
                    {getTitle(page)}
                </HeaderText>
            </Link>
            {console.log(page)}
            {
                
                (page !== '/' && page !== '/index') &&
                <SwitchContainer >
                    {isDarkMode
                    ?
                    <LightOffIcon onClick={changeMode} />
                    :
                    <LightOnIcon onClick={changeMode}/>}
                    <LogOutButton onClick={() => {localStorage.removeItem('token');client.cache.reset(); router.push('/')}} />
                </SwitchContainer> 
            }
        </HeaderContainer>
    )
}



export default Header


