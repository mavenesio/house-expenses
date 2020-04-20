// @ts-nocheck
import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import Card from '../Components/Card/Card';
import CircleSolid from '../Components/Icons/CircleSolid';
import Header from '../Components/Header/Header';
import Checkbox from '../Components/CheckBox/Checkbox';
import fetch from 'isomorphic-unfetch';

const Row = styled.tr`
  display:flex;
  flex-direction:row;
  justify-content:center;
  position:relative;
`;
const HorizontalLine = styled.div`
  display: ${props => props.paid ? 'unset' : 'none'};
  height:0px;
  width:calc(70%);
  position:absolute;
  top:calc(50%);
  border: 1.5px solid ${props => props.theme.color.primaryColor};
`;
const Cell = styled.td`
  font-family:${props => props.theme.font.family};
  font-size: ${props => props.theme.font.size.text};
  text-transform:capitalize;
  align-self:center;
  width:30%;
  justify-self:flex-start;
`;
const ExpensesContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${props => props.theme.color.primaryColor};
  & > * {
        flex: 1 1 20%;
    }
`;
const TotalFooter = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  & > * {
        flex: 1 1 20%;
    }
`;
function HomePage({currentExpenses}) {
  const renderCurrentExpenses = useCallback(
    (expenses) => {
      return expenses.map(expense => 
        <Row>
          <Cell>
            {expense.name}
          </Cell>
          <Cell>
            $ {expense.amount}
          </Cell>
          <Checkbox checked={expense.paid} />
        </Row>
      )
    },[])
  return (
    <>
      <Header title='A PAGAR ESTE MES' />
      <ExpensesContainer>
        {
          renderCurrentExpenses(currentExpenses)        
        }
      </ExpensesContainer>
      <TotalFooter>
        <Row>
          <Cell>TOTAL</Cell>
          <Cell>{currentExpenses.reduce((a, b) => a + parseFloat(b.amount), 0)}</Cell>
        </Row>
      </TotalFooter>
    </>
  )

}

HomePage.getInitialProps = async ctx => {
  const res = await fetch(`http://localhost:3000/api/getCurrentExpenses`);
  const data = await res.json();
  return { currentExpenses: data }
}

export default HomePage


/*
          <Checkbox checked={expense.paid} />

*/ 