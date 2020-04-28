// @ts-nocheck
import React, { useState, useEffect, useCallback, useContext } from 'react';
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
import ExpenseContext from '../context/expenses/ExpenseContext';

const GET_USER_EXPENSES = gql`
    query getExpenses{
      getExpenses{
        id
        name
        amount
        paid,
        type
      }
    }
`;
const PAID_EXPENSE = gql`
    mutation payExpense($input:payExpenseInput!){
        payExpense(input: $input){
            id,
            name,
            paid,
            amount,
            type
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
  const {data, loading, error} = useQuery(GET_USER_EXPENSES);
  const expenseContext = useContext(ExpenseContext);
  const [SelectedRow, setSelectedRow] = useState(null);
  const [CreateModalVisibility, setCreateModalVisibility] = useState(false);
  const [UpdateModalVisibility, setUpdateModalVisibility] = useState(false);
  const router = useRouter();
  useEffect(() => { if(data){expenseContext.setExpenses(data.getExpenses)}}, [data]);
  useEffect(() => {if(!loading && data === undefined) router.push('/')}, [loading]);
  const [payExpense] = useMutation(PAID_EXPENSE);
  const paidExpense =  useCallback(
    async (expenseId, paid) => {
      try {
        const {data} = await payExpense({variables: { input: {expenseId: expenseId, paid: !paid }}});
        expenseContext.updateExpense(data.payExpense);
      } catch (err) {
        console.log(err);
      }
    });

  return (
    <>
      <Spinner loading={loading}/>
      <Header title={`A PAGAR EN ${(MonthOptions[(new Date()).getMonth()].label).toUpperCase()}`} logOutVisible={true}/>
      
      <IconContainer>
        <PlusButton onClick={() => setCreateModalVisibility(!CreateModalVisibility)}/>
      </IconContainer>
      
      <ExpensesTable 
        dataTable={expenseContext.expenses}
        onCheck={(id, paid) => paidExpense(id, paid)}
        onEdit={(value) => {setUpdateModalVisibility(!UpdateModalVisibility); setSelectedRow(value)}}
        setSelectedRow/>

      <Modal isVisible={CreateModalVisibility} changeVisibility={() => setCreateModalVisibility(!CreateModalVisibility)}>
        <CreateExpenseCard changeVisibility={() => {setCreateModalVisibility(!CreateModalVisibility)}}/>
      </Modal>
      <Modal isVisible={UpdateModalVisibility} changeVisibility={() => setUpdateModalVisibility(false)}>
        <UpdateExpenseCard expense={SelectedRow} changeVisibility={() => {setUpdateModalVisibility(false)}}/>
      </Modal>
    </>
  )

}

export default Homepage
