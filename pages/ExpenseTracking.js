// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useLazyQuery, useQuery } from '@apollo/client';
import gql from "graphql-tag";

import StyledSelect from '../Components/StyledSelect/StyledSelect';
import ExpensesDataTable from '../Components/ExpensesDataTable/ExpensesDataTable';
import Spinner from '../Components/Spinner/Spinner';

const ExpenseTrackingContainer = styled.div`
  padding:2rem;
  & > * {
    margin-top:1rem;
  }
`;
const CustomSelect = styled(StyledSelect)`

`;
const GET_USER_EXPENSES_NAMES = gql`
    query getAllExpenses{
      getAllExpenses {
        name
      }
    }
`;

const GET_USER_EXPENSES_DATA = gql`
    query getExpenseData($input: getExpenseDataInput){
      getExpenseData(input: $input) {
        id
        name
        amount
        currentMonth
        currentYear
        paid
      }
    }
`;

const ExpenseTracking = () => {
  const {data: expenseNames, loading: loadingExpenseName} = useQuery(GET_USER_EXPENSES_NAMES);
  const [ loadExpenses, { loading: loadingExpenseData, data:expenseData }] = useLazyQuery(GET_USER_EXPENSES_DATA);
  const [ExpenseSelected, setExpenseSelected] = useState(null);
  const [ExpenseNames, setExpenseNames] = useState([]);
  const [ExpenseDataTable, setExpenseDataTable] = useState(null);

  useEffect(() => {if(expenseNames) setExpenseNames(expenseNames.getAllExpenses.map((expenseName,index) => ({value: index, label: expenseName.name})))}, [loadingExpenseName]);
  useEffect(() => {if(expenseData) setExpenseDataTable(expenseData.getExpenseData)}, [expenseData]);
  
  const getExpenseDataCallback = useCallback((name) => loadExpenses({variables: { input: { name: name}}}),[])
  
  return (
      <ExpenseTrackingContainer>
          <CustomSelect
            value={ExpenseSelected}
            onChange={(value)=> {setExpenseSelected(value);getExpenseDataCallback(value.label)}}
            name='expenseSelected'
            options={ExpenseNames}
            label='Select expense'
            errors=''
            touched={false}
          />
          <ExpensesDataTable
            dataTable={ExpenseDataTable}
          />
      </ExpenseTrackingContainer>
  )

}

export default ExpenseTracking
