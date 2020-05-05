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

const PageContainer = styled.div`
  position:absolute;
  left:0px;
  top:0px;
  width:100%;
  height:100%;
`;
const Body = styled.div`
  background-color:${props => props.theme.color.backgroundColor};
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
            <ThemeProvider theme={IsDarkMode ? dark : light }>
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