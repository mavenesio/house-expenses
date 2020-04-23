// @ts-nocheck
import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {gql, useMutation} from '@apollo/client';

import Input from '../Components/Input/Input';
import Button from '../Components/Button/Button';
import Modal from '../Components/Modal/Modal';
import CreateUserCard from '../Components/Modal/CreateUserCard';
import Header from '../Components/Header/Header';
import ErrorField from '../Components/ErrorField/ErrorField';

const LoginContainer = styled.form`
  position: relative;
  width: 100%;
  height: 90%;
`;

const LoginBox = styled.div`
  display:flex;
  flex-direction:column;
  border:2px solid ${props => props.theme.color.primaryDarkColor};
  border-radius: 8px;
  width:70%;
  position:absolute;
  top:calc(15%);
  left:calc(15%);
`;
const ButtonContainer = styled.div`
  margin:1rem;
  display:flex;
  flex-direction:row;
  justify-content: flex-end;
  @media screen {
    flex-direction:column-reverse;
  }
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
  @media screen {
    width:100%;
    margin:0.5rem 0rem 0.5rem 0rem;
  }
  cursor: pointer;
`;
const AUTHOTIZATION_USER = gql`
  mutation userAuthorization($input: AuthorizationInput){
    userAuthorization(input: $input){
      token
    }
  }
`;

function Login() {
  const [ModalIsVisible, setModalIsVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const [AuthorizationInput] = useMutation(AUTHOTIZATION_USER);
  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema: Yup.object({
      email: Yup.string().email('El email no es valido').required('Email es obligatorio'),
      password: Yup.string()
                  .required('password no puede ser vacio')
                  .min(6, 'password no puede tener menos de 6 caracteres')

    }),
    onSubmit: async values => {
      const {email, password} = values;
      try {
        const {data} = await AuthorizationInput({
          variables: {
            input:{email, password}
          }
        });
        
        const {token} = data.userAuthorization;
        localStorage.setItem('token', token);
        router.push('/Homepage')




      } catch (err) {
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
      <Header title='LOGIN' />
      <LoginContainer onSubmit={formik.handleSubmit} id='loginForm'>
        <LoginBox>
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
            <ErrorField errorMessage={ErrorMessage} touched={true}/>
            <CustomButton onClick={() => {setModalIsVisible(true)}} >Sign In</CustomButton>
            <CustomButton type='submit' form='loginForm' >Log In</CustomButton>
          </ButtonContainer>
        </LoginBox>
      </LoginContainer>
      <Modal
          isVisible={ModalIsVisible} 
          changeVisibility={() => setModalIsVisible(!ModalIsVisible)}>
              <CreateUserCard changeVisibility={() => setModalIsVisible(!ModalIsVisible)} />
      </Modal>
    </>
  )
}

export default Login
