// @ts-nocheck
import React, {useState, useEffect, useCallback} from 'react';
import {gql, useQuery} from '@apollo/client';
import styled from 'styled-components';
import Header from '../Components/Header/Header';
import ExpensesTable from '../Components/ExpensesTable/ExpensesTable';
import Spinner from '../Components/Spinner/Spinner';

const GET_USER_EXPENSES = gql`
    query getExpenses{
      getExpenses{
        id
        name
        amount
      }
    }
`;


const Homepage = () => {
  const {data, loading, error} = useQuery(GET_USER_EXPENSES);
  const [ActualMonth, setActualMonth] = useState((new Date()).toLocaleString('default', { month: 'long' }).toUpperCase())

  return (
    <>
      <Spinner loading={loading}/>
      <Header title={`A PAGAR EN`} />
      <ExpensesTable dataTable={data ? data.getExpenses : undefined}/>
    </>
  )

}

export default Homepage
