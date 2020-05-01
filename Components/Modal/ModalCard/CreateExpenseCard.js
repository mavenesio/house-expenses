// @ts-nocheck
import React, {useState, useCallback, useContext} from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation, gql} from'@apollo/client';

import ModalHeader from '../ModalHeader/ModalHeader';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import ErrorField from '../../ErrorField/ErrorField';
import StyledSelect from '../../StyledSelect/StyledSelect';
import {YearOptions, MonthOptions, NumberOfMonthOptions, ExpenseTypeOptions} from '../../../constants/constants';
import ExpenseContext from '../../../context/expenses/ExpenseContext';

const CreateExpenseCardContainer = styled.form`
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
const InputContainer = styled.div`
    margin:0rem 1rem 0rem 1rem; 
    width:50%;
    display:flex;
    flex-direction:column;
    position:relative;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: ${props => props.theme.font.weight.bold};
`;
const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;    
    margin-top:1rem;
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
const ADD_RANGE_EXPENSES = gql`
    mutation addRangeExpenses($input:RangeExpenseInput!){
        addRangeExpenses(input: $input){
            id,
            name, 
            amount,
            paid,
            type,
        }
    }
`;

const CreateExpenseCard = (props) => {
    const {changeVisibility} = props;
    const [ErrorMessage, setErrorMessage] = useState(null);
    const [addRangeExpenses] = useMutation(ADD_RANGE_EXPENSES, {
        update(cache, { data: { addRangeExpenses } } ) {
            const { getExpenses } = cache.readQuery({ query: GET_USER_EXPENSES, variables:{ 
                input: {
                  month: parseInt((new Date()).getMonth()),
                  year: parseInt((new Date()).getFullYear()) 
                }
              }});
            cache.writeQuery({
                query: GET_USER_EXPENSES, 
                variables:{ 
                    input: {
                      month: parseInt((new Date()).getMonth()),
                      year: parseInt((new Date()).getFullYear()) 
                    }
                  },
                data: {
                    getExpenses : [...getExpenses, addRangeExpenses ]
                }
            })
        }
    });

    const expenseContext = useContext(ExpenseContext);
    const removeWhiteSpaces = useCallback((value) => value.toString().trim());
    const formik = useFormik({
        initialValues: {
            name: '',
            amount: 0,
            startMonth: MonthOptions[(new Date()).getMonth()],
            startYear: YearOptions[0],
            numberOfMonth: NumberOfMonthOptions[0],
            type: ExpenseTypeOptions[0],
        },
        validationSchema: Yup.object({
            name: Yup.string('Must be string').required('Name is required.').max(20,'Name must be lower than 20 characters'),
            amount: Yup.number('Must be number')
                        .required('Amount is required.')
                        .min(0, 'Amount greater than 0.')
                        .max(9999999,'Amount must be lower than $9999999 characters'),
            startMonth: Yup.object().required('Start month is required.'),
            startYear: Yup.object().required('Start year is required.'),
            type: Yup.object().required('Type is required.'),
        }),
        onSubmit: async values => {
            try {
                const {name, amount, startMonth, startYear, numberOfMonth, type} = values;
                const inp = {   name,
                                amount: parseFloat(amount),
                                startMonth: parseInt(startMonth.value)-1,
                                startYear: parseInt(startYear.value),
                                monthAmount: parseInt(numberOfMonth.value),
                                type:type.value};
                const {data} = await addRangeExpenses( { variables: { input: {...inp}}});
                expenseContext.addExpense(data.addRangeExpenses);
                changeVisibility();
            } catch (err) {
                const message = err.message.replace('GraphQL error:', '');
                setErrorMessage(message);
                setTimeout( () => {
                  setErrorMessage(null);
                },3000);
            }
            formik.resetForm();
        }
    });

    const { setFieldValue } = formik;
    const handleStartMonthSelect = useCallback((value) => setFieldValue('startMonth', value), [setFieldValue]);
    const handleStartYearSelect = useCallback((value) => setFieldValue('startYear', value), [setFieldValue]);
    const handleNumberOfMonthSelect = useCallback((value) => setFieldValue('numberOfMonth', value), [setFieldValue]);
    const handleTypeSelect = useCallback((value) => setFieldValue('type', value), [setFieldValue]);

    return (
        <CreateExpenseCardContainer onSubmit={formik.handleSubmit} id='expenseForm'>
            <ModalHeader title='New expense' onClose={changeVisibility} />
            <ErrorField ErrorMessage={ErrorMessage} touched={true} />
            <ModalBody>
                <Row>
                    <InputContainer>
                        <Input
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='name'
                            id='name'
                            type='name'
                        />
                        <label>Name</label>
                    <ErrorField errorMessage={formik.errors.name} touched={formik.touched.name} />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            value={removeWhiteSpaces(formik.values.amount)}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='amount'
                            id='amount'
                            type='amount'
                        />
                        <label>Amount</label>
                    <ErrorField errorMessage={formik.errors.amount} touched={formik.touched.amount} />
                    </InputContainer>
                </Row>
                <Row>
                    <StyledSelect
                        options={NumberOfMonthOptions}
                        value={formik.values.numberOfMonth}
                        onChange={handleNumberOfMonthSelect}
                        name='numberOfMonth'
                        type='numberOfMonth'
                        label='Payments'
                    />
                    <StyledSelect
                        options={ExpenseTypeOptions}
                        value={formik.values.type}
                        onChange={handleTypeSelect}
                        name='type'
                        type='type'
                        label='Type'
                    />
                    <ErrorField errorMessage={formik.errors.type} touched={formik.touched.type} />
                </Row>
                <Row>
                    <StyledSelect
                        value={formik.values.startMonth}
                        onChange={handleStartMonthSelect}
                        name='startMonth'
                        type='startMonth'
                        options={MonthOptions}
                        label='Start month'
                    />
                    <StyledSelect
                        options={YearOptions}
                        value={formik.values.startYear}
                        onChange={handleStartYearSelect}
                        name='startYear'
                        type='startYear'
                        label='Start year'
                    />
                    <ErrorField errorMessage={formik.errors.startMonth} touched={formik.touched.startMonth} />
                    <ErrorField errorMessage={formik.errors.startYear} touched={formik.touched.startYear} />
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button type='submit' form='expenseForm' >Add! </Button>
            </ModalFooter>
        </CreateExpenseCardContainer>
    )
}

export default CreateExpenseCard;