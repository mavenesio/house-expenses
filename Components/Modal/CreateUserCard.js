// @ts-nocheck
import React, {useState} from 'react';
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
    &:hover{
        color: ${props => props.theme.color.primaryLightColor};
    }
`;
const CreateUserCardContainer = styled.div`
    z-index:5;
    position:relative;
    align-self:center;
    background-color:white;
    border-radius:5px;
    width:78%;
    height:78%;
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
const ModalBody = styled.form`
    display:flex;
    flex-direction:column;
    height:60%;
    overflow-y: auto;
`;
const ModalFooter = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    height:10%;
`;

const InputContainer = styled.div`
    margin:1rem;
    display:flex;
    flex-direction:column;
    position:relative;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: ${props => props.theme.font.weight.bold};
`;
const CustomButton = styled(Button)`
  margin:0.5rem;
  width:50%;
  cursor: pointer;
`;
const ADD_USER = gql`
    mutation addUser($input: UserInput!) {
        addUser(input: $input){
            firstName,
            lastName,
        }
    }
`;

const CreateUserCard = (props) => {7
    const {changeVisibility} = props;
    const [addUser] = useMutation(ADD_USER, );
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            createEmail: '',
            createPassword: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('El nombre es obligatorio'),
            lastName: Yup.string().required('El apellido es obligatorio'),
            createEmail: Yup.string().email('El email no es valido').required('Email es obligatorio'),
            createPassword: Yup.string().required('password no puede ser vacio').min(6, 'password no puede tener menos de 6 caracteres')
        }),
        onSubmit: async values => {
            console.log(values);
            try {
                const {firstName, lastName, createPassword, createEmail} = values;
                console.log(firstName, lastName,createPassword, createEmail)
                const {data} = await addUser({
                    variables: {
                        input: {
                            firstName,
                            lastName,
                            password: createPassword,
                            email: createEmail
                        }
                    }
                });
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        }

    })


    return (
        <CreateUserCardContainer>
            <ModalHeader>
                <ModalHeaderText>
                    Nuevo Usuario
                </ModalHeaderText>
                <CrossButton onClick={changeVisibility}/>
            </ModalHeader>
            <ModalBody  onSubmit={formik.handleSubmit} id='createForm'>  
                <InputContainer>
                    <Input
                        name='firstName'
                        id='firstName'
                        type='firstName'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                    />
                    <label>firstName</label>
                    {
                        formik.touched.firstName && formik.errors.firstName 
                        ?
                        <ErrorField errorMessage={formik.errors.firstName} />
                        :
                        null
                    }
                </InputContainer>
                <InputContainer>
                    <Input
                        name='lastName'
                        id='lastName'
                        type='lastName'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                    />
                    <label>lastName</label>
                    {
                        formik.touched.lastName && formik.errors.lastName 
                        ?
                        <ErrorField errorMessage={formik.errors.lastName} />
                        :
                        null
                    }
                </InputContainer>
                <InputContainer>
                    <Input
                        name='createEmail'
                        id='createEmail'
                        type='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.createEmail}
                    />
                    <label>Email</label>
                    {
                        formik.touched.createEmail && formik.errors.createEmail 
                        ?
                        <ErrorField errorMessage={formik.errors.createEmail} />
                        :
                        null
                    }
                </InputContainer>
                <InputContainer>
                    <Input
                        name='createPassword'
                        id='createPassword'
                        type='password'
                        onChange={formik.handleChange}
                        value={formik.values.createPassword}
                    />
                    <label>Password</label>
                    {
                        formik.touched.createPassword && formik.errors.createPassword 
                        ?
                        <ErrorField errorMessage={formik.errors.createPassword} />
                        :
                        null
                    }
                </InputContainer>
                <InputContainer>
                    <CustomButton type='submit' form='createForm' >Log In</CustomButton>
                </InputContainer>
            </ModalBody>
        </CreateUserCardContainer>
    )
}

export default CreateUserCard;