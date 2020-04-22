// @ts-nocheck
import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';

import Input from '../Components/Input/Input';
import Button from '../Components/Button/Button';
import Modal from '../Components/Modal/Modal';
import CreateUserCard from '../Components/Modal/CreateUserCard';
import Header from '../Components/Header/Header';

const LoginContainer = styled.div`
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
const EmailInput = styled(Input).attrs({placeholder:'', type:'string', name:'Email'})``;
const PasswordInput = styled(Input).attrs({placeholder:'', type:'string', name:'Password'})``;



function Login({data}) {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ModalIsVisible, setModalIsVisible] = useState(false)
  return (
    <>
      <Header title='LOGIN' />
      <LoginContainer>
        <LoginBox>
          <InputContainer>
              <EmailInput
                  Value={Email}
                  onChange={(event) => {setEmail(event.target.value)}}
              />
              <label>Email</label>
          </InputContainer>
          <InputContainer>
              <PasswordInput
                  Value={Password}
                  onChange={(event) => {setPassword(event.target.value)}}
              />
              <label>Password</label>
          </InputContainer>
          <ButtonContainer>
            <CustomButton onClick={() => {setModalIsVisible(true)}} >Sign In</CustomButton>
            <CustomButton onClick={() => {console.log('Log in')}} >Log In</CustomButton>
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
