// @ts-nocheck
import React, {useState, useContext, useCallback} from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {gql, useMutation} from '@apollo/client';
import jwtDecode from 'jwt-decode';

import UserContext from '../context/user/UserContext';
import {StyledInput} from '../Components/Input/Input';
import Button, {SecondaryButton} from '../Components/Button/Button';
import Spinner from '../Components/Spinner/Spinner';
import CreateUserModal from '../Components/Modal/CreateUserModal';

import Toast from '../Components/toast/toast';

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
  border:2px solid ${props => props.theme.color.primaryColor};
  background-color: ${props => props.theme.color.white};
  border-radius: 8px;
  top:20%;
  position:absolute;
`;
const CustomButton = styled(Button)`
  margin: 1rem;
`;
const CustomSecondaryButton = styled(SecondaryButton)`
  margin: 1rem;
`;
const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    margin-top:1rem;
    font-family: ${props => props.theme.font.family};
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
  const [SingUpMessage, setSingUpMessage] = useState(null);
  const router = useRouter();
  const userContext = useContext(UserContext);
  const [AuthorizationInput, {loading}] = useMutation(AUTHOTIZATION_USER);
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
        const {data} = await AuthorizationInput({
          variables: {
            input:{email, password}
          }
        });
        const {token} = data.userAuthorization;
        localStorage.setItem('token', token);
        const decodeToken = jwtDecode(token);
        userContext.setMode(decodeToken.mode);
        formik.resetForm();
        router.push('/Homepage');
        setSingUpMessage(null);
      } 
      catch (err) {
          setSingUpMessage({type:'error', text: err.message.replace('GraphQL error:', '')});
      }
    }
  })
  return (
    <>
      <Toast message={SingUpMessage} setMessage={(value) => setSingUpMessage(value)}/>
      <Spinner loading={loading}/>
      <LoginContainer onSubmit={formik.handleSubmit} id='loginForm'>
        <LoginBox>
          <Row>
            <StyledInput
                name='email'
                id='email'
                type='email'
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.email}
                label='Email'
                errors={formik.errors.email} 
                touched={formik.touched.email }
                noWhitesSpaces={true}
            />
          </Row>
          <Row>
            <StyledInput
                name='password'
                id='password'
                type='password'
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.password}
                label='Passowrd'
                noWhitesSpaces={true}
            />
          </Row>
          <Row>
            <CustomSecondaryButton type='submit' form='loginForm' >Log in</CustomSecondaryButton>
            <CustomButton type='button' onClick={() => {formik.resetForm();setModalIsVisible(true)}} >Sign up</CustomButton>
          </Row>
        </LoginBox>
      </LoginContainer>
      <CreateUserModal
        visibility={ModalIsVisible}
        setVisibility={() => setModalIsVisible(false)}
        setMessage={(type, message) => setSingUpMessage({type: type, text: message})}
      />
    </>
  )

}

export default (Login)
 