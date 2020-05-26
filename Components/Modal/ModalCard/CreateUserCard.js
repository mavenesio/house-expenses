// @ts-nocheck
import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation, gql} from'@apollo/client';

import {StyledInput} from '../../Input/Input'
import Button from '../../Button/Button';
import Spinner from '../../Spinner/Spinner';
import ModalHeader from '../ModalHeader/ModalHeader';

const CreateUserCardContainer = styled.form`
    z-index:5;
    position:relative;
    align-self:center;
    background-color:${props => props.theme.color.white};
    border-radius:5px;
    width:70vw; 
    @media (max-width: 768px) {
        width:95%;
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
const CustomButton = styled(Button)`
    margin:1rem;
`;
const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    flex-wrap:wrap;
    margin-top:0.5rem;
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

const CreateUserCard = ({changeVisibility, setMessage}) => {
    const [addUser, {loading}] = useMutation(ADD_USER);
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
                formik.resetForm();
                setMessage('success',`Welcome ${data.addUser.firstName}!!`);
            } catch (err) {
                setMessage('error', err.message.replace('GraphQL error:', ''));
            }
        }
    })


    return (
        <>
            <Spinner loadring={loading}/>
            <CreateUserCardContainer onSubmit={formik.handleSubmit} id='createForm'>
                <ModalHeader title='New user' onClose={changeVisibility}/>
                <ModalBody>
                    <Row>
                        <StyledInput
                            name='firstName'
                            id='firstName'
                            type='firstName'
                            handleChange={formik.handleChange}
                            handleBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            label='First name'
                            errors={formik.errors.firstName}
                            touched={formik.touched.firstName}
                            noWhitesSpaces={false}
                        />
                    </Row>
                    <Row>
                        <StyledInput
                            name='lastName'
                            id='lastName'
                            type='lastName'
                            handleChange={formik.handleChange}
                            handleBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            label='Last name'
                            errors={formik.errors.lastName}
                            touched={formik.touched.lastName}
                            noWhitesSpaces={false}
                        />
                    </Row>
                    <Row>
                        <StyledInput
                            name='createEmail'
                            id='createEmail'
                            type='email'
                            handleChange={formik.handleChange}
                            handleBlur={formik.handleBlur}
                            value={formik.values.createEmail}
                            label='Email'
                            errors={formik.errors.createEmail}
                            touched={formik.touched.createEmail}
                            noWhitesSpaces={true}
                        />
                    </Row>
                    <Row>
                        <StyledInput
                            name='createPassword'
                            id='createPassword'
                            type='password'
                            handleChange={formik.handleChange}
                            handleBlur={formik.handleBlur}
                            value={formik.values.createPassword}
                            label='Password'
                            errors={formik.errors.createPassword}
                            touched={formik.touched.createPassword}
                            noWhitesSpaces={true}
                        />
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <CustomButton type='submit' form='createForm' >Create user</CustomButton>
                </ModalFooter>
            </CreateUserCardContainer>
        </>
    )
}
export default CreateUserCard;