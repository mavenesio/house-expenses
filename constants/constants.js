
import theme from './Theme';

export const SelectColourStyles = {
    control: (styles, { isFocused }) => {
      return ({
        ...styles,
        borderRadius: '8px',
        padding: '10px',
        color: `${theme.color.primaryDarkColor}`,
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