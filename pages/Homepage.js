// @ts-nocheck
import React, {useState, useEffect, useCallback} from 'react';
import {gql, useQuery, fetchMore} from '@apollo/client';
import styled from 'styled-components';
import Header from '../Components/Header/Header';
import ExpensesTable from '../Components/ExpensesTable/ExpensesTable';
import Spinner from '../Components/Spinner/Spinner';
import Modal from '../Components/Modal/Modal';
import ModalCard from '../Components/Modal/ModalCard';
import PlusSquare from '../Components/Icons/PlusSquare';

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
    font-size: 50px;
    color: ${props => props.theme.color.primaryDarkColor};
    margin: 0rem 1rem 0rem 1rem;
    &:hover{
        color: ${props => props.theme.color.primaryLightColor};
    }
`;

const Homepage = () => {
  const {data, loading, error, refetch} = useQuery(GET_USER_EXPENSES);
  const [ModalIsVisible, setModalIsVisible] = useState(false);
  const [ActualMonth, setActualMonth] = useState(('abril').toUpperCase());

  return (
    <>
      <Spinner loading={loading}/>
      <Header title={`A PAGAR EN ${ActualMonth}`} />
      <IconContainer>
        <PlusButton onClick={() => setModalIsVisible(!ModalIsVisible)}/>
      </IconContainer>
      <ExpensesTable dataTable={data ? data.getExpenses : undefined}/>
      <Modal isVisible={ModalIsVisible} changeVisibility={() => setModalIsVisible(!ModalIsVisible)}>
        <ModalCard changeVisibility={() => {setModalIsVisible(!ModalIsVisible); refetch()}} />
      </Modal >
    </>
  )

}

export default Homepage
