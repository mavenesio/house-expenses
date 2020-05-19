// @ts-nocheck
import React, { useState, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { parseISO, isEqual } from 'date-fns';

import ModalHeader from '../ModalHeader/ModalHeader';
import { StyledInput } from '../../Input/Input';
import Button from '../../Button/Button';
import ErrorField from '../../ErrorField/ErrorField';
import StyledSelect from '../../StyledSelect/StyledSelect';
import { YearOptions, MonthOptions, ExpenseTypeOptions } from '../../../constants/constants';
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
const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;    
    margin-top:1rem;
    & > div {
        margin:0rem 1rem 0rem 1rem;
    }
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
        paid
        currentDate
        type
      }
    }
`;
const ADD_RANGE_EXPENSES = gql`
    mutation addRangeExpenses($input:RangeExpenseInput!){
        addRangeExpenses(input: $input){
            id
            name 
            amount
            paid
            currentDate
            type
        }
    }
`;


const CreateExpenseCard = (props) => {
    const {changeVisibility} = props;
    const [ErrorMessage, setErrorMessage] = useState(null);
    const [addRangeExpenses] = useMutation(ADD_RANGE_EXPENSES, {
        update(cache, { data: { addRangeExpenses } } ) {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
            const { getExpenses } = cache.readQuery({ query: GET_USER_EXPENSES, variables:{ 
                input: {
                  month: parseInt(today.getMonth()),
                  year: parseInt(today.getFullYear()) 
                }
              }});
              console.log('on update cache : ', addRangeExpenses);
            if (isEqual(parseISO(addRangeExpenses.currentDate, []), today)) {
                cache.writeQuery({
                    query: GET_USER_EXPENSES, 
                    variables:{ 
                        input: {
                        month: parseInt(today.getMonth()),
                        year: parseInt(today.getFullYear()) 
                        }
                    },
                    data: {
                        getExpenses : [...getExpenses, addRangeExpenses ]
                    }
                })
            }
        }
    });
    

    const expenseContext = useContext(ExpenseContext);
    const formik = useFormik({
        initialValues: {
            name: '',
            amount: 0,
            startMonth: MonthOptions[(new Date()).getMonth()],
            startYear: YearOptions[0],
            numberOfMonth: '1',
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
            numberOfMonth: Yup.number('Must be number')
                              .required()
                              .min(1, 'At least 1 payment.')
                              .max(50,'At most 50 payments'),
            type: Yup.object().required('Type is required.'),
        }),
        onSubmit: async values => {
            try {
                const {name, amount, startMonth, startYear, numberOfMonth, type} = values;
                const inp = {   name,
                                amount: parseFloat(amount),
                                startMonth: parseInt(startMonth.value),
                                startYear: parseInt(startYear.value),
                                monthAmount: parseInt(numberOfMonth),
                                type:type.value};
                const {data} = await addRangeExpenses( { variables: { input: {...inp}}});
                const now = new Date();
                const today = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
                console.log('on submit: ', data.addRangeExpenses);
                console.log(parseISO(data.addRangeExpenses.currentDate, []));
                console.log(today);
                if (isEqual(parseISO(data.addRangeExpenses.currentDate, []), today)) {
                    expenseContext.addExpense(data.addRangeExpenses);
                }
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
    const handleTypeSelect = useCallback((value) => setFieldValue('type', value), [setFieldValue]);

    return (
        <CreateExpenseCardContainer onSubmit={formik.handleSubmit} id='expenseForm'>
            <ModalHeader title='New expense' onClose={changeVisibility} />
            <ErrorField ErrorMessage={ErrorMessage} touched={true} />
            <ModalBody>
                <Row>
                    <StyledInput
                        value={formik.values.name}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        name='name'
                        id='name'
                        type='name'
                        label='Name'
                        errors={formik.errors.name}
                        touched={formik.touched.name}
                        noWhitesSpaces={false}
                    />
                    <StyledInput
                        value={formik.values.amount}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        name='amount'
                        id='amount'
                        type='amount'
                        label='Amount'
                        errors={formik.errors.amount}
                        touched={formik.touched.amount}
                        noWhitesSpaces={true}
                    />
                </Row>
                <Row>
                    <StyledInput
                        value={formik.values.numberOfMonth}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        name='numberOfMonth'
                        id='numberOfMonth'
                        type='string'
                        label='Payments'
                        errors={formik.errors.numberOfMonth}
                        touched={formik.touched.numberOfMonth}
                        noWhitesSpaces={true}
                    />
                    <StyledSelect
                        options={ExpenseTypeOptions}
                        value={formik.values.type}
                        onChange={handleTypeSelect}
                        name='type'
                        type='type'
                        label='Type'
                        errors={formik.errors.type}
                        touched={formik.touched.type}
                    />
                </Row>
                <Row>
                    <StyledSelect
                        value={formik.values.startMonth}
                        onChange={handleStartMonthSelect}
                        name='startMonth'
                        type='startMonth'
                        options={MonthOptions}
                        label='Start month'
                        errors={formik.errors.startMonth}
                        touched={formik.touched.startMonth}
                    />
                    <StyledSelect
                        options={YearOptions}
                        value={formik.values.startYear}
                        onChange={handleStartYearSelect}
                        name='startYear'
                        type='startYear'
                        label='Start year'
                        errors={formik.errors.startYear}
                        touched={formik.touched.startYear}
                    />
                </Row>
            </ModalBody>
            <ModalFooter>
                <CustomButton type='submit' form='expenseForm' >Add</CustomButton>
            </ModalFooter>
        </CreateExpenseCardContainer>
    )
}

export default CreateExpenseCard;