// @ts-nocheck
import React, {useState, useEffect, useContext, useCallback} from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation, gql} from'@apollo/client';
import ExpenseContext from '../../../context/expenses/ExpenseContext';
import ModalHeader from '../ModalHeader/ModalHeader';
import {StyledInput} from '../../Input/Input';
import Button, {SecondaryButton} from '../../Button/Button';
import ErrorField from '../../ErrorField/ErrorField';

const UpdateExpenseCardContainer = styled.form`
    z-index:5;
    position:relative;
    align-self:center;
    background-color:${props => props.theme.color.backgroundPrimaryColor};
    border-radius:5px;
    width:70vw;
    max-width:550px;
    @media (max-width: 640px) {
        width:95%;
        max-width:unset;
    }
`;
const ModalBody = styled.div`
    display:flex;
    flex-direction:column;
    overflow-y: auto;
`;
const ModalFooter = styled.div`
    display:flex;

`;
const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    margin-top:1rem;
    &:first-child {
        margin:0rem 1rem;
    }
`;
const CustomButton = styled(Button)`
    margin:1rem;
`;
const CustomSecondaryButton = styled(SecondaryButton)`
    margin:1rem;
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
const UpdateExpenseCard = (props) => {
    const {changeVisibility, expense} = props;
    const [ErrorMessage, setErrorMessage] = useState(null);
    const [updateExpense] = useMutation(UPDATE_EXPENSE);
    const expenseContext = useContext(ExpenseContext);
    const formik = useFormik({
        initialValues: {
            updateAmount: (expense) ? expense.amount : '',
        },
        validationSchema: Yup.object({
            updateAmount: Yup.number('Must be number')
                            .required('Amount is required.')
                            .min(0, 'Amount greater than 0.')
                            .max(9999999,'Amount must be lower than 9999999 characters'),
        }),
        onSubmit: async values => {
                const { updateAmount } = values;
                const {id} = expense;
                try {
                    const {data} = await updateExpense({
                        variables: { 
                            input: {
                                expenseId: id, 
                                amount: parseFloat(updateAmount)
                            }
                        }
                    });
                    expenseContext.updateExpense(data.updateExpense);
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
    
    const { setFieldValue } = formik;
    useEffect(() => {
        setFieldValue('updateAmount', (expense) ? expense.amount : '');
    }, [expense]);

    return (
        <UpdateExpenseCardContainer onSubmit={formik.handleSubmit} id='updateExpenseForm'>
            <ModalHeader title={`Update ${expense !== null ? expense.name : ''}`} onClose={changeVisibility}/>
            <ErrorField ErrorMessage={ErrorMessage} touched={true} />
            <ModalBody >
                <Row>
                    <StyledInput
                        value={formik.values.updateAmount}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        name='updateAmount'
                        id='updateAmount'
                        label='Amount'
                        errors={formik.errors.updateAmount}
                        touched={formik.touched.updateAmount}
                        noWhitesSpaces={true}
                    />
                </Row>
            </ModalBody>
            <ModalFooter>
                <CustomSecondaryButton  type='button' onClick={changeVisibility}>Cancel</CustomSecondaryButton>
                <CustomButton type='submit' form='updateExpenseForm' >Update</CustomButton>
            </ModalFooter>
        </UpdateExpenseCardContainer>
    )
}

export default UpdateExpenseCard;