// @ts-nocheck
import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation, gql} from'@apollo/client';

import TimesCircle from '../Icons/TimesCircle';
import Input from '../Input/Input';
import Button from '../Button/Button';
import ErrorField from '../ErrorField/ErrorField';

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
const UpdateExpenseCardContainer = styled.form`
    z-index:5;
    position:relative;
    align-self:center;
    background-color:white;
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
`;
const ModalBody = styled.div`
    display:flex;
    flex-direction:column;
    overflow-y: auto;
`;

const InputContainer = styled.div`
    margin:0.1rem 1rem 0.1rem 1rem;
    width:50%;
    display:flex;
    flex-direction:column;
    position:relative;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: ${props => props.theme.font.weight.bold};
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
    justify-content:space-between;
    margin-top:1rem;
`;
const ADD_RANGE_EXPENSES = gql`
    mutation addRangeExpenses($input:RangeExpenseInput!){
        addRangeExpenses(input: $input){
            id
        }
    }
`;

const CustomButton = styled(Button)`
  margin:1rem 0rem 1rem 0rem;
  width:50%;
  @media screen {
    width:100%;
  }
  cursor: pointer;
`;
const UpdateExpenseCard = (props) => {
    const {changeVisibility, expense} = props;
    const [ErrorMessage, setErrorMessage] = useState(null);
    const formik = useFormik({
        initialValues: {
            name: (expense !== null) ? expense.name : '',
            amount: (expense !== null) ? expense.amount : '',
        },
        validationSchema: Yup.object({
            name: Yup.string('Debe ser string').required('Campo requerido.'),
            amount: Yup.number('Debe ser numero').min(0, 'monto mayor a 0.').required('Campo requerido.'),
        }),
        onSubmit: async values => {
            try {
                console.log(values);
                //changeVisibility();
            } catch (err) {

            }
        }
    });
    const { setFieldValue } = formik;
    useEffect(() => {
        console.log(expense);
        setFieldValue('name', (expense) ? expense.name : '');
        setFieldValue('amount', (expense) ? expense.amount : '');
    }, [expense])

    return (
        <UpdateExpenseCardContainer onSubmit={formik.handleSubmit} id='updateExpenseForm'>
            <ModalHeader>
                <ModalHeaderText>
                    Actualizar gasto
                </ModalHeaderText>
                <CrossButton onClick={changeVisibility}/>
            </ModalHeader>
            <ErrorField ErrorMessage={ErrorMessage} touched={true} />
            <ModalBody >
                <Row>
                    <InputContainer>
                        <Input
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='name'
                            id='name'
                            type='name'
                            disabled={true}
                        />
                        <label>Nombre</label>
                    <ErrorField errorMessage={formik.errors.name} touched={formik.touched.name} />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='amount'
                            id='amount'
                            type='amount'
                        />
                        <label>Monto</label>
                    <ErrorField errorMessage={formik.errors.amount} touched={formik.touched.amount} />
                    </InputContainer>
                </Row>
                <ButtonContainer>
                    <CustomButton type='submit' form='updateExpenseForm' >Actualizar!</CustomButton>
                </ButtonContainer>
            </ModalBody>
        </UpdateExpenseCardContainer>
    )
}

export default UpdateExpenseCard;