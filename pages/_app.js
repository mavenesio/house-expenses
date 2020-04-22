 
import React from 'react'
import theme from '../constants/Theme';
import styled, { ThemeProvider } from "styled-components";
import Head from 'next/head';
import {ApolloProvider} from '@apollo/client';
import client from '../config/apollo';
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
  height:90%;
`;

const MyApp = ({Component, pageProps})=>  {

    return (
      <ThemeProvider theme={theme}>
          <Head>
            <title>Simulator</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet" />
          </Head>
          <PageContainer>
            <Body>
              <ApolloProvider client={client}>
                  <Component {...pageProps} />
              </ApolloProvider>
            </Body>
            <FooterNavbar />
          </PageContainer>
      </ThemeProvider>
    )
}

export default MyApp;