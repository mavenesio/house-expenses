// @ts-nocheck
import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import TimesCircle from '../Icons/TimesCircle';
import Input from '../Input/Input';
import Button from '../Button/Button';

const CrossButton = styled(TimesCircle)`
    align-self:center;
    font-size: 20px;
    color: black;
    margin: 0rem 1rem 0rem 1rem;
    &:hover{
        color: ${props => props.theme.color.primaryLightColor};
    }
`;
const ModalCardContainer = styled.div`
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
    border-bottom: 1px solid black;
`;
const ModalHeaderText = styled.div`
    font-family:${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.subTitle};
`;
const ModalBody = styled.div`
    display:flex;
    flex-direction:column;
`;
const ModalFooter = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
`;

const InputContainer = styled.div`
    display:flex;
    flex-direction:column;
    margin:1rem;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: ${props => props.theme.font.weight.bold};
`;
const NameInput = styled(Input).attrs({placeholder:'name of the expence', type:'string', name:'name'})``;
const PaymentInput = styled(Input).attrs({placeholder:'$$$$', type:'number', name:'payment'})``;
const MonthsInput = styled(Input).attrs({placeholder:'# meses', type:'number', name:'Month'})``;

const ModalCard = (props) => {
    const [Name, setName] = useState('');
    const [Payment, setPayment] = useState('0');
    const [Months, setMonths] = useState('1');
    const {onSuccess, changeVisibility} = props;


    return (
        <ModalCardContainer>
            <ModalHeader>
                <ModalHeaderText>
                    Nuevo gasto
                </ModalHeaderText>
                <CrossButton onClick={changeVisibility}/>
            </ModalHeader>
            <ModalBody>
                <InputContainer>
                    <NameInput
                        Value={Name}
                        onChange={(event) => {setName(event.target.value)}}
                    />
                    <label>Name</label>
                </InputContainer>
                <InputContainer>
                    <PaymentInput
                        Value={Payment}
                        onChange={(event) => {setPayment(event.target.value)}}
                    />
                    <label>A pagar</label>
                </InputContainer>
                <InputContainer>
                    <MonthsInput
                        Value={Months}
                        onChange={(event) => {setMonths(event.target.value)}}
                    />
                    <label>Cantidad de meses</label>
                </InputContainer>
            </ModalBody>
            <ModalFooter>
                <InputContainer>
                    <Button onClick={() => {onSuccess(Name, Payment);/* changeVisibility()*/}} >Agregar!</Button>
                </InputContainer>
            </ModalFooter>
        </ModalCardContainer>
    )
}

export default ModalCard;