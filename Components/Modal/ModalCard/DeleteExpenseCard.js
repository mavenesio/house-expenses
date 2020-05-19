// @ts-nocheck
import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation, gql} from'@apollo/client';
import theme from '../../../Theme/dark';
import Button from '../../Button/Button';
import ErrorField from '../../ErrorField/ErrorField';
import ExpenseContext from '../../../context/expenses/ExpenseContext';
import ModalHeader from '../ModalHeader/ModalHeader';

import { RadioGroup, RadioButton } from 'react-radio-buttons';

const DeleteExpenseCardContainer = styled.form`
    z-index:5;
    position:relative;
    align-self:center;
    background-color:${props => props.theme.color.white};
    border-radius:5px;
    width:70vw;
    height:70vh; 
    @media (max-width: 768px) {
        width:100%;
    }
`;
const ModalBody = styled.div`
    display:flex;
    flex-direction:column;
    height:45vh;
    overflow-y: auto;
`;
const ModalFooter = styled.div`
    display:flex;
`;
const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    margin-top:1rem;
    font-family: ${props => props.theme.font.family};
`;
const CustomRadioButton = styled(RadioGroup)`
    width:100%;
    padding:1rem;
`;
const CustomButton = styled(Button)`
    margin:0rem 1rem 0rem 1rem;
`;


const GET_USER_EXPENSES = gql`
    query getExpenses($input: GetExpensesInput!){
      getExpenses(input: $input){
        id
        name
        amount
        currentDate
        paid
        type
      }
    }
`;
const DELETE_EXPENSE = gql`
    mutation deleteExpense($input:DeleteExpenseInput!){
        deleteExpense(input: $input){
            success
        }
    }
`;
const DeleteExpenseCard = ({changeVisibility, expense}) => {
    const [ErrorMessage, setErrorMessage] = useState(null);
    const [RemoveType, setRemoveType] = useState('One');
    const expenseContext = useContext(ExpenseContext);
    const [DeleteExpense] = useMutation(DELETE_EXPENSE, {
        update(cache, { data: { DeleteExpense } } ) {
            const { getExpenses } = cache.readQuery({ query: GET_USER_EXPENSES, variables:{ 
                input: {
                  month: parseInt((new Date()).getMonth()),
                  year: parseInt((new Date()).getFullYear()) 
                }
              }});
            const filteredExpenses = getExpenses.filter(expense => expense.id !== expense.id);
            cache.writeQuery({
                query: GET_USER_EXPENSES, 
                variables:{ 
                    input: {
                      month: parseInt((new Date()).getMonth()),
                      year: parseInt((new Date()).getFullYear()) 
                    }
                  },
                data: {
                    getExpenses : [...filteredExpenses]
                }
            })
        }
    });
    const formik = useFormik({
        initialValues: {
        },
        validationSchema: Yup.object({
        }),
        onSubmit: async () => {
            const {id, name} = expense;
            try {
                const {data} = await DeleteExpense(
                    {variables: { 
                        input: {
                            expenseId: id, 
                            deleteType: RemoveType,
                            name: name,
                            }
                        }
                    });
                    expenseContext.deleteExpense(id);
                changeVisibility();
            } catch (err) {
                const message = err.message.replace('GraphQL error:', '');
                setErrorMessage(message);
                setTimeout( () => {
                    setErrorMessage(null);
                },4000);
            }
        }
    });

    return (
        <DeleteExpenseCardContainer onSubmit={formik.handleSubmit} id='delelteExpenseForm'>
            <ModalHeader title={`Delete ${expense !== null ? expense.name : ''}`} onClose={changeVisibility}/>
            <ErrorField ErrorMessage={ErrorMessage} touched={true} />
            <ModalBody>
                <Row>
                    <CustomRadioButton
                        value={RemoveType}
                        onChange={ (value) => setRemoveType(value) }>
                        <RadioButton 
                            value="One"
                            pointColor={theme.color.primaryDarkColor}
                            rootColor={theme.color.primaryLightColor}>           
                            This expense
                        </RadioButton>
                        <RadioButton
                            value="allNonPayments"
                            pointColor={theme.color.primaryDarkColor}
                            rootColor={theme.color.primaryLightColor}> 
                            All non-payments &nbsp;
                        </RadioButton>
                        <RadioButton
                            value="All"
                            pointColor={theme.color.primaryDarkColor}
                            rootColor={theme.color.primaryLightColor}> 
                            All expenses
                        </RadioButton>
                    </CustomRadioButton>
                </Row>
            </ModalBody>
            <ModalFooter>
                <CustomButton type='submit' form='delelteExpenseForm' >Delete</CustomButton>
            </ModalFooter>
        </DeleteExpenseCardContainer>
    )
}

export default DeleteExpenseCard;