// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useLazyQuery, useQuery } from '@apollo/client';
import gql from "graphql-tag";

import StyledSelect from '../Components/StyledSelect/StyledSelect';
import ExpensesDataTable from '../Components/ExpensesDataTable/ExpensesDataTable';
import Button from '../Components/Button/Button';
import Spinner from '../Components/Spinner/Spinner';

const ExpenseTrackingContainer = styled.div`
  padding:2rem;
  & > * {
    margin-top:1rem;
  }
`;
const FilterContainer = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  flex-wrap:wrap;
`;
const Container = styled.div`
  display:flex;
  align-self:center;
  width:30%;
  margin:0rem 1rem 0rem 1rem;
  @media (max-width: 768px) {
    width:100%;
  }

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
  const {data: expenseNames, loading: loadingExpenseName, refetch} = useQuery(GET_USER_EXPENSES_NAMES);
  const [ loadExpenses, { loading: loadingExpenseData, data:expenseData }] = useLazyQuery(GET_USER_EXPENSES_DATA);
  const [ExpenseSelected, setExpenseSelected] = useState(null);
  const [ExpenseDataTable, setExpenseDataTable] = useState(null);

  useEffect(() => {if(expenseData) setExpenseDataTable(expenseData.getExpenseData)}, [expenseData]);
  
  const getExpenseDataCallback = useCallback((name) => loadExpenses({variables: { input: { name: name}}}),[])
  
  return (
      <ExpenseTrackingContainer>
        <FilterContainer>
          <Container>
            <StyledSelect
                value={ExpenseSelected}
                onChange={(value)=> {setExpenseSelected(value);}}
                name='expenseSelected'
                options={expenseNames ? expenseNames.getAllExpenses.map((expenseName,index) => ({value: index, label: expenseName.name})) : []}
                label='Select expense'
                errors=''
                touched={false}
              />
          </Container>
          <Container>
              <Button type='Button' onClick={() => {getExpenseDataCallback(ExpenseSelected.label); setExpenseSelected(null)}} >Search </Button>
          </Container>
        </FilterContainer>
        <ExpensesDataTable
          dataTable={ExpenseDataTable}
          updateSelect={() => {console.log('aca tamo'); refetch()}}
        />
      </ExpenseTrackingContainer>
  )

}

export default ExpenseTracking
