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
const NameInput = styled(Input).attrs({placeholder:'', type:'string', name:'name'})``;
const PaymentInput = styled(Input).attrs({placeholder:'', type:'number', name:'payment'})``;

const ModalCard = (props) => {
    const [Name, setName] = useState('');
    const [Payment, setPayment] = useState('0');
    const [StartMonth, setStartMonth] = useState('1');
    const [StartYear, setStartYear] = useState(YearOptions[0]);
    const [NumberOfMonth, setNumberOfMonth] = useState(NumberOfMonthOptions[0]);
    const {changeVisibility} = props;


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
                <StyledSelect
                    options={MonthOptions}
                    value={StartMonth}
                    onChange={(value) => setStartMonth(value)}
                    placeholder='options..'
                    label='Mes de comienzo'
                    name='StartMonth'
                />
                <StyledSelect
                    options={YearOptions}
                    value={StartYear}
                    onChange={(value) => setStartYear(value)}
                    placeholder='options..'
                    label=''
                    label='Año de comienzo'
                    name='StartYear'
                />
                <StyledSelect
                    options={NumberOfMonthOptions}
                    value={NumberOfMonth}
                    onChange={(value) => setNumberOfMonth(value)}
                    placeholder='options..'
                    label=''
                    label='Duración de meses'
                    name='NumberOfMonth'
                />
            </ModalBody>
            <ModalFooter>
                <InputContainer>
                    <Button onClick={() => {console.log(Name, Payment, StartMonth, StartYear, NumberOfMonth); changeVisibility()}} >Agregar!</Button>
                </InputContainer>
            </ModalFooter>
        </ModalCardContainer>
    )
}

export default ModalCard;