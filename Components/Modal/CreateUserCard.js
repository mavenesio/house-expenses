// @ts-nocheck
import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import TimesCircle from '../Icons/TimesCircle';
import Input from '../Input/Input';
import Button from '../Button/Button';
import StyledSelect from '../StyledSelect/StyledSelect';
import {YearOptions, MonthOptions, NumberOfMonthOptions} from '../../constants/constants';

const CrossButton = styled(TimesCircle)`
    align-self:center;
    font-size: 20px;
    color: black;
    margin: 0rem 1rem 0rem 1rem;
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
    width:78%;
    height:78%;
`;
const ModalHeader = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    padding:1rem;
    margin:1rem;
    height:10%;
    border-bottom: 2px solid ${props => props.theme.color.primaryLightColor};
`;
const ModalHeaderText = styled.div`
    font-family:${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.subTitle};
`;
const ModalBody = styled.div`
    display:flex;
    flex-direction:column;
    height:60%;
    overflow-y: auto;
`;
const ModalFooter = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    height:10%;
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

const CreateUserCard = (props) => {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const {changeVisibility} = props;


    return (
        <CreateUserCardContainer>
            <ModalHeader>
                <ModalHeaderText>
                    Nuevo Usuario
                </ModalHeaderText>
                <CrossButton onClick={changeVisibility}/>
            </ModalHeader>
            <ModalBody>
                <InputContainer>
                    <Input
                        Value={FirstName}
                        onChange={(event) => {setFirstName(event.target.value)}}
                    />
                    <label>FirstName</label>
                </InputContainer>
                <InputContainer>
                    <Input
                        Value={LastName}
                        onChange={(event) => {setLastName(event.target.value)}}
                    />
                    <label>LastName</label>
                </InputContainer>
                <InputContainer>
                    <Input
                        Value={Email}
                        onChange={(event) => {setEmail(event.target.value)}}
                    />
                    <label>Email</label>
                </InputContainer>
                <InputContainer>
                    <Input
                        Value={Password}
                        onChange={(event) => {setPassword(event.target.value)}}
                    />
                    <label>Password</label>
                </InputContainer>
            </ModalBody>
            <ModalFooter>
                <InputContainer>
                    <Button onClick={() => {console.log(FirstName, LastName, Email, Password); changeVisibility()}} >Crear!</Button>
                </InputContainer>
            </ModalFooter>
        </CreateUserCardContainer>
    )
}

export default CreateUserCard;