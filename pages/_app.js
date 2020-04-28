// @ts-nocheck
 
import React from 'react'
import styled, { ThemeProvider } from "styled-components";
import Head from 'next/head';
import {useRouter} from 'next/router';
import {ApolloProvider} from '@apollo/client';
import ExpenseState from '../context/expenses/ExpenseState';
import client from '../config/apollo';

import theme from '../constants/Theme';
import FooterNavbar from '../Components/FooterNavbar/FooterNavbar';

const PageContainer = styled.div`
  position:absolute;
  left:0px;
  top:0px;
  width:100%;
  height:100%;
`;
const Body = styled.div`
  background-color:${props => props.theme.color.darkGray};
  overflow-x:scroll;
  height:${props => props.fullBody ? '100%' : '90%'};
  overflow-x: hidden;
`;

const MyApp = ({Component, pageProps})=>  {
    const router = useRouter();

    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Head>
            <title>Expenses</title>
          </Head>
          <ExpenseState>
            <PageContainer>
              <Body fullBody={router.pathname === '/' || router.pathname === '/Index'}>
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