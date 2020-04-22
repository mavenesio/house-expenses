// @ts-nocheck
import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import Header from '../Components/Header/Header';
import fetch from 'isomorphic-unfetch';
import ExpensesTable from '../Components/ExpensesTable/ExpensesTable';

function Homepage({data}) {
  const [currentExpenses, setcurrentExpenses] = useState(data);
  
  useEffect(() => {
    () => {
      setcurrentExpenses(data);
    }
  }, [data]);
  
  return (
    <>
      <Header title='A PAGAR ESTE MES' />
      <ExpensesTable dataTable={currentExpenses}/>
    </>
  )

}

Homepage.getInitialProps = async ctx => {
  const res = await fetch(`http://localhost:3000/api/getCurrentExpenses`);
  const data = await res.json();
  return { data: data }
}

export default Homepage
