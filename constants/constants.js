// @ts-nocheck

import theme from './Theme';
import Styled from 'styled-components';
import CreditCard from '../Components/Icons/CreditCard';
import Home from '../Components/Icons/Home';
import Cash from '../Components/Icons/Cash';
import ShoppingCart from '../Components/Icons/ShoppingCart';
import Important from '../Components/Icons/Important';
import styled from 'styled-components';

export const SelectColourStyles = {
    control: (styles, { isFocused }) => {
      return ({
        ...styles,
        borderRadius: '8px',
        padding: '10px',
        color: `${theme.color.primaryDarkColor}`,
        weight: 500,
        border: isFocused ? `2px solid ${theme.color.primaryDarkColor}` : `2px solid ${theme.color.primaryLightColor}`,
        boxShadow: isFocused ? 0 : 0,
        '&:hover': {
        }
      });
    },
    option: (styles, { isFocused, isSelected }) => {
      return {
        ...styles,
        color: 'black',
        weight: 500,
        backgroundColor: isFocused ? '#e6e6e6' : isSelected ? '#e6e6e6' : 'white',

      };
    }
  };
  export const MonthOptions = [
    { value: '1', label: 'Enero' },
    { value: '2', label: 'Febrero' },
    { value: '3', label: 'Marzo' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Mayo' },
    { value: '6', label: 'Junio' },
    { value: '7', label: 'Julio' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Septiembre' },
    { value:'10', label: 'Octubre' },
    { value:'11', label: 'Noviembre' },
    { value:'12', label: 'Diciembre' },
];
export const YearOptions = [
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
    { value: '2027', label: '2027' },
];

export const NumberOfMonthOptions = [
    { value: '1', label: '1' },
    { value: '3', label: '3' },
    { value: '6', label: '6' },
    { value: '12', label: '12' },
    { value: '18', label: '18' },
];

const IconContainer = Styled.div`
  color:${props => props.iconcolor};
  margin-right:10px;
`;
const IconWrapper = Styled.div`
  color:${props => props.iconcolor};
  margin-right:10px;
  font-size: 20px;
  
`;
const Label = styled.div`
  display:flex;
  flex-direction:row;
`;

export const ExpenseTypeOptions = [
  { value: 'House', label: <Label><IconContainer iconcolor='#0062ff'><Home /></IconContainer> House </Label>},
  { value: 'Market', label: <Label><IconContainer iconcolor='green'><ShoppingCart /></IconContainer> Market</Label>},
  { value: 'CreditCard', label: <Label><IconContainer iconcolor='violet'><CreditCard /></IconContainer> Credit Card </Label>},
  { value: 'Cash', label: <Label><IconContainer iconcolor='orange'><Cash /></IconContainer> Cash </Label>},
  { value: 'Important', label: <Label><IconContainer iconcolor='red'><Important /></IconContainer> Important </Label>},
];

export const ExpenseTypes = [
  { key: 'House', value: <IconWrapper iconcolor='#0062ff'><Home /></IconWrapper>},
  { key: 'Market', value: <IconWrapper iconcolor='green'><ShoppingCart /></IconWrapper>},
  { key: 'CreditCard', value: <IconWrapper iconcolor='violet'><CreditCard /></IconWrapper>},
  { key: 'Cash', value: <IconWrapper iconcolor='orange'><Cash /></IconWrapper>},
  { key: 'Important', value: <IconWrapper iconcolor='red'><Important /></IconWrapper>},
];
