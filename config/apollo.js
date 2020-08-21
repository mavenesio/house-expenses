import {ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch';
import {setContext} from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: process.env.API_URL,
    fetch
});
const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
const authLink = setContext((_, {headers}) => {
    
    const token = localStorage.getItem('token');
    
    return {
        headers:{
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    }
});


const client = new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
    link: authLink.concat(httpLink),
});



export default client;