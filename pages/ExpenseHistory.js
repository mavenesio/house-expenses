// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import StyledSelect from '../Components/StyledSelect/StyledSelect';
import Spinner from '../Components/Spinner/Spinner';
import { useLazyQuery } from '@apollo/client';
import gql from "graphql-tag";
import {YearOptions, MonthOptions} from '../constants/constants';
import Button from '../Components/Button/Button';
import ExpensesTable from '../Components/ExpensesTable/ExpensesTable';


const ExpenseTrackingContainer = styled.div`
  padding:2rem;
`;
const TableContainer = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  margin-top:2rem;
  flex-wrap:wrap-reverse;
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

const ExpenseHistory = () => {
  const [Month, setMonth] = useState(null);
  const [Year, setYear] = useState(null);

  useEffect(() => {
    const now = new Date();
    setMonth(MonthOptions.find(month => month.value == parseInt(now.getMonth())));
    setYear(YearOptions.find(year => year.value == parseInt(now.getFullYear())));
  }, []);
  const [ loadExpenses, { loading, data }] = useLazyQuery(GET_USER_EXPENSES,{
    variables:{ 
      input: {
        month: parseInt((new Date()).getMonth()),
        year: parseInt((new Date()).getFullYear()) 
      }
    }
  });
  const getExpenses = useCallback( 
    (month, year) => {
      if( month === null || year === null) return;
      loadExpenses({variables: { 
        input: {
          month: parseInt(month.value),
          year: parseInt(year.value)
        }
      }});
    })

  return (
    <>
      <Spinner loading={loading}/>
      <ExpenseTrackingContainer>
        <FilterContainer>
          <Container>
            <StyledSelect
              value={Month}
              onChange={(value)=> setMonth(value)}
              name='startMonth'
              options={MonthOptions}
              label='Month'
              errors=''
              touched={false}
            />
          </Container>
          <Container>
            <StyledSelect
              value={Year}
              onChange={(value)=> setYear(value)}
              name='startYear'
              options={YearOptions}
              label='Year'
              errors=''
              touched={false}
                />
          </Container>
          <Container>
              <Button type='Button' onClick={() => getExpenses(Month, Year)} >Search </Button>
          </Container>
        </FilterContainer>
            <TableContainer>
              <ExpensesTable 
                dataTable={data ? data.getExpenses : []}
                onCheck={null}
                onEdit={null}
                onDelete={null}
                onCreate={null}
                />
          </TableContainer>
      </ExpenseTrackingContainer>
    </>
  )

}

export default ExpenseHistory
