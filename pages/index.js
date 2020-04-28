// @ts-nocheck
import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {gql, useMutation} from '@apollo/client';

import Input from '../Components/Input/Input';
import Button, {SecondaryButton} from '../Components/Button/Button';
import Modal from '../Components/Modal/Modal';
import CreateUserCard from '../Components/CardModal/CreateUserCard';
import Header from '../Components/Header/Header';
import ErrorField from '../Components/ErrorField/ErrorField';
import Spinner from '../Components/Spinner/Spinner';


const LoginContainer = styled.form`
  width: 100%;
  height: 90%;
  display:flex;
  justify-content:center;
`;
const LoginBox = styled.div`
  display:flex;
  min-width: 350px;
  flex-direction:column;
  align-self:center;
  border:2px solid ${props => props.theme.color.primaryLightColor};
  background-color: ${props => props.theme.color.white};
  border-radius: 8px;
  top:20%;
  position:absolute;
`;
const ButtonContainer = styled.div`
  margin:1rem;
  display:flex;
  flex-direction:row;
  justify-content: space-between;
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
  white-space:nowrap;
  margin:0.5rem;
  width:45%;
  font-family: ${props => props.theme.font.family};
  @media screen {
    margin:0.5rem 0rem 0.5rem 0rem;
  }
`;
const CustomSecondaryButton = styled(SecondaryButton)`
  font-family: ${props => props.theme.font.family};
  white-space:nowrap;
  margin:0.5rem;
  width:45%;
  @media screen {
    margin:0.5rem 0rem 0.5rem 0rem;
  }
`;
const SuccessMessage = styled.div`
  color: ${props => props.theme.color.pimaryColor};
  font-size: 15px;
  font-weight: 800;
  font-family: ${props => props.theme.font.family};
  margin: 0.5rem;
  text-align:center;
`;


const AUTHOTIZATION_USER = gql`
  mutation userAuthorization($input: AuthorizationInput){
    userAuthorization(input: $input){
      token
    }
  }
`;

function Login(props) {
  const [ModalIsVisible, setModalIsVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(null);
  const [SignUpSuccess, setSignUpSuccess] = useState(false);
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const [AuthorizationInput] = useMutation(AUTHOTIZATION_USER);
  const removeWhiteSpaces = useCallback((value) => value.replace(' ', ''));
  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema: Yup.object({
      email: Yup.string()
                .email('Invalid email')
                .required('Email is required')
                .max(35,'Email must be lower than 35 characters')
                .trim('dont be allow spaces'),
      password: Yup.string().required('password is required').max(35,'Password must be lower than 35 characters'),
    }),

    onSubmit: async values => {
      const {email, password} = values;
      try {
        setLoading(true);
        const {data} = await AuthorizationInput({
          variables: {
            input:{email, password}
          }
        });
        const {token} = data.userAuthorization;
        localStorage.setItem('token', token);
        setLoading(false);
        router.push('/Homepage');
        setSignUpSuccess(false);
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
    <>
      <Header title='LOGIN' logOutVisible={false}/>
      <LoginContainer onSubmit={formik.handleSubmit} id='loginForm'>
        <LoginBox>
          <SuccessMessage> {SignUpSuccess && 'Welcome! ! ! !'}</SuccessMessage> 
          <ErrorField errorMessage={ErrorMessage} touched={true}/>
          <InputContainer>
              <Input
                  name='email'
                  id='email'
                  type='email'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={removeWhiteSpaces(formik.values.email)}
              />
              <label>Email</label>
              <ErrorField errorMessage={formik.errors.email} touched={formik.touched.email }/>
          </InputContainer>
          <InputContainer>
              <Input
                  name='password'
                  id='password'
                  type='password'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={removeWhiteSpaces(formik.values.password)}
              />
              <label>Password</label>
              <ErrorField errorMessage={formik.errors.password} touched={formik.touched.password } />
            </InputContainer>
          <ButtonContainer>
            <CustomSecondaryButton type='submit' form='loginForm' >Log in</CustomSecondaryButton>
            <CustomButton type='button' onClick={() => {setModalIsVisible(true)}} >Sign up</CustomButton>
          </ButtonContainer>
        </LoginBox>
      </LoginContainer>
      <Spinner loading={Loading} />
      <Modal isVisible={ModalIsVisible} changeVisibility={() => setModalIsVisible(!ModalIsVisible)}>
        <CreateUserCard changeVisibility={() => setModalIsVisible(false)} setSignUpSuccess={() => setSignUpSuccess(true)} />
      </Modal>
    </>
  )

}

export default (Login)
 