// @ts-nocheck
import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation, gql} from'@apollo/client';

import TimesCircle from '../Icons/TimesCircle';
import Input from '../Input/Input';
import Button from '../Button/Button';
import ErrorField from '../ErrorField/ErrorField';
import StyledSelect from '../StyledSelect/StyledSelect';
import {YearOptions, MonthOptions, NumberOfMonthOptions} from '../../constants/constants';

const CrossButton = styled(TimesCircle)`
    align-self:center;
    font-size: 20px;
    color: black;
    margin: 0rem 1rem 0rem 1rem;
    &:hover{
        color: ${props => props.theme.color.primaryLightColor};
    }
`;
const ModalCardContainer = styled.form`
    z-index:5;
    position:relative;
    align-self:center;
    background-color:white;
    border-radius:5px;
    width:78%;
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
    width:100%;
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
const ModalCard = (props) => {
    const {changeVisibility} = props;
    const formik = useFormik({
        initialValues: {
            name: 'aysa',
            amount: 30,
            startMonth: MonthOptions[0],
            startYear: YearOptions[0],
            numberOfMonth: NumberOfMonthOptions[0],
        },
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es requerido.'),
            amount: Yup.number().min(0, 'El monto no puede ser menor a 0.').required('El monto es requerido.'),
            startMonth: Yup.object().required('Mes de comienzo es requerido.'),
            startYear: Yup.object().required('Año de comienzo es requerido.')
        }),
        onSubmit: values => {
            console.log('***', values);
        }
    })

    const { handleChange,setFieldValue } = formik;
    const handleStartMonthSelect = useCallback((value) => { console.log(value); setFieldValue('startMonth', value)}, [handleChange]);
    const handleStartYearSelect = useCallback((value) => { console.log(value); setFieldValue('startYear', value)}, [handleChange]);
    const handleNumberOfMonthSelect = useCallback((value) => { console.log(value); setFieldValue('numberOfMonth', value)}, [handleChange]);

    return (
        <ModalCardContainer onSubmit={formik.handleSubmit} id='expenseForm'>
            <ModalHeader>
                <ModalHeaderText>
                    Nuevo gasto
                </ModalHeaderText>
                <CrossButton onClick={changeVisibility}/>
            </ModalHeader>
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
                <Row>
                    <StyledSelect
                        value={formik.values.startMonth}
                        onChange={handleStartMonthSelect}
                        name='startMonth'
                        type='startMonth'
                        options={MonthOptions}
                        label='Mes de comienzo'
                    />
                    <StyledSelect
                        options={YearOptions}
                        value={formik.values.startYear}
                        onChange={handleStartYearSelect}
                        name='startYear'
                        type='startYear'
                        label='Año de comienzo'
                    />
                    <ErrorField errorMessage={formik.errors.startMonth} touched={formik.touched.startMonth} />
                    <ErrorField errorMessage={formik.errors.startYear} touched={formik.touched.startYear} />
                </Row>
                <Row>
                    <StyledSelect
                        options={NumberOfMonthOptions}
                        value={formik.values.numberOfMonth}
                        onChange={handleNumberOfMonthSelect}
                        name='numberOfMonth'
                        type='numberOfMonth'
                        label='Cantidad de meses'
                    />
                    <ErrorField errorMessage={formik.errors.numberOfMonth} touched={formik.touched.numberOfMonth} />
                </Row>
                <Row>
                    <ButtonContainer>
                        <Button type='submit' form='expenseForm' >Agregar!</Button>
                    </ButtonContainer>
                </Row>
            </ModalBody>
        </ModalCardContainer>
    )
}

export default ModalCard;