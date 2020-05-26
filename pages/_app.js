// @ts-nocheck
 
import React, {useState, useContext} from 'react'
import styled, { ThemeProvider } from "styled-components";

import Head from 'next/head';
import {useRouter} from 'next/router';
import {ApolloProvider} from '@apollo/client';
import ExpenseState from '../context/expenses/ExpenseState';
import UserState from '../context/user/UserState';
import client from '../config/apollo';
import Header from '../Components/Header/Header';

import dark from '../Theme/dark';
import light from '../Theme/light';
import FooterNavbar from '../Components/FooterNavbar/FooterNavbar';

import 'react-toastify/dist/ReactToastify.css';

const PageContainer = styled.div`
  position:absolute;
  left:0px;
  top:0px;
  width:100%;
  height:100%;
  background-color: #e7e6f7;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23363732' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23042a2b' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23405d60' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23267373' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%2349787f' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23359c9d' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23508d97' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%2341bdbd' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%2357a0ac' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%234bd9d9' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%235eb1bf' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%2354f2f2' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
`;
const Body = styled.div`
  overflow-x:scroll;
  height:${props => props.fullBody ? 'calc(100% - 4rem)' : 'calc(100% - 8rem)'};
  overflow-x: hidden;
`;

const MyApp = ({Component, pageProps})=>  {
    const router = useRouter();
    const [IsDarkMode, setIsDarkMode] = useState(true);
    
    return (
      <ApolloProvider client={client}>
        <UserState>
          <ExpenseState>
            <ThemeProvider theme={IsDarkMode ? light : dark }>
              <Head>
                <title>Expenses</title>
              </Head>
              <PageContainer>
                <Header setIsDarkMode={setIsDarkMode} IsDarkMode={IsDarkMode} page={router.pathname} />
                <Body fullBody={router.pathname === '/' || router.pathname === '/Index'}>
                  <Component {...pageProps} />
                </Body>
                {
                (router.pathname !== '/' && router.pathname !== '/Index') && <FooterNavbar />
                }
              </PageContainer>
            </ThemeProvider>
          </ExpenseState>
        </UserState>
      </ApolloProvider>
    )
}

export default MyApp;