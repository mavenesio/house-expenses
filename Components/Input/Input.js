import styled from 'styled-components';

const Input = styled.input`
    width:100%;
    border-radius:8px;
    padding: 20px 20px 5px 20px;
    border: 2px solid ${props => props.theme.color.primaryColor};
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    box-sizing: border-box;
    line-height: 1.2em;
    height:55px;
    background-color: ${props => props.theme.color.white};
    outline: unset;
    &:focus {
        outline: none;
        border: 2px solid ${props => props.theme.color.primaryDarkColor};
    };
    & ~ label{
        color:${props => props.theme.color.primaryDarkColor};
        font-family: ${props => props.theme.font.family};
        font-size: 14px;
        position:absolute;    
        font-weight: 400;
        top: 4px;
        left:10px;
    }
`;
export default Input;