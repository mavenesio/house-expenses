 
import NextApp from 'next/app'
import React from 'react'
import theme from '../constants/Theme';
import styled, { ThemeProvider } from "styled-components";
import Head from 'next/head'
import Header from '../Components/Header/Header';
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
  height:80%;
`;export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
          <Head>
            <title>Simulator</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;lang=en" />
          </Head>
          <PageContainer>
            <Header />
            <Body>
              <Component {...pageProps} />
            </Body>
            <FooterNavbar />
          </PageContainer>
      </ThemeProvider>
    )
  }
}