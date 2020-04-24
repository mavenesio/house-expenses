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
import Spinner from '../Spinner/Spinner';

const CrossButton = styled(TimesCircle)`
    align-self:center;
    font-size: 25px;
    color: black;
    margin: 0rem 1rem 1rem 1rem;
    cursor: pointer;
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
    width:50vw;
    min-width:300px;
`;
const ModalHeader = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    margin:1rem;
    border-bottom: 2px solid ${props => props.theme.color.primaryLightColor};
`;
const ModalHeaderText = styled.div`
    font-family:${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.subTitle};
`;
const ModalBody = styled.form`
    display:flex;
    flex-direction:column;
    overflow-y: auto;
`;

const InputContainer = styled.div`
    margin:0.2rem 1rem 0.2rem 1rem;
    display:flex;
    flex-direction:column;
    position:relative;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: ${props => props.theme.font.weight.bold};
`;
const CustomButton = styled(Button)`
  margin:1rem 0rem 1rem 0rem;
  width:50%;
  @media screen {
    width:100%;
  }
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

const CreateUserCard = ({changeVisibility}) => {
    const [ErrorMessage, setErrorMessage] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [addUser] = useMutation(ADD_USER);
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
            createPassword: Yup.string().required('password no puede ser vacio')
                                        .min(6, 'password no puede tener menos de 6 caracteres')
        }),
        onSubmit: async values => {
            try {
                setLoading(true);
                const {firstName, lastName, createPassword, createEmail} = values;
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
                changeVisibility();
                setLoading(false);
            } catch (err) {
                setLoading(false);
                const message = err.message.replace('GraphQL error:', '');
                setErrorMessage(message);
                setTimeout( () => {
                  setErrorMessage(null);
                },3000);
            }
        }
    })


    return (
        <CreateUserCardContainer>
            <ModalHeader>
                <ModalHeaderText>
                    New user
                </ModalHeaderText>
                <CrossButton onClick={changeVisibility}/>
            </ModalHeader>
            <ErrorField errorMessage={ErrorMessage} touched={true}/>
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
                        <label>First name</label>
                        <ErrorField errorMessage={formik.errors.firstName} touched={formik.touched.firstName} />
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
                        <label>Last name</label>
                        <ErrorField errorMessage={formik.errors.lastName} touched={formik.touched.lastName} />
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
                    <ErrorField errorMessage={formik.errors.createEmail} touched={formik.touched.createEmail} />
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
                    <ErrorField errorMessage={formik.errors.createPassword} touched={formik.touched.createPassword} />
                </InputContainer>
                <InputContainer>
                    <CustomButton type='submit' form='createForm' >Crate user</CustomButton>
                </InputContainer>
            </ModalBody>
            <Spinner loadring={Loading}/>
        </CreateUserCardContainer>
    )
}

export default CreateUserCard;