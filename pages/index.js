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
import CreateUserCard from '../Components/Modal/CreateUserCard';
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
  flex-direction:column;
  align-self:center;
  border:2px solid ${props => props.theme.color.primaryDarkColor};
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
  @media screen {
    margin:0.5rem 0rem 0.5rem 0rem;
  }
`;
const CustomSecondaryButton = styled(SecondaryButton)`
white-space:nowrap;
  margin:0.5rem;
  width:45%;
  @media screen {
    margin:0.5rem 0rem 0.5rem 0rem;
  }

`


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
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const [AuthorizationInput] = useMutation(AUTHOTIZATION_USER);
  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('password is required')
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
        router.push('/Homepage')
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
          <ErrorField errorMessage={ErrorMessage} touched={true}/>
          <InputContainer>
              <Input
                  name='email'
                  id='email'
                  type='email'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
              />
              <label>Email</label>
              <ErrorField errorMessage={formik.errors.email} touched={formik.errors.email }/>
          </InputContainer>
          <InputContainer>
              <Input
                  name='password'
                  id='password'
                  type='password'
                  onChange={formik.handleChange}
                  value={formik.values.password}
              />
              <label>Password</label>
              <ErrorField errorMessage={formik.errors.password} touched={formik.errors.password } />
            </InputContainer>
          <ButtonContainer>
            <CustomButton onClick={() => {setModalIsVisible(true)}} >Sign up</CustomButton>
            <CustomSecondaryButton type='submit' form='loginForm' >Log in</CustomSecondaryButton>
          </ButtonContainer>
        </LoginBox>
      </LoginContainer>
      <Spinner loading={Loading} />
      <Modal isVisible={ModalIsVisible} changeVisibility={() => setModalIsVisible(!ModalIsVisible)}>
        <CreateUserCard changeVisibility={() => setModalIsVisible(false)} />
      </Modal>
    </>
  )

}

export default (Login)
 