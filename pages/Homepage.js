// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

import Header from '../Components/Header/Header';
import ExpensesTable from '../Components/ExpensesTable/ExpensesTable';
import Spinner from '../Components/Spinner/Spinner';
import Modal from '../Components/Modal/Modal';
import CreateExpenseCard from '../Components/Modal/CreateExpenseCard';
import PlusSquare from '../Components/Icons/PlusSquare';
import { MonthOptions } from '../constants/constants';

const GET_USER_EXPENSES = gql`
    query getExpenses{
      getExpenses{
        id
        name
        amount
        paid
      }
    }
`;
const IconContainer = styled.div`
  display:flex; 
  flex-direction:row;
  justify-content:flex-end;
`;
const PlusButton = styled(PlusSquare)`
    align-self:flex-end;
    padding:0.5rem;
    cursor: pointer;
    font-size: 50px;
    color: ${props => props.theme.color.primaryDarkColor};
    margin: 0rem 1rem 0rem 1rem;
    &:hover{
        color: ${props => props.theme.color.primaryLightColor};
    }
`;

const Homepage = () => {
  const {data, loading, error, refetch} = useQuery(GET_USER_EXPENSES);
  const [CreateExpenseModalIsVisible, setCreateExpenseModalIsVisible] = useState(false);
  const [Data, setData] = useState(null);

  useEffect(() => { data ? setData(data.getExpenses) : setData(null)}, [data]);

  return (
    <>
      <Spinner loading={loading}/>
      <Header title={`A PAGAR EN ${(MonthOptions[(new Date()).getMonth()].label).toUpperCase()}`} logOutVisible={true}/>
      <IconContainer>
        <PlusButton onClick={() => setCreateExpenseModalIsVisible(!CreateExpenseModalIsVisible)}/>
      </IconContainer>
      <ExpensesTable dataTable={Data} updateDataTable={refetch} onEdit={() => setUpdateExpenseModalIsVisible(!UpdateExpenseModalIsVisible)}/>
      <Modal isVisible={CreateExpenseModalIsVisible} changeVisibility={() => setCreateExpenseModalIsVisible(!CreateExpenseModalIsVisible)}>
        <CreateExpenseCard changeVisibility={() => {setCreateExpenseModalIsVisible(!CreateExpenseModalIsVisible); refetch()}} />
      </Modal>
    </>
  )

}

export default Homepage
