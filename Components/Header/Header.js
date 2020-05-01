import React, {useCallback, useEffect, useContext} from 'react';
import {useMutation, gql} from'@apollo/client';
import styled from 'styled-components';
import client from '../../config/apollo';
import Link from 'next/link';
import {useRouter} from 'next/router';
import PowerOff from '../Icons/PowerOff';
import LightOff from '../Icons/LightOff';
import LightOn from '../Icons/LightOn';
import UserContext from '../../context/user/UserContext';


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
`;
const LightOffIcon = styled(LightOff)`
    color: #a2a6a6;
    font-size:40px;
`;

const SET_USER_PREFERENCE = gql`
    mutation setUserPreference($input: UserPreferenceInput!) {
        setUserPreference(input: $input) {
            key,
            value
        }
    }
`;

const Header = ({page, setIsDarkMode, IsDarkMode}) => {
    const router = useRouter();
    const userContext = useContext(UserContext);
    const [setUserPreference] = useMutation(SET_USER_PREFERENCE);
    const {toggleMode, mode} = userContext;
    setIsDarkMode(mode === 'dark');
    
    const getTitle = useCallback(
        (page) => {
            if (page === undefined) return ''
            let headerText = '';
            switch (page.toLowerCase()) {
                case '/index':
                case '/': return 'Login';
                case '/homepage': headerText = 'This month expenses';break;
                case '/expensehistory': headerText = 'EXPENSE HISTORY';break;
                case '/expensereports': headerText = 'EXPENSE REPORTS';break;
                case '/expensetracking': headerText = 'EXPENSE TRACKING';break;
                default: headerText = '';
            }
            return headerText;
        },[]);
    const swithTheme = useCallback(
        async (mode) => {
            setIsDarkMode(mode === 'dark'); 
            toggleMode(mode);
            try {
                await setUserPreference({variables: { input: { key: 'Mode', value: mode } }});
            } catch (err) {
                const message = err.message.replace('GraphQL error:', '');
                console.log(message);
            }
        },[]);
    const logOut = useCallback(
        () => {
            localStorage.removeItem('token');
            toggleMode('dark');
            client.cache.reset();
            router.push('/');
        },[]);

    return (
        <HeaderContainer>
            <Link href={'./Homepage'}>
                <HeaderText>
                    {getTitle(page)}
                </HeaderText>
            </Link>
            {
                (page !== '/' && page !== '/index') &&
                <SwitchContainer >
                    {
                        IsDarkMode
                        ? <LightOffIcon onClick={() => swithTheme('light')} />
                        : <LightOnIcon  onClick={() => swithTheme('dark')} />
                    }
                    <LogOutButton onClick={logOut} />
                </SwitchContainer> 
            }
        </HeaderContainer>
    )
}



export default Header


