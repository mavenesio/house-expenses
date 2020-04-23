// @ts-nocheck
 
import React from 'react'
import styled, { ThemeProvider } from "styled-components";
import Head from 'next/head';
import {useRouter} from 'next/router';
import {ApolloProvider} from '@apollo/client';
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
  overflow-x:scroll;
  height:${props => props.fullBody ? '100%' : '90%'};
`;

const MyApp = ({Component, pageProps})=>  {
    const router = useRouter();

    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Head>
            <title>Simulator</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet" />
          </Head>
          <PageContainer>
            <Body fullBody={router.pathname === '/' || router.pathname === '/Index'}>
                  <Component {...pageProps} />
            </Body>
            {
              (router.pathname !== '/' && router.pathname !== '/Index') && <FooterNavbar />
            }
          </PageContainer>
        </ApolloProvider>
      </ThemeProvider>
    )
}

export default MyApp;