// @ts-nocheck
 
import React, {useState} from 'react'
import styled, { ThemeProvider } from "styled-components";

import Head from 'next/head';
import {useRouter} from 'next/router';
import {ApolloProvider} from '@apollo/client';
import ExpenseState from '../context/expenses/ExpenseState';
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
  height:${props => props.fullBody ? '100%' : '90%'};
  overflow-x: hidden;
`;

const MyApp = ({Component, pageProps})=>  {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(true);
    
    return (
      <ThemeProvider theme={isDarkMode ? dark : light}>
        <ApolloProvider client={client}>
          <Head>
            <title>Expenses</title>
          </Head>
          <ExpenseState>
            <PageContainer>
              <Body fullBody={router.pathname === '/' || router.pathname === '/Index'}>
              <Header changeMode={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} page={router.pathname} />
                  <Component {...pageProps} />
              </Body>
              {
                (router.pathname !== '/' && router.pathname !== '/Index') && <FooterNavbar />
              }
            </PageContainer>
          </ExpenseState>
        </ApolloProvider>
      </ThemeProvider>
    )
}

export default MyApp;