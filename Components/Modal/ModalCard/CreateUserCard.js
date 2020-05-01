// @ts-nocheck
import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation, gql} from'@apollo/client';

import Input from '../../Input/Input';
import Button from '../../Button/Button';
import ErrorField from '../../ErrorField/ErrorField';
import Spinner from '../../Spinner/Spinner';
import ModalHeader from '../ModalHeader/ModalHeader';

const CreateUserCardContainer = styled.form`
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
    width:100%;
    position:relative;
    margin:0rem 1rem 0rem 1rem;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: ${props => props.theme.font.weight.bold};
`;

const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    margin-top:1rem;
    font-family: ${props => props.theme.font.family};
`;

const ADD_USER = gql`
    mutation addUser($input: UserInput!) {
        addUser(input: $input){
            firstName,
            lastName,
        }
    }
`;

const CreateUserCard = ({changeVisibility, setSignUpSuccess}) => {
    const [ErrorMessage, setErrorMessage] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [addUser] = useMutation(ADD_USER);
    const removeWhiteSpaces = useCallback((value) => value.replace(' ', ''));
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            createEmail: '',
            createPassword: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First name is required').max(25,'First name must be lower than 25 characters'),
            lastName: Yup.string().required('Last name is required').max(25,'Last name must be lower than 25 characters'),
            createEmail: Yup.string()
                            .required('Email is required')
                            .email('Invalid Email')
                            .max(35,'Email must be lower than 35 characters'),
            createPassword: Yup.string()
                               .required('Password is required')
                               .min(6, 'Password must have more than 6 caracteres')
                               .max(35,'Password must be lower than 35 characters'),
                               //.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,'Invalid')
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
                setSignUpSuccess();
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
        <CreateUserCardContainer onSubmit={formik.handleSubmit} id='createForm'>
            <ModalHeader title='New user' onClose={changeVisibility}/>
            <ErrorField errorMessage={ErrorMessage} touched={true}/>
            <ModalBody>
                <Row>
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
                </Row>
                <Row>
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
                </Row>
                <Row>
                    <InputContainer>
                        <Input
                            name='createEmail'
                            id='createEmail'
                            type='email'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={removeWhiteSpaces(formik.values.createEmail)}
                        />
                        <label>Email</label>
                        <ErrorField errorMessage={formik.errors.createEmail} touched={formik.touched.createEmail} />
                    </InputContainer>
                </Row>
                <Row>
                    <InputContainer>
                        <Input
                            name='createPassword'
                            id='createPassword'
                            type='password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={removeWhiteSpaces(formik.values.createPassword)}
                        />
                        <label>Password</label>
                        <ErrorField errorMessage={formik.errors.createPassword} touched={formik.touched.createPassword} />
                    </InputContainer>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button type='submit' form='createForm' >Create user!</Button>
            </ModalFooter>
            <Spinner loadring={Loading}/>
        </CreateUserCardContainer>
    )
}
export default CreateUserCard;