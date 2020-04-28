// @ts-nocheck
import React, {useState, useEffect, useContext, useCallback} from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation, gql} from'@apollo/client';
import theme from '../../constants/Theme';
import TimesCircle from '../Icons/TimesCircle';
import Button from '../Button/Button';
import ErrorField from '../ErrorField/ErrorField';
import ExpenseContext from '../../context/expenses/ExpenseContext';

import { RadioGroup, RadioButton } from 'react-radio-buttons';

const CrossButton = styled(TimesCircle)`
    align-self:center;
    font-size: 20px;
    color: black;
    margin: 0rem 1rem 0rem 1rem;
    cursor: pointer;
    &:hover{
        color: ${props => props.theme.color.primaryLightColor};
    }
`;
const DeleteExpenseCardContainer = styled.form`
    z-index:5;
    position:relative;
    align-self:center;
    background-color:${props => props.theme.color.white};
    border-radius:5px;
`;
const ModalHeader = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    padding:1rem;
    margin:1rem;
    height:10%;
    border-bottom: 2px solid ${props => props.theme.color.primaryLightColor};
`;
const ModalHeaderText = styled.div`
    font-family:${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.subTitle};
    font-weight: 800;
`;
const ModalBody = styled.div`
    display:flex;
    flex-direction:column;
    overflow-y: auto;
`;

const ButtonContainer = styled.div`
    margin:0.1rem 1rem 0.1rem 1rem;
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    position:relative;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: ${props => props.theme.font.weight.bold};
`;
const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    margin-top:1rem;
`;
const CustomButton = styled(Button)`
  margin:1rem 0rem 1rem 0rem;
  width:50%;
  @media screen {
    width:100%;
  }
  cursor: pointer;
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
    const [DeleteExpense] = useMutation(DELETE_EXPENSE);
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
                    console.log(data);
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
            <ModalHeader>
                <ModalHeaderText>
                    Delete expense
                </ModalHeaderText>
                <CrossButton onClick={changeVisibility}/>
            </ModalHeader>
            <ErrorField ErrorMessage={ErrorMessage} touched={true} />
            <ModalBody>
                <Row>
                    <RadioGroup
                        value={RemoveType}
                        onChange={ (value) => setRemoveType(value) } 
                        vertical>
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
                            All non-payments
                        </RadioButton>
                        <RadioButton
                            value="All"
                            pointColor={theme.color.primaryDarkColor}
                            rootColor={theme.color.primaryLightColor}> 
                            All expenses
                        </RadioButton>
                    </RadioGroup>
                </Row>
                <ButtonContainer>
                    <CustomButton type='submit' form='delelteExpenseForm' >Delete!</CustomButton>
                </ButtonContainer>
            </ModalBody>
        </DeleteExpenseCardContainer>
    )
}

export default DeleteExpenseCard;