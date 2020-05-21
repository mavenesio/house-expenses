// @ts-nocheck
import React, { useState, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { getFirstDayOfThisMonth, ISOEqualDate } from '../../../Utils/DateUtils';

import ModalHeader from '../ModalHeader/ModalHeader';
import { StyledInput } from '../../Input/Input';
import Button from '../../Button/Button';
import StyledSelect from '../../StyledSelect/StyledSelect';
import { YearOptions, MonthOptions, ExpenseTypeOptions } from '../../../constants/constants';
import RadioButtonType from '../../RadioButtonType/RadioButtonType';
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
`;
const ModalFooter = styled.div`
    display:flex;
`;
const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;    
    & > div {
        margin:1rem 1rem 0rem 1rem;
    }
`;
const CustomButton = styled(Button)`
    margin:0rem 1rem 0rem 1rem;
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

const CreateExpenseCard = ({changeVisibility, setMessage}) => {
    const [ErrorMessage, setErrorMessage] = useState(null);
    const [addRangeExpenses] = useMutation(ADD_RANGE_EXPENSES);

    const expenseContext = useContext(ExpenseContext);
    const formik = useFormik({
        initialValues: {
            name: '',
            amount: 0,
            startMonth: MonthOptions[(new Date()).getMonth()],
            startYear: YearOptions[0],
            numberOfMonth: '1',
            type: null,
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
                              .integer('invalid decimal')
                              .min(1, 'At least 1 payment.')
                              .max(50,'At most 50 payments'),
            type: Yup.string('Must be string').required('Type is required.'),
        }),
        onSubmit: async values => {
            try {
                const {name, amount, startMonth, startYear, numberOfMonth, type} = values;
                const inp = {   name,
                                amount: parseFloat(amount),
                                startMonth: parseInt(startMonth.value),
                                startYear: parseInt(startYear.value),
                                monthAmount: parseInt(numberOfMonth),
                                type:type};
                const {data} = await addRangeExpenses( { variables: { input: {...inp}}});
                const today = getFirstDayOfThisMonth(false);
                if (data.addRangeExpenses && ISOEqualDate(data.addRangeExpenses.currentDate, today)) {
                    expenseContext.addExpense(data.addRangeExpenses);
                };
                changeVisibility();
                setMessage('success', (data.addRangeExpenses) ? 'Your expense has been created' : 'You can review it on the Expense History tab');
            } 
            catch (err) {
                setMessage('error', err.message.replace('GraphQL error:', ''));
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
                    <RadioButtonType value={formik.values.type} onChange={handleTypeSelect}/>
                </Row>
                <Row>
                    <StyledInput
                        value={formik.values.numberOfMonth.replace(',', '.')}
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