// @ts-nocheck
import React, { useState, useEffect, useCallback, useContext } from 'react';
import {useRouter} from 'next/router';
import { gql, useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';

import Header from '../Components/Header/Header';
import ExpensesTable from '../Components/ExpensesTable/ExpensesTable';
import Spinner from '../Components/Spinner/Spinner';

import UpdateExpenseModal from '../Components/Modal/UpdateExpenseModal';
import DeleteExpenseModal from '../Components/Modal/DeleteExpenseModal';
import CreateExpenseModal from '../Components/Modal/CreateExpenseModal';

import { MonthOptions } from '../constants/constants';
import ExpenseContext from '../context/expenses/ExpenseContext';

const GET_USER_EXPENSES = gql`
    query getExpenses($input: GetExpensesInput!){
      getExpenses(input: $input){
        id
        name
        amount
        paid,
        type
      }
    }
`;
const UPDATE_EXPENSE = gql`
    mutation updateExpense($input:UpdateExpenseInput!){
        updateExpense(input: $input){
            id,
            name,
            paid,
            amount,
            type
        }
    }
`;

const HomepageContainer = styled.div`
  background-color:${props => props.theme.color.backgroundColor};
`;
const TableContainer = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  margin-top:2rem;
  flex-wrap:wrap-reverse;
`;

const Homepage = () => {
  const {data, loading, error} = useQuery(GET_USER_EXPENSES,{
    variables:{ 
      input: {
        month: parseInt((new Date()).getMonth()),
        year: parseInt((new Date()).getFullYear()) 
      }
    }
  });
  const expenseContext = useContext(ExpenseContext);
  const [SelectedRow, setSelectedRow] = useState(null);
  const [UpdateModalVisibility, setUpdateModalVisibility] = useState(false);
  const [DeleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [CreateModalVisibility, setCreateModalVisibility] = useState(false);
  const router = useRouter();
  useEffect(() => { if(data){expenseContext.setExpenses(data.getExpenses)}}, [loading]);
  useEffect(() => {if(!loading && data === undefined) router.push('/')}, [loading]);
  const [updateExpense] = useMutation(UPDATE_EXPENSE);
  const paidExpense =  useCallback(
    async (expenseId, paid) => {
      try {
        const {data} = await updateExpense({variables: { input: {expenseId: expenseId, paid: !paid }}});
        expenseContext.updateExpense(data.updateExpense);
      } catch (err) {
        console.log(err);
      }
    });

  return (
    <HomepageContainer>
      <Spinner loading={loading}/>
      <TableContainer>
        <ExpensesTable 
          dataTable={expenseContext.expenses}
          onCheck={(id, paid) => paidExpense(id, paid)}
          onEdit={(value) => {setUpdateModalVisibility(!UpdateModalVisibility); setSelectedRow(value)}}
          onDelete={(value) => {setDeleteModalVisibility(!DeleteModalVisibility); setSelectedRow(value)}}
          onCreate={() => setCreateModalVisibility(!DeleteModalVisibility)}
          setSelectedRow/>
      </TableContainer>
      <DeleteExpenseModal visibility={DeleteModalVisibility} setVisibility={() => setDeleteModalVisibility(!DeleteModalVisibility)} expense={SelectedRow}/>
      <UpdateExpenseModal visibility={UpdateModalVisibility} setVisibility={() => setUpdateModalVisibility(!UpdateModalVisibility)} expense={SelectedRow}/>
      <CreateExpenseModal visibility={CreateModalVisibility} setVisibility={() => setCreateModalVisibility(!CreateModalVisibility)}/>
    </HomepageContainer>
  )

}

export default Homepage
