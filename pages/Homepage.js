// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';
import {useRouter} from 'next/router';
import { gql, useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';

import Header from '../Components/Header/Header';
import ExpensesTable from '../Components/ExpensesTable/ExpensesTable';
import Spinner from '../Components/Spinner/Spinner';
import Modal from '../Components/Modal/Modal';
import UpdateExpenseCard from '../Components/Modal/UpdateExpenseCard';
import CreateExpenseCard from '../Components/Modal/CreateExpenseCard';
import PlusSquare from '../Components/Icons/PlusSquare';
import { MonthOptions } from '../constants/constants';
import {route} from 'next/dist/next-server/server/router';

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
const PAID_EXPENSE = gql`
    mutation payExpense($input:payExpenseInput!){
        payExpense(input: $input){
            id,
            name,
            paid,
            amount
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
  const [payExpense] = useMutation(PAID_EXPENSE);
  const [SelectedRow, setSelectedRow] = useState(null);
  const [CreateModalVisibility, setCreateModalVisibility] = useState(false);
  const [UpdateModalVisibility, setUpdateModalVisibility] = useState(false);
  const [Data, setData] = useState(null);
  const router = useRouter();
  const paidExpense =  useCallback(
    async (expenseId, paid) => {
      try {
        const expenseUpdate = await payExpense({variables: { input: {expenseId: expenseId, paid: !paid }}});
      } catch (err) {
        console.log(err);
      }
    });
    useEffect(() => { data ? setData(data.getExpenses) : setData(null)}, [data]);
    useEffect(() => { (!loading && data === undefined) ? router.push('/') : console.log('valid user')}, [loading]);
    
  

  return (
    <>
      <Spinner loading={loading}/>
      <Header title={`A PAGAR EN ${(MonthOptions[(new Date()).getMonth()].label).toUpperCase()}`} logOutVisible={true}/>
      <IconContainer>
        <PlusButton onClick={() => setCreateModalVisibility(!CreateModalVisibility)}/>
      </IconContainer>
      <ExpensesTable 
        dataTable={Data}
        onCheck={(id, paid) => paidExpense(id, paid)}
        onEdit={(value) => {setUpdateModalVisibility(!UpdateModalVisibility); setSelectedRow(value)}}
        setSelectedRow/>

      <Modal isVisible={CreateModalVisibility} changeVisibility={() => setCreateModalVisibility(!CreateModalVisibility)}>
        <CreateExpenseCard changeVisibility={() => {setCreateModalVisibility(!CreateModalVisibility); refetch()}}/>
      </Modal>
      <Modal isVisible={UpdateModalVisibility} changeVisibility={() => setUpdateModalVisibility(false)}>
        <UpdateExpenseCard expense={SelectedRow} changeVisibility={() => {setUpdateModalVisibility(false); refetch()}}/>
      </Modal>
    </>
  )

}

export default Homepage
