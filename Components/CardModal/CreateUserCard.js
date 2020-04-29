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
import Spinner from '../Spinner/Spinner';

const CrossButton = styled(TimesCircle)`
    align-self:center;
    font-size: 25px;
    color: ${props => props.theme.color.primaryDarkColor};
    margin: 0rem 1rem 1rem 1rem;
    cursor: pointer;
    &:hover{
        color: ${props => props.theme.color.secondaryColor};
    }
`;
const CreateUserCardContainer = styled.div`
    z-index:5;
    position:relative;
    align-self:center;
    background-color:${props => props.theme.color.white};
    border-radius:5px;
    width:50vw;
    min-width:300px;
`;
const ModalHeader = styled.div`
    display:flex;
    flex-direction:column;
    margin:1rem;
    color: ${props => props.theme.color.primaryDarkColor};
    cursor:default;
    border-bottom: 2px solid ${props => props.theme.color.secondaryColor};
`;
const ModalHeaderText = styled.div`
    font-family:${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.subTitle};
    font-weight:800;
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
const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
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
        <CreateUserCardContainer>
            <ModalHeader>
                <Row>
                    <ModalHeaderText>
                        New user
                    </ModalHeaderText>
                    <CrossButton onClick={changeVisibility}/>
                </Row>
                <Row>
                    <ErrorField errorMessage={ErrorMessage} touched={true}/>
                </Row>
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
                        value={removeWhiteSpaces(formik.values.createEmail)}
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
                        onBlur={formik.handleBlur}
                        value={removeWhiteSpaces(formik.values.createPassword)}
                    />
                    <label>Password</label>
                    <ErrorField errorMessage={formik.errors.createPassword} touched={formik.touched.createPassword} />
                </InputContainer>
                <InputContainer>
                    <CustomButton type='submit' form='createForm' >Create user!</CustomButton>
                </InputContainer>
            </ModalBody>
            <Spinner loadring={Loading}/>
        </CreateUserCardContainer>
    )
}

export default CreateUserCard;