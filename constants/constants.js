// @ts-nocheck

import styled from 'styled-components';
import CreditCard from '../Components/Icons/CreditCard';
import Home from '../Components/Icons/Home';
import Cash from '../Components/Icons/Cash';
import ShoppingCart from '../Components/Icons/ShoppingCart';
import Important from '../Components/Icons/Important';
import CarSolid from '../Components/Icons/CarSolid';
import FemaleSolid from '../Components/Icons/FemaleSolid';
import MaleSolid from '../Components/Icons/MaleSolid';
import BusSolid from '../Components/Icons/BusSolid';

export const MonthOptions = [
    { value: '0', label: 'Enero' },
    { value: '1', label: 'Febrero' },
    { value: '2', label: 'Marzo' },
    { value: '3', label: 'Abril' },
    { value: '4', label: 'Mayo' },
    { value: '5', label: 'Junio' },
    { value: '6', label: 'Julio' },
    { value: '7', label: 'Agosto' },
    { value: '8', label: 'Septiembre' },
    { value: '9', label: 'Octubre' },
    { value:'10', label: 'Noviembre' },
    { value:'11', label: 'Diciembre' },
];
export const YearOptions = [
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
];

export const NumberOfMonthOptions = [
    { value: '1', label: '1' },
    { value: '3', label: '3' },
    { value: '6', label: '6' },
    { value: '12', label: '12' },
    { value: '18', label: '18' },
];

const IconContainer = styled.div`
  color:${props => props.iconcolor};
  margin-right:10px;
`;
const IconWrapper = styled.div`
  color:${props => props.iconcolor};
  margin-right:10px;
  font-size: 20px;
  
`;
const Label = styled.div`
  display:flex;
  flex-direction:row;
`;

export const ExpenseTypeOptions = [
  { value: 'House',       label: <Label><IconContainer iconcolor='#0062ff'> <Home />          </IconContainer> House </Label>},
  { value: 'Market',      label: <Label><IconContainer iconcolor='#00FF00'> <ShoppingCart />  </IconContainer> Market</Label>},
  { value: 'CreditCard',  label: <Label><IconContainer iconcolor='#008080'> <CreditCard />    </IconContainer> Credit Card </Label>},
  { value: 'Cash',        label: <Label><IconContainer iconcolor='#FFFF00'> <Cash />          </IconContainer> Cash </Label>},
  { value: 'Important',   label: <Label><IconContainer iconcolor='#FF0000'> <Important />     </IconContainer> Important </Label>},
  { value: 'Car',         label: <Label><IconContainer iconcolor='#0000FF'> <CarSolid />      </IconContainer> Car </Label>},
  { value: 'Female',      label: <Label><IconContainer iconcolor='#FF00FF'> <FemaleSolid />   </IconContainer> Female </Label>},
  { value: 'Male',        label: <Label><IconContainer iconcolor='#808000'> <MaleSolid />     </IconContainer> Male </Label>},
  { value: 'Bus',         label: <Label><IconContainer iconcolor='#00FFFF'> <BusSolid />      </IconContainer> Bus </Label>},
];

export const ExpenseTypes = [
  { key: 'House',       value: <IconWrapper iconcolor='#0062ff'><Home /></IconWrapper>},
  { key: 'Market',      value: <IconWrapper iconcolor='#00FF00'><ShoppingCart /></IconWrapper>},
  { key: 'CreditCard',  value: <IconWrapper iconcolor='#008080'><CreditCard /></IconWrapper>},
  { key: 'Cash',        value: <IconWrapper iconcolor='#FFFF00'><Cash /></IconWrapper>},
  { key: 'Important',   value: <IconWrapper iconcolor='#FF0000'><Important /></IconWrapper>},
  { key: 'Car',         value: <IconWrapper iconcolor='#0000FF'><CarSolid /></IconWrapper>},
  { key: 'Female',      value: <IconWrapper iconcolor='#FF00FF'><FemaleSolid /></IconWrapper>},
  { key: 'Male',        value: <IconWrapper iconcolor='#808000'><MaleSolid /></IconWrapper>},
  { key: 'Bus',         value: <IconWrapper iconcolor='#00FFFF'><BusSolid /></IconWrapper>},
];
