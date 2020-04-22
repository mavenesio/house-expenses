// @ts-nocheck
import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';

import Input from '../Components/Input/Input';
import Button, {InputButton} from '../Components/Button/Button';
import Modal from '../Components/Modal/Modal';
import CreateUserCard from '../Components/Modal/CreateUserCard';
import Header from '../Components/Header/Header';
import ErrorField from '../Components/ErrorField/ErrorField';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginContainer = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
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

function Login() {
  const [ModalIsVisible, setModalIsVisible] = useState(false);
  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema: Yup.object({
      email: Yup.string().email('El email no es valido').required('Email es obligatorio'),
      password: Yup.string()
                  .required('password no puede ser vacio')
                  .min(6, 'password no puede tener menos de 6 caracteres')

    }),
    onSubmit: values => {
      console.log('sending...');
      console.log(values);
    }
  })
  return (
    <>
      <Header title='LOGIN' />
      <LoginContainer onSubmit={formik.handleSubmit}>
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
              {
                formik.touched.email && formik.errors.email 
                ?
                <ErrorField errorMessage={formik.errors.email} />
                :
                null
              }
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
              {
                formik.touched.password && formik.errors.password 
                ?
                <ErrorField errorMessage={formik.errors.password} />
                :
                null
              }
            </InputContainer>
          <ButtonContainer>
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
